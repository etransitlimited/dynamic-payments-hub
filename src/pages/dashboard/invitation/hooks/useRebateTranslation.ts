
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
          let currentObj = langTranslations;
          
          for (const part of keyParts) {
            if (currentObj === undefined || currentObj === null) {
              return key;
            }
            
            // Need to cast this because TypeScript doesn't know the shape
            currentObj = (currentObj as any)[part];
            
            if (currentObj === undefined) {
              // If translation not found and language is not English, try English
              if (language !== 'en') {
                const enTranslation = rebateTranslations.en;
                let enObj = enTranslation;
                
                for (const p of keyParts) {
                  if (enObj === undefined || enObj === null) {
                    return key;
                  }
                  
                  enObj = (enObj as any)[p];
                  
                  if (enObj === undefined) {
                    return key;
                  }
                }
                
                return enObj || key;
              }
              
              return key;
            }
          }
          
          return currentObj || key;
        }
        
        const translation = (langTranslations as any)[key];
        
        // If translation not found in rebate translations and language is not English, fall back to English
        if (!translation && language !== 'en') {
          const enTranslation = rebateTranslations.en[key as keyof typeof rebateTranslations.en];
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
    namespace: 'rebate'
  };
};
