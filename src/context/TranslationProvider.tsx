
import React, { createContext, useContext, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLanguage } from './LanguageContext';
import { LanguageCode } from '@/utils/languageUtils';
import { getDirectTranslation, formatDirectTranslation } from '@/utils/translationHelpers';

interface TranslationContextProps {
  translate: (key: string, fallback?: string, values?: Record<string, string | number>) => string;
  currentLanguage: LanguageCode;
  refreshTranslations: () => void;
}

const TranslationContext = createContext<TranslationContextProps>({
  translate: (key: string, fallback?: string) => fallback || key,
  currentLanguage: 'en' as LanguageCode,
  refreshTranslations: () => {}
});

export const useTranslation = () => useContext(TranslationContext);

interface TranslationProviderProps {
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const { language, t, lastUpdate } = useLanguage();
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Use a ref to track the current language for stable references
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const lastRefreshRef = useRef<number>(Date.now());
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingRefreshRef = useRef<boolean>(false);
  
  // Update current language ref when language context changes
  useEffect(() => {
    if (language && language !== languageRef.current) {
      console.log(`TranslationProvider: Language changed from ${languageRef.current} to ${language}`);
      languageRef.current = language as LanguageCode;
      
      // Set HTML lang attribute for accessibility
      document.documentElement.setAttribute('lang', language);
      
      // Trigger a refresh, but throttle it
      if (Date.now() - lastRefreshRef.current > 300) {
        setForceUpdate(prev => prev + 1);
        lastRefreshRef.current = Date.now();
      } else {
        // Queue a refresh if we've refreshed too recently
        if (!pendingRefreshRef.current) {
          pendingRefreshRef.current = true;
          refreshTimeoutRef.current = setTimeout(() => {
            pendingRefreshRef.current = false;
            setForceUpdate(prev => prev + 1);
            lastRefreshRef.current = Date.now();
          }, 300);
        }
      }
    }
  }, [language, lastUpdate]);

  // Throttled refresh function to prevent excessive renders
  const refreshTranslations = useCallback(() => {
    if (Date.now() - lastRefreshRef.current > 300) {
      console.log("Translation refresh triggered");
      setForceUpdate(prev => prev + 1);
      lastRefreshRef.current = Date.now();
    } else {
      // If we've refreshed too recently, queue a refresh
      if (!pendingRefreshRef.current) {
        pendingRefreshRef.current = true;
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
        }
        refreshTimeoutRef.current = setTimeout(() => {
          pendingRefreshRef.current = false;
          setForceUpdate(prev => prev + 1);
          lastRefreshRef.current = Date.now();
        }, 300);
      }
    }
  }, []);

  // Memoize the translation function for stable references
  const translate = useMemo(() => {
    return (key: string, fallback?: string, values?: Record<string, string | number>): string => {
      try {
        if (!key) return fallback || '';
        
        // Try using the context's translation function first
        const contextResult = t(key);
        
        if (contextResult && contextResult !== key) {
          // If context translation successful, apply any value replacements
          return values ? formatDirectTranslation(contextResult, values) : contextResult;
        }
        
        // If context translation failed, use direct translation with fallback
        const directResult = getDirectTranslation(key, languageRef.current, fallback);
        return values ? formatDirectTranslation(directResult, values) : directResult;
      } catch (error) {
        console.error(`Translation error for key "${key}":`, error);
        return fallback || key;
      }
    };
  }, [t, forceUpdate]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  // Create a stable context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    translate,
    currentLanguage: languageRef.current,
    refreshTranslations
  }), [translate, refreshTranslations]);

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
