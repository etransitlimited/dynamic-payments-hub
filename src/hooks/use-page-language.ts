
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from 'react-router-dom';
import { getDirectTranslation } from '@/utils/translationHelpers';
import { LanguageCode } from '@/utils/languageUtils';

/**
 * Custom hook to handle language changes and page title updates
 * @param titleKey - The translation key for the page title
 * @param defaultTitle - Fallback title if translation is not found
 * @returns Object containing language, forceUpdateKey, and translations object
 */
export const usePageLanguage = (
  titleKey: string,
  defaultTitle: string = 'Dashboard'
) => {
  const { language, lastUpdate } = useLanguage();
  const location = useLocation();
  const componentMountTime = useRef(Date.now());
  const [forceUpdateKey, setForceUpdateKey] = useState(`page-${language}-${location.pathname}-${componentMountTime.current}`);
  const prevLanguageRef = useRef<string>(language);
  const prevPathRef = useRef<string>(location.pathname);
  const instanceId = useRef(Math.random().toString(36).substring(2, 9));
  const translationCacheRef = useRef<Record<string, string>>({});
  const retryCountRef = useRef(0);
  
  // Force re-render when language changes OR when navigating to this page
  useEffect(() => {
    const languageChanged = prevLanguageRef.current !== language;
    const pathChanged = prevPathRef.current !== location.pathname;
    
    if (languageChanged || pathChanged || lastUpdate) {
      console.log(`PageLanguage hook detected changes: 
        language: ${prevLanguageRef.current} -> ${language}, 
        path: ${prevPathRef.current} -> ${location.pathname},
        instanceId: ${instanceId.current},
        lastUpdate: ${lastUpdate}
      `);
      
      prevLanguageRef.current = language;
      prevPathRef.current = location.pathname;
      
      // Clear cache when language changes
      if (languageChanged) {
        translationCacheRef.current = {};
        retryCountRef.current = 0;
      }
      
      // Update page title
      const translatedTitle = getDirectTranslation(titleKey, language as LanguageCode, defaultTitle);
      document.title = `${translatedTitle} | Dashboard`;
      
      // Force component rerender with new key
      setForceUpdateKey(`page-${language}-${location.pathname}-${Date.now()}`);
      
      // Multiple updates with increasing delays for reliable rendering
      const timers = [
        setTimeout(() => {
          retryCountRef.current++;
          setForceUpdateKey(`page-${language}-${location.pathname}-${Date.now()}-retry-${retryCountRef.current}`);
        }, 100),
        setTimeout(() => {
          retryCountRef.current++;
          setForceUpdateKey(`page-${language}-${location.pathname}-${Date.now()}-retry-${retryCountRef.current}`);
        }, 300),
        setTimeout(() => {
          retryCountRef.current++;
          setForceUpdateKey(`page-${language}-${location.pathname}-${Date.now()}-retry-${retryCountRef.current}`);
        }, 500)
      ];
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [language, location.pathname, titleKey, defaultTitle, lastUpdate]);
  
  // Create a wrapper function for getDirectTranslation with caching
  const getTranslation = useCallback((key: string, fallback?: string): string => {
    try {
      // Create a cache key
      const cacheKey = `${language}:${key}`;
      
      // Check if we have this in cache
      if (translationCacheRef.current[cacheKey]) {
        return translationCacheRef.current[cacheKey];
      }
      
      // Get fresh translation
      const result = getDirectTranslation(key, language as LanguageCode, fallback);
      
      // Cache the result
      translationCacheRef.current[cacheKey] = result;
      
      return result;
    } catch (error) {
      console.error(`Error in getTranslation for key "${key}":`, error);
      return fallback || key;
    }
  }, [language]);
  
  return {
    language,
    forceUpdateKey,
    getTranslation,
    instanceId: instanceId.current
  };
};
