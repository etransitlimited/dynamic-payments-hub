
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
  const refreshCountRef = useRef<number>(0);
  
  // Update current language ref when language context changes
  useEffect(() => {
    if (language && language !== languageRef.current) {
      console.log(`TranslationProvider: Language changed from ${languageRef.current} to ${language}`);
      languageRef.current = language as LanguageCode;
      
      // Set HTML lang attribute for accessibility
      document.documentElement.setAttribute('lang', language);
      
      // Ensure we don't refresh too often - limit to max once every 300ms
      const now = Date.now();
      if (now - lastRefreshRef.current > 300) {
        // Clear any pending refresh
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
          refreshTimeoutRef.current = null;
        }
        
        // Perform refresh immediately but throttled
        lastRefreshRef.current = now;
        refreshCountRef.current += 1;
        setForceUpdate(prev => prev + 1);
        console.log("Translation refresh triggered by language change");
      } else {
        // Queue a single refresh if we've refreshed too recently
        if (!pendingRefreshRef.current) {
          pendingRefreshRef.current = true;
          if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
          }
          refreshTimeoutRef.current = setTimeout(() => {
            pendingRefreshRef.current = false;
            refreshCountRef.current += 1;
            setForceUpdate(prev => prev + 1);
            lastRefreshRef.current = Date.now();
            console.log("Delayed translation refresh triggered by language change");
          }, 300);
        }
      }
    }
  }, [language]);
  
  // Also refresh when lastUpdate from LanguageContext changes
  useEffect(() => {
    if (lastUpdate && lastUpdate > lastRefreshRef.current) {
      // Only schedule an update if there isn't one already pending
      if (!pendingRefreshRef.current) {
        // Use a small delay to let other language change effects run first
        pendingRefreshRef.current = true;
        setTimeout(() => {
          pendingRefreshRef.current = false;
          refreshCountRef.current += 1;
          setForceUpdate(prev => prev + 1);
          lastRefreshRef.current = Date.now();
        }, 100);
      }
    }
  }, [lastUpdate]);

  // Throttled refresh function to prevent excessive renders
  const refreshTranslations = useCallback(() => {
    const now = Date.now();
    if (now - lastRefreshRef.current > 300) {
      console.log("Manual translation refresh triggered");
      refreshCountRef.current += 1;
      setForceUpdate(prev => prev + 1);
      lastRefreshRef.current = now;
    } else {
      // If we've refreshed too recently, queue a refresh
      if (!pendingRefreshRef.current) {
        pendingRefreshRef.current = true;
        if (refreshTimeoutRef.current) {
          clearTimeout(refreshTimeoutRef.current);
        }
        refreshTimeoutRef.current = setTimeout(() => {
          pendingRefreshRef.current = false;
          refreshCountRef.current += 1;
          setForceUpdate(prev => prev + 1);
          lastRefreshRef.current = Date.now();
          console.log("Delayed manual translation refresh triggered");
        }, 300);
      }
    }
  }, []);

  // Translation cache for improved performance
  const translationCache = useRef<Record<string, string>>({});
  
  // Clear cache when language changes to ensure fresh translations
  useEffect(() => {
    translationCache.current = {};
  }, [language]);

  // Memoize the translation function for stable references
  const translate = useMemo(() => {
    return (key: string, fallback?: string, values?: Record<string, string | number>): string => {
      try {
        if (!key) return fallback || '';
        
        // Create a cache key
        const cacheKey = `${languageRef.current}:${key}:${values ? JSON.stringify(values) : ''}`;
        
        // Check cache first
        if (translationCache.current[cacheKey]) {
          return translationCache.current[cacheKey];
        }
        
        // Try using the context's translation function first
        const contextResult = t(key);
        
        let result: string;
        if (contextResult && contextResult !== key) {
          // If context translation successful, apply any value replacements
          result = values ? formatDirectTranslation(contextResult, values) : contextResult;
        } else {
          // If context translation failed, use direct translation with fallback
          const directResult = getDirectTranslation(key, languageRef.current, fallback);
          result = values ? formatDirectTranslation(directResult, values) : directResult;
        }
        
        // Cache the result
        translationCache.current[cacheKey] = result;
        
        return result;
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
