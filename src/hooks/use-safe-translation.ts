import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from '@/context/TranslationProvider';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/utils/languageUtils';

/**
 * Hook that provides safe translation with fallbacks and retries
 * with optimizations to reduce flickering and improve performance
 */
export const useSafeTranslation = () => {
  const { translate: contextTranslate, currentLanguage, refreshTranslations } = useTranslation();
  const { language, setLanguage, lastUpdate } = useLanguage();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const instanceId = useRef(`trans-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const lastRefreshTimestamp = useRef(Date.now());
  const [localLanguage, setLocalLanguage] = useState(currentLanguage);
  const previousLanguage = useRef(currentLanguage);
  const debounceTimeout = useRef<number | null>(null);
  const lastRefreshBatch = useRef<number[]>([]);
  
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
  
  // Debounced refresh to prevent excessive re-renders
  const requestRefresh = useCallback(() => {
    const now = Date.now();
    
    // Throttle refreshes to no more than one every 300ms
    if (now - lastRefreshTimestamp.current > 300) {
      lastRefreshTimestamp.current = now;
      
      // Store the time for this refresh batch
      const refreshTime = Date.now();
      lastRefreshBatch.current.push(refreshTime);
      
      // Keep only the last 3 refresh timestamps
      if (lastRefreshBatch.current.length > 3) {
        lastRefreshBatch.current.shift();
      }
      
      // Clear any existing timeout
      if (debounceTimeout.current) {
        window.clearTimeout(debounceTimeout.current);
      }
      
      // Create a debounced refresh
      debounceTimeout.current = window.setTimeout(() => {
        setRefreshCounter(prev => prev + 1);
        refreshTranslations();
        
        // If we haven't refreshed in the last 500ms, schedule another refresh
        // This helps ensure components catch the updated translations
        const timeSinceLastRefresh = Date.now() - (lastRefreshBatch.current[lastRefreshBatch.current.length - 1] || 0);
        if (timeSinceLastRefresh > 500) {
          window.setTimeout(() => {
            setRefreshCounter(prev => prev + 1);
          }, 100);
        }
      }, 50);
    }
  }, [refreshTranslations]);
  
  // Create a stable translation function with retries
  const t = useCallback((key: string, fallback?: string, values?: Record<string, string | number>): string => {
    try {
      // Direct call to the context's translate function
      const result = contextTranslate(key, fallback, values);
      
      // If the result is the key itself and it likely should be translated, log a warning
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
    
    // Multiple staggered refreshes help ensure components get updated translations
    const timers = [
      setTimeout(() => requestRefresh(), 100),
      setTimeout(() => requestRefresh(), 400)
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
