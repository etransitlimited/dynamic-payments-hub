
import { useMemo } from 'react';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import rebateTranslations from '../i18n/rebate';
import { LanguageCode } from '@/utils/languageUtils';

export const useRebateTranslation = () => {
  const { language, setLanguage } = useSafeTranslation();
  
  const t = useMemo(() => {
    return (key: string): string => {
      try {
        // Get translation from the rebate translations
        const langTranslations = rebateTranslations[language as keyof typeof rebateTranslations];
        
        if (!langTranslations) {
          console.warn(`No rebate translations found for language "${language}"`);
          return key;
        }
        
        // Handle nested keys (e.g., "status.completed")
        if (key.includes('.')) {
          const keyParts = key.split('.');
          let currentObj: any = langTranslations;
          
          for (const part of keyParts) {
            if (currentObj === undefined || currentObj === null) {
              return key;
            }
            
            currentObj = currentObj[part];
            
            if (currentObj === undefined) {
              // If translation not found and language is not English, try English
              if (language !== 'en') {
                const enTranslation = rebateTranslations.en;
                let enObj: any = enTranslation;
                
                for (const p of keyParts) {
                  if (enObj === undefined || enObj === null) {
                    return key;
                  }
                  
                  enObj = enObj[p];
                  
                  if (enObj === undefined) {
                    return key;
                  }
                }
                
                return typeof enObj === 'string' ? enObj : key;
              }
              
              return key;
            }
          }
          
          return typeof currentObj === 'string' ? currentObj : key;
        }
        
        const translation = (langTranslations as any)[key];
        
        // If translation not found in rebate translations and language is not English, fall back to English
        if (translation === undefined && language !== 'en') {
          const enTranslation = rebateTranslations.en[key as keyof typeof rebateTranslations.en];
          return typeof enTranslation === 'string' ? enTranslation : key;
        }
        
        return typeof translation === 'string' ? translation : key;
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
    namespace: 'rebate'
  };
};
