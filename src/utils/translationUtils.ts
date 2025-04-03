
import translations from '@/translations';
import { LanguageCode } from './languageUtils';

/**
 * Retrieves a translation value from nested objects using dot notation
 * @param obj The object to search in
 * @param path The path in dot notation (e.g., "wallet.deposit.form")
 * @returns The translation value or the path if not found
 */
export const getNestedValue = (obj: any, path: string): string => {
  if (!obj || !path) return path;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === undefined || current === null) {
      console.warn(`Translation path "${path}" resolving failed at key "${key}"`);
      return path;
    }
    
    current = current[key];
  }
  
  if (typeof current !== 'string' && current !== undefined && current !== null) {
    console.warn(`Translation for "${path}" is not a string but ${typeof current}`);
    return path;
  }
  
  return current === undefined || current === null ? path : current;
};

/**
 * Gets a translation for a specific key and language
 * @param key The translation key in dot notation
 * @param language The language code
 * @returns The translated string or the key if not found
 */
export const getTranslation = (key: string, language: LanguageCode = 'en'): string => {
  try {
    if (!key) {
      console.warn('Empty translation key provided');
      return '';
    }
    
    // First, get the translation object for the specified language
    const langTranslations = translations[language];
    
    if (!langTranslations) {
      console.warn(`No translations found for language "${language}"`);
      
      // Fall back to English if the requested language is not available
      if (language !== 'en') {
        return getTranslation(key, 'en');
      }
      
      return key;
    }
    
    // Get the nested value using the key path
    const translation = getNestedValue(langTranslations, key);
    
    // If translation is the same as the key (not found), try falling back to English
    if (translation === key && language !== 'en') {
      console.warn(`Translation for "${key}" not found in "${language}", falling back to English`);
      return getTranslation(key, 'en');
    }
    
    return translation;
  } catch (error) {
    console.error(`Error getting translation for "${key}" in "${language}":`, error);
    return key;
  }
};

/**
 * Gets all available translations for a specific key
 * @param key The translation key
 * @returns An object with translations for each available language
 */
export const getAllTranslations = (key: string): Record<LanguageCode, string> => {
  const result: Partial<Record<LanguageCode, string>> = {};
  
  Object.keys(translations).forEach((lang) => {
    const language = lang as LanguageCode;
    result[language] = getTranslation(key, language);
  });
  
  return result as Record<LanguageCode, string>;
};

/**
 * Format a translation string with variables
 * @param text The translation string with placeholders like {variable}
 * @param values Object containing variable values to insert
 * @returns Formatted string with variables replaced
 */
export const formatTranslation = (text: string, values?: Record<string, string | number>): string => {
  if (!values || !text) return text;
  
  let result = text;
  
  try {
    // Process each value in the values object
    Object.entries(values).forEach(([key, value]) => {
      // Create regex pattern for {key} format
      const pattern = new RegExp(`\\{${key}\\}`, 'g');
      
      // Ensure value is properly converted to string
      const stringValue = String(value);
      
      // Replace all occurrences
      result = result.replace(pattern, stringValue);
      
      // Debug log in development
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Replacing {${key}} with "${stringValue}" in "${text}" -> "${result}"`);
      }
    });
    
    return result;
  } catch (error) {
    console.error("Error formatting translation:", error);
    return text; // Return the original text if there's an error
  }
};
