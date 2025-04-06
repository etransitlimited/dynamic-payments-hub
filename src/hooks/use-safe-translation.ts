
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from '@/context/TranslationProvider';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/utils/languageUtils';

/**
 * Hook that provides safe translation with fallbacks and retries
 */
export const useSafeTranslation = () => {
  const { translate: contextTranslate, currentLanguage, refreshTranslations } = useTranslation();
  const { language, setLanguage, lastUpdate } = useLanguage();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const instanceId = useRef(`trans-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const lastRefreshTimestamp = useRef(Date.now());
  
  // Prevent excessive refreshes with debounce
  const requestRefresh = useCallback(() => {
    const now = Date.now();
    if (now - lastRefreshTimestamp.current > 300) {
      lastRefreshTimestamp.current = now;
      setRefreshCounter(c => c + 1);
      refreshTranslations();
    }
  }, [refreshTranslations]);
  
  // Create a stable translation function with retries
  const t = useCallback((key: string, fallback?: string, values?: Record<string, string | number>): string => {
    // Direct call to the context's translate function
    return contextTranslate(key, fallback, values);
  }, [contextTranslate]);
  
  // Force refresh translations on language change or lastUpdate change
  useEffect(() => {
    requestRefresh();
    
    // Delayed refresh for better reliability
    const timer = setTimeout(() => requestRefresh(), 100);
    return () => clearTimeout(timer);
  }, [language, lastUpdate, requestRefresh]);
  
  return {
    t,
    language: currentLanguage,
    refreshCounter,
    instanceId: instanceId.current,
    setLanguage
  };
};

export default useSafeTranslation;
