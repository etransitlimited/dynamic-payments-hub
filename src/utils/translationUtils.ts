
import translations from "@/translations";
import { LanguageCode } from '@/utils/languageUtils';

// Updated translation function with improved error handling and fallbacks
export const getTranslation = (key: string, language: LanguageCode): string => {
  try {
    // Handle nested objects by using dot notation in the key (e.g., "hero.title")
    if (key.includes('.')) {
      const parts = key.split('.');
      let value: any = translations[language];
      
      // Navigate through the nested objects
      for (const part of parts) {
        if (value && typeof value === 'object' && part in value) {
          value = value[part];
        } else {
          console.warn(`Translation key not found: "${key}" in language "${language}"`);
          // Try fallback to English if current language is not English
          if (language !== 'en') {
            let fallbackValue: any = translations['en'];
            let fallbackFound = true;
            
            for (const fallbackPart of parts) {
              if (fallbackValue && typeof fallbackValue === 'object' && fallbackPart in fallbackValue) {
                fallbackValue = fallbackValue[fallbackPart];
              } else {
                fallbackFound = false;
                break;
              }
            }
            
            if (fallbackFound && typeof fallbackValue === 'string') {
              console.info(`Using English fallback for key: "${key}"`);
              return fallbackValue;
            }
          }
          return key; // Key not found, return the key itself
        }
      }
      
      // Check if we got a string at the end
      if (typeof value === 'string') {
        return value;
      } else {
        console.warn(`Translation key "${key}" resolves to a non-string value:`, value);
        return key; // Return the key if the value is not a string
      }
    } else {
      // Handle top-level keys
      const value = translations[language][key as keyof typeof translations[typeof language]];
      if (typeof value === 'string') {
        return value;
      } else {
        console.warn(`Translation key "${key}" resolves to a non-string value:`, value);
        
        // Try fallback to English
        if (language !== 'en') {
          const fallbackValue = translations['en'][key as keyof typeof translations['en']];
          if (typeof fallbackValue === 'string') {
            console.info(`Using English fallback for key: "${key}"`);
            return fallbackValue;
          }
        }
        
        return key; // Return the key if the value is not a string
      }
    }
  } catch (error) {
    console.error(`Error accessing translation key "${key}":`, error);
    return key; // Return the key itself as fallback
  }
};
