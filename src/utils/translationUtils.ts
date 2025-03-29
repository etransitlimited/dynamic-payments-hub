
import translations from "@/translations";
import { LanguageCode } from '@/utils/languageUtils';

// Translation function with improved error handling and fallbacks
export const getTranslation = (key: string, language: LanguageCode): string => {
  try {
    // Check if the provided language exists
    if (!translations[language]) {
      console.warn(`Language "${language}" is not supported. Falling back to English.`);
      language = 'en';
    }

    // For empty keys, return an empty string
    if (!key) {
      return '';
    }

    // Handle nested objects by using dot notation in the key (e.g., "hero.title")
    if (key.includes('.')) {
      const parts = key.split('.');
      let value: any = translations[language];
      
      // Navigate through the nested objects
      for (const part of parts) {
        if (value && typeof value === 'object' && part in value) {
          value = value[part];
        } else {
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
              return fallbackValue;
            }
          }
          
          console.warn(`Translation key not found: "${key}" in language "${language}"`);
          return key; // Key not found, return the key itself
        }
      }
      
      // Check if we got a string at the end
      if (typeof value === 'string') {
        return value;
      } else if (value === undefined || value === null) {
        return key;
      } else {
        return String(value); // Try to convert to string
      }
    } else {
      // Handle top-level keys (should not happen with properly structured translations)
      if (translations[language] && typeof translations[language][key] === 'string') {
        return translations[language][key];
      }
      
      // Try English fallback for non-English languages
      if (language !== 'en' && translations['en'] && typeof translations['en'][key] === 'string') {
        return translations['en'][key];
      }
      
      // If all fails, return the key
      return key;
    }
  } catch (error) {
    console.error(`Error accessing translation key "${key}":`, error);
    return key; // Return the key itself as fallback
  }
};
