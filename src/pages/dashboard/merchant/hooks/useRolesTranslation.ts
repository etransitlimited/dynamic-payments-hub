
import { useMemo } from 'react';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import rolesTranslations from '../i18n/roles';
import { LanguageCode } from '@/utils/languageUtils';

export const useRolesTranslation = () => {
  const { language, setLanguage } = useSafeTranslation();
  
  const t = useMemo(() => {
    return (key: string): string => {
      try {
        // Get translation from the roles translations
        const langTranslations = rolesTranslations[language as keyof typeof rolesTranslations];
        
        if (!langTranslations) {
          console.warn(`No roles translations found for language "${language}"`);
          return key;
        }
        
        const translation = langTranslations[key as keyof typeof langTranslations];
        
        // If translation not found in roles, fallback to English
        if (!translation && language !== 'en') {
          const enTranslation = rolesTranslations.en[key as keyof typeof rolesTranslations.en];
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
    namespace: 'roles'
  };
};
