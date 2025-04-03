
import { useState, useEffect } from 'react';
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
  const { language } = useLanguage();
  const location = useLocation();
  const [forceUpdateKey, setForceUpdateKey] = useState(`page-${language}-${location.pathname}-${Date.now()}`);
  
  // Force re-render when language changes OR when navigating to this page
  useEffect(() => {
    console.log(`PageLanguage hook detected language: ${language}, path: ${location.pathname}`);
    setForceUpdateKey(`page-${language}-${location.pathname}-${Date.now()}`);
    
    // Update page title
    const translatedTitle = getDirectTranslation(titleKey, language, defaultTitle);
    document.title = `${translatedTitle} | Dashboard`;
  }, [language, location.pathname, titleKey, defaultTitle]);
  
  return {
    language,
    forceUpdateKey,
    getTranslation: (key: string, fallback?: string): string => {
      return getDirectTranslation(key, language as LanguageCode, fallback);
    }
  };
};
