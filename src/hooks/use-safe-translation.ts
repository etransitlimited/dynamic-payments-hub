
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from '@/context/TranslationProvider';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/utils/languageUtils';

/**
 * Hook that provides safe translation with fallbacks and optimized performance
 * to reduce flickering and prevent excessive re-renders
 */
export const useSafeTranslation = () => {
  const { translate: contextTranslate, currentLanguage, refreshTranslations } = useTranslation();
  const { language, setLanguage, lastUpdate } = useLanguage();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const instanceId = useRef(`trans-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const lastRefreshTimestamp = useRef(Date.now());
  const previousLanguage = useRef<LanguageCode>(currentLanguage);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const refreshQueuedRef = useRef(false);
  const isRefreshThrottled = useRef(false);
  const stableLanguage = useRef<LanguageCode>(currentLanguage);
  const translationCache = useRef<Record<string, string>>({});
  const isInitialRender = useRef(true);
  
  // Update stable language when context language changes
  useEffect(() => {
    if (currentLanguage !== stableLanguage.current) {
      stableLanguage.current = currentLanguage;
      
      // Force refresh only when language actually changes
      if (previousLanguage.current !== currentLanguage) {
        previousLanguage.current = currentLanguage;
        
        // Clear the cache on language change
        translationCache.current = {};
        
        // Schedule a single refresh with delay to allow other components to update
        if (!isInitialRender.current) {
          setTimeout(() => {
            setRefreshCounter(prev => prev + 1);
          }, 50);
        }
      }
    }
    
    // After first render, mark initialization complete
    if (isInitialRender.current) {
      isInitialRender.current = false;
    }
  }, [currentLanguage]);
  
  // Create a throttled refresh function to prevent too many updates
  const triggerRefreshDelayed = useCallback((isLanguageChange = false) => {
    // Skip if a refresh is already queued
    if (refreshQueuedRef.current) return;
    
    refreshQueuedRef.current = true;
    
    // Only allow refreshes every 400ms to prevent thrashing
    const canRefreshNow = Date.now() - lastRefreshTimestamp.current > 400;
    
    if (canRefreshNow || isLanguageChange) {
      // Clear any pending timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      
      // Set a short delay to batch potential multiple refresh requests
      debounceTimeout.current = setTimeout(() => {
        lastRefreshTimestamp.current = Date.now();
        setRefreshCounter(prev => prev + 1);
        refreshQueuedRef.current = false;
        
        // Only call refreshTranslations once (avoid cascading updates)
        if (isLanguageChange) {
          refreshTranslations();
        }
      }, isLanguageChange ? 50 : 150);
    } else {
      // Queue for later if we're throttled
      debounceTimeout.current = setTimeout(() => {
        refreshQueuedRef.current = false;
        triggerRefreshDelayed(false); // Try again later
      }, 200);
    }
  }, [refreshTranslations]);
  
  // Create a stable translation function with caching for performance
  const t = useCallback((key: string, fallback?: string, values?: Record<string, string | number>): string => {
    try {
      // Create a cache key that includes language and values
      const valuesStr = values ? JSON.stringify(values) : '';
      const cacheKey = `${stableLanguage.current}:${key}:${valuesStr}`;
      
      // Return cached result if available
      if (translationCache.current[cacheKey]) {
        return translationCache.current[cacheKey];
      }
      
      // Get translation from context
      const result = contextTranslate(key, fallback, values);
      
      // Cache successful translations
      if (result && result !== key) {
        translationCache.current[cacheKey] = result;
      }
      
      return result;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return fallback || key;
    }
  }, [contextTranslate]);
  
  // Force refresh translations when language changes, but limit frequency
  useEffect(() => {
    // Skip on initial mount to prevent double refresh
    if (!isInitialRender.current && (
      previousLanguage.current !== currentLanguage || 
      lastUpdate > lastRefreshTimestamp.current
    )) {
      triggerRefreshDelayed(true);
    }
    
    // Clean up timeouts on unmount
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [currentLanguage, lastUpdate, triggerRefreshDelayed]);
  
  return {
    t,
    language: stableLanguage.current,
    refreshCounter,
    instanceId: instanceId.current,
    setLanguage
  };
};

export default useSafeTranslation;
