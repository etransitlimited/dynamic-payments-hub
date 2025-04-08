
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
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastRefreshBatch = useRef<number[]>([]);
  const isRefreshThrottled = useRef(false);
  const refreshQueuedRef = useRef(false);
  
  // Update local language when context language changes
  useEffect(() => {
    if (currentLanguage !== localLanguage) {
      setLocalLanguage(currentLanguage);
      
      // Force refresh when language actually changes
      if (previousLanguage.current !== currentLanguage) {
        previousLanguage.current = currentLanguage;
        triggerRefreshDelayed(true);
      }
    }
  }, [currentLanguage, localLanguage]);
  
  // Improved throttled refresh function to prevent excessive re-renders
  const triggerRefreshDelayed = useCallback((isLanguageChange = false) => {
    if (refreshQueuedRef.current) return;
    
    refreshQueuedRef.current = true;
    
    const delay = isLanguageChange ? 100 : 250;
    
    // Clear any existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    // Create a debounced refresh
    debounceTimeout.current = setTimeout(() => {
      // Only refresh if we're not throttled or it's a language change
      if (!isRefreshThrottled.current || isLanguageChange) {
        lastRefreshTimestamp.current = Date.now();
        isRefreshThrottled.current = true;
        
        // Reset throttle after a short delay
        setTimeout(() => {
          isRefreshThrottled.current = false;
        }, 600);
        
        // Execute refresh
        setRefreshCounter(prev => prev + 1);
        refreshTranslations();
      }
      
      refreshQueuedRef.current = false;
    }, delay);
  }, [refreshTranslations]);
  
  // Create a stable translation function with optimizations
  const t = useCallback((key: string, fallback?: string, values?: Record<string, string | number>): string => {
    try {
      // Use the context's translate function with error handling
      const result = contextTranslate(key, fallback, values);
      return result;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return fallback || key;
    }
  }, [contextTranslate]);
  
  // Force refresh translations on language change or lastUpdate change
  // But use a single useEffect to prevent multiple refreshes
  useEffect(() => {
    // Initial refresh
    triggerRefreshDelayed(true);
    
    // Clean up any timeouts on unmount
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [language, lastUpdate, triggerRefreshDelayed]);
  
  return {
    t,
    language: currentLanguage,
    refreshCounter,
    instanceId: instanceId.current,
    setLanguage
  };
};

export default useSafeTranslation;
