
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
  const { language: contextLanguage, setLanguage, lastUpdate } = useLanguage();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const instanceId = useRef(`trans-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const lastRefreshTimestamp = useRef(Date.now());
  const previousLanguage = useRef<LanguageCode>(currentLanguage);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const refreshQueuedRef = useRef(false);
  const stableLanguage = useRef<LanguageCode>(currentLanguage);
  const translationCache = useRef<Record<string, string>>({});
  const lastContextLanguage = useRef<LanguageCode>(contextLanguage as LanguageCode);
  const isRefreshing = useRef(false);
  
  // Track any differences between TranslationProvider and LanguageContext
  useEffect(() => {
    if (contextLanguage !== currentLanguage) {
      console.log(`useSafeTranslation: Language mismatch detected - context: ${contextLanguage}, provider: ${currentLanguage}`);
    }
    
    // Use a stable reference to the current language
    if (currentLanguage !== stableLanguage.current) {
      console.log(`useSafeTranslation: Updating stable language from ${stableLanguage.current} to ${currentLanguage}`);
      stableLanguage.current = currentLanguage;
      
      // Clear the cache on language change
      translationCache.current = {};
      
      if (previousLanguage.current !== currentLanguage) {
        previousLanguage.current = currentLanguage;
        
        // Delay refresh slightly to allow other components to update
        setTimeout(() => {
          if (!isRefreshing.current) {
            isRefreshing.current = true;
            setRefreshCounter(prev => prev + 1);
            lastRefreshTimestamp.current = Date.now();
            isRefreshing.current = false;
          }
        }, 50);
      }
    }
    
    // Track changes in LanguageContext
    if (lastContextLanguage.current !== contextLanguage) {
      lastContextLanguage.current = contextLanguage as LanguageCode;
    }
  }, [currentLanguage, contextLanguage]);
  
  // Create a throttled refresh function to prevent too many updates
  const triggerRefresh = useCallback((isLanguageChange = false) => {
    // Skip if already refreshing or a refresh is queued
    if (refreshQueuedRef.current || isRefreshing.current) return;
    
    // Only allow refreshes every 400ms to prevent thrashing
    const canRefreshNow = Date.now() - lastRefreshTimestamp.current > 400;
    
    if (canRefreshNow || isLanguageChange) {
      // Clear any pending timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = null;
      }
      
      // Set the refresh flag
      refreshQueuedRef.current = true;
      
      // Schedule the refresh with a small delay to batch updates
      debounceTimeout.current = setTimeout(() => {
        isRefreshing.current = true;
        setRefreshCounter(prev => prev + 1);
        lastRefreshTimestamp.current = Date.now();
        refreshQueuedRef.current = false;
        isRefreshing.current = false;
        
        // Only call context refresh on language change to avoid cascading updates
        if (isLanguageChange) {
          refreshTranslations();
        }
      }, isLanguageChange ? 50 : 150);
    }
  }, [refreshTranslations]);
  
  // Create a stable translation function with caching
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
  
  // Force refresh translations when language changes or lastUpdate changes
  useEffect(() => {
    // Skip on initial mount to prevent double refresh
    const shouldRefresh = (
      previousLanguage.current !== currentLanguage || 
      lastUpdate > lastRefreshTimestamp.current
    );
    
    if (shouldRefresh) {
      triggerRefresh(true);
    }
    
    // Clean up timeouts on unmount
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [currentLanguage, lastUpdate, triggerRefresh]);
  
  return {
    t,
    language: stableLanguage.current,
    refreshCounter,
    instanceId: instanceId.current,
    setLanguage
  };
};

export default useSafeTranslation;
