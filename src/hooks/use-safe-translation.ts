
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

  // Force refresh of translations
  const refreshTranslations = useCallback(() => {
    setRefreshCounter(prev => prev + 1);
  }, []);

  // Safer translation function
  const t = useCallback((key: string, fallback?: string, values?: Record<string, string | number>): string => {
    try {
      if (!key) return fallback || '';
      
      const result = getDirectTranslation(key, languageContext.language as LanguageCode, fallback);
      
      if (values) {
        return formatDirectTranslation(result, values);
      }
      
      return result;
    } catch (error) {
      console.error(`Error translating key "${key}":`, error);
      return fallback || key;
    }
  }, [languageContext.language]);

  // Update when language changes
  useEffect(() => {
    if (prevLanguageRef.current !== languageContext.language) {
      console.log(`Language changed in useSafeTranslation from ${prevLanguageRef.current} to ${languageContext.language}`);
      prevLanguageRef.current = languageContext.language;
      
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
