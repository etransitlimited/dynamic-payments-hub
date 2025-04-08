
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
  const { language, lastUpdate } = useLanguage();
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
      
      // Force update immediately when language changes
      setForceUpdate(prev => prev + 1);
      lastRefreshRef.current = Date.now();
      
      // Dispatch a custom event that components can listen for
      const event = new CustomEvent('languageChanged', { 
        detail: { language, timestamp: Date.now() } 
      });
      document.dispatchEvent(event);
    }
  }, [language, lastUpdate]);

  // Throttled refresh function to prevent excessive renders
  const refreshTranslations = useCallback(() => {
    const now = Date.now();
    
    // Limit refreshes to once every 500ms (increased from 200ms for stability)
    if (now - lastRefreshRef.current > 500 && !pendingRefreshRef.current) {
      pendingRefreshRef.current = true;
      
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      
      refreshTimeoutRef.current = setTimeout(() => {
        pendingRefreshRef.current = false;
        setForceUpdate(prev => prev + 1);
        lastRefreshRef.current = Date.now();
        
        // Dispatch a custom event for refresh
        const event = new CustomEvent('translationsRefreshed', { 
          detail: { timestamp: now, language: languageRef.current } 
        });
        document.dispatchEvent(event);
      }, 100); // Increased from 50ms for better batching
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
        
        // Use direct translation with fallback
        const directResult = getDirectTranslation(key, languageRef.current, fallback);
        const result = values ? formatDirectTranslation(directResult, values) : directResult;
        
        // Cache the result
        translationCache.current[cacheKey] = result;
        
        return result;
      } catch (error) {
        console.error(`Translation error for key "${key}":`, error);
        return fallback || key;
      }
    };
  }, [forceUpdate]);

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
  }), [translate, refreshTranslations, languageRef.current, forceUpdate]);

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
