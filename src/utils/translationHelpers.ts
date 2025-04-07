
import translations from '@/translations';
import { LanguageCode } from './languageUtils';

/**
 * Get translation directly from the translations object without going through context
 * @param key Translation key in dot notation
 * @param language Language code
 * @param fallback Fallback text if translation not found
 * @returns The translated text or fallback
 */
export const getDirectTranslation = (key: string, language: LanguageCode, fallback?: string): string => {
  try {
    if (!key) return fallback || '';
    
    // Get the language translations object
    const langTranslations = translations[language];
    if (!langTranslations) {
      console.warn(`No translations found for language "${language}", falling back to English`);
      
      // Try English as fallback language
      if (language !== 'en') {
        return getDirectTranslation(key, 'en' as LanguageCode, fallback);
      }
      
      return fallback || key;
    }
    
    // Handle nested keys (e.g., "analytics.title")
    const keys = key.split('.');
    let result: any = langTranslations;
    
    // Navigate through the nested objects
    for (const k of keys) {
      if (result === undefined || result === null || typeof result !== 'object') {
        // If the path is broken and language is not English, try English
        if (language !== 'en') {
          return getDirectTranslation(key, 'en' as LanguageCode, fallback);
        }
        
        return fallback || key;
      }
      
      result = result[k];
    }
    
    // If result is undefined and language is not English, try English
    if (result === undefined && language !== 'en') {
      return getDirectTranslation(key, 'en' as LanguageCode, fallback);
    }
    
    return typeof result === 'string' ? result : fallback || key;
  } catch (error) {
    console.error(`Error getting direct translation for key "${key}" in language "${language}":`, error);
    return fallback || key;
  }
};

/**
 * Format translation string with variables
 * @param text Translation string with placeholders (e.g. {variable})
 * @param values Object containing variable values to replace
 * @returns Formatted translation
 */
export const formatDirectTranslation = (text: string, values?: Record<string, string | number>): string => {
  if (!values || !text) return text;
  
  let result = text;
  
  try {
    // Replace each placeholder with its value
    Object.entries(values).forEach(([key, value]) => {
      const pattern = new RegExp(`\\{${key}\\}`, 'g');
      result = result.replace(pattern, String(value));
    });
    
    return result;
  } catch (error) {
    console.error(`Error formatting translation "${text}":`, error);
    return text;
  }
};

/**
 * Clear any translation cache
 */
export const clearTranslationCache = (): void => {
  // This function can be expanded if we add caching later
  console.log('Translation cache cleared');
};
