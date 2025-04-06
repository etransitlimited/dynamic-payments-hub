
import translations from '@/translations';
import { LanguageCode } from './languageUtils';

/**
 * Get direct translation for a key without going through the context
 */
export const getDirectTranslation = (
  key: string, 
  language: LanguageCode,
  fallback?: string
): string => {
  try {
    // Split the key on '.' to access nested properties
    const keys = key.split('.');
    let result: any = translations[language];
    
    if (!result) {
      console.warn(`No translations available for language: ${language}`);
      result = translations['en']; // Default to English
    }
    
    // Navigate through the nested keys
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Key not found in current language
        if (language !== 'en') {
          // Try English as fallback
          let fallbackResult = translations['en'];
          let fallbackFound = true;
          
          for (const fallbackKey of keys) {
            if (fallbackResult && typeof fallbackResult === 'object' && fallbackKey in fallbackResult) {
              fallbackResult = fallbackResult[fallbackKey];
            } else {
              fallbackFound = false;
              break;
            }
          }
          
          if (fallbackFound && typeof fallbackResult === 'string') {
            return fallbackResult;
          }
        }
        
        // Return fallback or key if nothing found
        return fallback || key;
      }
    }
    
    return typeof result === 'string' ? result : fallback || key;
  } catch (error) {
    console.error(`Error getting direct translation for "${key}":`, error);
    return fallback || key;
  }
};

/**
 * Format translation with variable replacements
 * Example: formatDirectTranslation("Hello {name}", { name: "John" }) => "Hello John"
 */
export const formatDirectTranslation = (
  text: string, 
  values: Record<string, string | number>
): string => {
  if (!text) return '';
  if (!values || typeof values !== 'object') return text;
  
  return Object.entries(values).reduce((result, [key, value]) => {
    const regex = new RegExp(`{${key}}`, 'g');
    return result.replace(regex, String(value));
  }, text);
};
