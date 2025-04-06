
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getDirectTranslation, formatDirectTranslation } from '@/utils/translationHelpers';
import { LanguageCode } from '@/utils/languageUtils';

/**
 * A safer version of the translation hook that provides fallbacks
 * and prevents unnecessary rerenders
 */
export const useSafeTranslation = () => {
  const languageContext = useLanguage();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const prevLanguageRef = useRef<string | null>(null);
  const mountTimeRef = useRef(Date.now());
  const translationCacheRef = useRef<Record<string, string>>({});

  // Force refresh of translations
  const refreshTranslations = useCallback(() => {
    setRefreshCounter(prev => prev + 1);
    // Clear the translation cache when refreshing
    translationCacheRef.current = {};
  }, []);

  // Safer translation function with caching
  const t = useCallback((key: string, fallback?: string, values?: Record<string, string | number>): string => {
    try {
      if (!key) return fallback || '';

      // Create a cache key that includes language and the translation key
      const cacheKey = `${languageContext.language}:${key}`;
      
      // Check if we have a cached result
      if (translationCacheRef.current[cacheKey]) {
        const cachedResult = translationCacheRef.current[cacheKey];
        
        // Apply values formatting if needed
        if (values) {
          return formatDirectTranslation(cachedResult, values);
        }
        
        return cachedResult;
      }
      
      // First try to directly use the t function from the language context
      if (typeof languageContext.t === 'function') {
        const contextResult = languageContext.t(key);
        if (contextResult && contextResult !== key) {
          translationCacheRef.current[cacheKey] = contextResult;
          
          if (values) {
            return formatDirectTranslation(contextResult, values);
          }
          
          return contextResult;
        }
      }
      
      // If context t function didn't work, use our helper
      const result = getDirectTranslation(key, languageContext.language as LanguageCode, fallback);
      
      // Cache the result
      translationCacheRef.current[cacheKey] = result;
      
      if (values) {
        return formatDirectTranslation(result, values);
      }
      
      return result;
    } catch (error) {
      console.error(`Error translating key "${key}":`, error);
      return fallback || key;
    }
  }, [languageContext.language, languageContext.t]);

  // Update when language changes
  useEffect(() => {
    if (prevLanguageRef.current !== languageContext.language) {
      console.log(`Language changed in useSafeTranslation from ${prevLanguageRef.current} to ${languageContext.language}`);
      prevLanguageRef.current = languageContext.language;
      
      // Clear cache on language change
      translationCacheRef.current = {};
      
      // First immediate refresh
      refreshTranslations();
      
      // Second refresh after a small delay to ensure all components update
      const timer1 = setTimeout(() => {
        refreshTranslations();
      }, 50);
      
      // Third refresh after component is fully rendered
      const timer2 = setTimeout(() => {
        refreshTranslations();
      }, 200);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [languageContext.language, refreshTranslations]);

  return {
    t,
    language: languageContext.language,
    setLanguage: languageContext.setLanguage,
    refreshCounter,
    refreshTranslations,
    instanceId: mountTimeRef.current
  };
};
