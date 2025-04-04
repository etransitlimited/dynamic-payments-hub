
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
  
  // Force re-render when language changes OR when navigating to this page
  useEffect(() => {
    const languageChanged = prevLanguageRef.current !== language;
    const pathChanged = prevPathRef.current !== location.pathname;
    
    if (languageChanged || pathChanged) {
      console.log(`PageLanguage hook detected changes: 
        language: ${prevLanguageRef.current} -> ${language}, 
        path: ${prevPathRef.current} -> ${location.pathname}`
      );
      
      prevLanguageRef.current = language;
      prevPathRef.current = location.pathname;
      
      // Update page title
      const translatedTitle = getDirectTranslation(titleKey, language as LanguageCode, defaultTitle);
      document.title = `${translatedTitle} | Dashboard`;
      
      // Force component rerender with new key
      setForceUpdateKey(`page-${language}-${location.pathname}-${Date.now()}`);
      
      // Add a small delay for a second update to catch any missed translations
      const timer = setTimeout(() => {
        setForceUpdateKey(`page-${language}-${location.pathname}-${Date.now()}-delayed`);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [language, location.pathname, titleKey, defaultTitle, lastUpdate]);
  
  // Create a wrapper function for getDirectTranslation to avoid hook issues
  const getTranslation = useCallback((key: string, fallback?: string): string => {
    const result = getDirectTranslation(key, language as LanguageCode, fallback);
    return result;
  }, [language]);
  
  return {
    language,
    forceUpdateKey,
    getTranslation
  };
};
