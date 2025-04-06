
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '@/context/TranslationProvider';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Hook that provides safe translation with fallbacks and retries
 */
export const useSafeTranslation = () => {
  const { translate: contextTranslate, currentLanguage, refreshTranslations } = useTranslation();
  const { language, lastUpdate } = useLanguage();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const instanceId = useRef(`trans-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  
  // Create a stable translation function with retries
  const t = (key: string, fallback?: string, values?: Record<string, string | number>): string => {
    // Direct call to the context's translate function
    return contextTranslate(key, fallback, values);
  };
  
  // Force refresh translations on language change or lastUpdate change
  useEffect(() => {
    console.log(`SafeTranslation[${instanceId.current}]: Language changed to ${language}, refreshing translations`);
    
    // Initial refresh
    setRefreshCounter(c => c + 1);
    refreshTranslations();
    
    // Delayed refreshes for better reliability
    const timers = [
      setTimeout(() => setRefreshCounter(c => c + 1), 100),
      setTimeout(() => setRefreshCounter(c => c + 1), 300),
      setTimeout(() => setRefreshCounter(c => c + 1), 500)
    ];
    
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [language, lastUpdate, refreshTranslations]);
  
  return {
    t,
    language: currentLanguage,
    refreshCounter,
    instanceId: instanceId.current
  };
};

export default useSafeTranslation;
