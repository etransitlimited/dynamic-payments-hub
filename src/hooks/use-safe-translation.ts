
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
  const [localLanguage, setLocalLanguage] = useState(currentLanguage);
  const previousLanguage = useRef(currentLanguage);
  
  // Update local language when context language changes
  useEffect(() => {
    if (currentLanguage !== localLanguage) {
      console.log(`Language updated in useSafeTranslation: ${currentLanguage}`);
      setLocalLanguage(currentLanguage);
      
      // Force refresh when language actually changes
      if (previousLanguage.current !== currentLanguage) {
        previousLanguage.current = currentLanguage;
        requestRefresh();
      }
    }
  }, [currentLanguage, localLanguage]);
  
  // Prevent excessive refreshes with debounce
  const requestRefresh = useCallback(() => {
    const now = Date.now();
    if (now - lastRefreshTimestamp.current > 300) {
      lastRefreshTimestamp.current = now;
      setRefreshCounter(c => c + 1);
      refreshTranslations();
      
      // Force additional refresh after a short delay for components that might miss the first refresh
      setTimeout(() => {
        setRefreshCounter(c => c + 1);
      }, 50);
    }
  }, [refreshTranslations]);
  
  // Create a stable translation function with retries
  const t = useCallback((key: string, fallback?: string, values?: Record<string, string | number>): string => {
    try {
      // Direct call to the context's translate function
      const result = contextTranslate(key, fallback, values);
      
      // If the translation function returns the same key, it's possible that the translation hasn't
      // been loaded yet - but only warn if the key contains a dot (likely a real translation key)
      if (result === key && key.includes('.') && process.env.NODE_ENV !== 'production') {
        console.warn(`Translation key "${key}" not found in language "${currentLanguage}"`);
      }
      
      return result;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return fallback || key;
    }
  }, [contextTranslate, currentLanguage]);
  
  // Force refresh translations on language change or lastUpdate change
  useEffect(() => {
    console.log(`Language changed in useSafeTranslation - current: ${currentLanguage}, context: ${language}, lastUpdate: ${lastUpdate}`);
    requestRefresh();
    
    // Delayed refreshes for better reliability
    const timers = [
      setTimeout(() => requestRefresh(), 100),
      setTimeout(() => requestRefresh(), 300),
      setTimeout(() => requestRefresh(), 600)
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [language, currentLanguage, lastUpdate, requestRefresh]);
  
  return {
    t,
    language: currentLanguage,
    refreshCounter,
    instanceId: instanceId.current,
    setLanguage
  };
};

export default useSafeTranslation;
