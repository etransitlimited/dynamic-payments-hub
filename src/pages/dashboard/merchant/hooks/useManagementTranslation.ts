
import { useMemo } from 'react';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import managementTranslations from '../i18n/management';
import { LanguageCode } from '@/utils/languageUtils';

export const useManagementTranslation = () => {
  const { language, setLanguage } = useSafeTranslation();
  
  const t = useMemo(() => {
    return (key: string): string => {
      try {
        // Get translation from the management translations
        const langTranslations = managementTranslations[language as keyof typeof managementTranslations];
        
        if (!langTranslations) {
          console.warn(`No management translations found for language "${language}"`);
          return key;
        }
        
        const translation = langTranslations[key as keyof typeof langTranslations];
        
        // If translation not found, fallback to English
        if (!translation && language !== 'en') {
          const enTranslation = managementTranslations.en[key as keyof typeof managementTranslations.en];
          return enTranslation || key;
        }
        
        return translation || key;
      } catch (error) {
        console.error(`Error getting translation for key "${key}":`, error);
        return key;
      }
    };
  }, [language]);
  
  return {
    t,
    language,
    setLanguage,
    namespace: 'management'
  };
};
