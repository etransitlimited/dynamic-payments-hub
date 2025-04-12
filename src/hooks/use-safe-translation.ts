
import { useTranslation } from 'react-i18next';
import { useState, useCallback } from 'react';

export const useSafeTranslation = () => {
  const { t: originalT, i18n } = useTranslation();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const language = i18n.language;

  // Enhanced t function with support for default value and options
  const safeT = (key: string, defaultValue?: string | { [key: string]: any }, options?: { [key: string]: any }) => {
    if (typeof defaultValue === 'string') {
      return originalT(key, defaultValue, options);
    }
    return originalT(key, options);
  };

  // Method to change the language
  const setLanguage = useCallback(async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      setRefreshCounter(prev => prev + 1);
      return true;
    } catch (error) {
      console.error('Failed to change language:', error);
      return false;
    }
  }, [i18n]);

  // Method to force refresh translations
  const refreshTranslations = useCallback(() => {
    setRefreshCounter(prev => prev + 1);
  }, []);

  return { 
    t: safeT, 
    language,
    refreshCounter,
    refreshTranslations,
    setLanguage
  };
};
