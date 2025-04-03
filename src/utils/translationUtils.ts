
import translations from '@/translations';
import { LanguageCode } from './languageUtils';

/**
 * Retrieve translation value from nested object using dot notation
 * @param obj Object to search
 * @param path Path in dot notation (e.g. "wallet.deposit.form")
 * @returns Translation value or path (if not found)
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
 * Get translation for specific key and language
 * @param key Translation key in dot notation
 * @param language Language code
 * @returns Translated string or key (if not found)
 */
export const getTranslation = (key: string, language: LanguageCode = 'en'): string => {
  try {
    if (!key) {
      console.warn('Empty translation key provided');
      return '';
    }
    
    // Get translation object for specified language
    const langTranslations = translations[language];
    
    if (!langTranslations) {
      console.warn(`No translations found for language "${language}"`);
      
      // Fallback to English if requested language not available
      if (language !== 'en') {
        return getTranslation(key, 'en');
      }
      
      return key;
    }
    
    // Get nested value using key path
    const translation = getNestedValue(langTranslations, key);
    
    // If translation is same as key (not found), try falling back to English
    if (translation === key && language !== 'en') {
      // Log more detailed info in development environment
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Translation for "${key}" not found in "${language}", falling back to English`);
      }
      return getTranslation(key, 'en');
    }
    
    return translation;
  } catch (error) {
    console.error(`Error getting translation for "${key}" in "${language}":`, error);
    return key;
  }
};

/**
 * Get all available translations for a specific key
 * @param key Translation key
 * @returns Object containing translation for each available language
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
 * Format translation string with variables
 * @param text Translation string with placeholders (e.g. {variable})
 * @param values Object containing variable values to insert
 * @returns Formatted string with variables replaced
 */
export const formatTranslation = (text: string, values?: Record<string, string | number>): string => {
  if (!values || !text) return text;
  
  let result = text;
  
  try {
    // Log debug info in development environment
    if (process.env.NODE_ENV !== 'production') {
      console.log(`formatTranslation input: "${text}" with values:`, values);
    }
    
    // Process each value in values object
    Object.entries(values).forEach(([key, value]) => {
      // Create regex pattern to match {key} format placeholder
      const pattern = new RegExp(`\\{${key}\\}`, 'g');
      
      // Ensure value is correctly converted to string
      const stringValue = String(value);
      
      // Replace all matches
      result = result.replace(pattern, stringValue);
      
      // Log replacement process in development environment
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Replacing {${key}} with "${stringValue}" in "${text}" -> "${result}"`);
      }
    });
    
    // Double check for any unreplaced placeholders
    const unreplacedKeys = result.match(/\{([^}]+)\}/g);
    if (unreplacedKeys && unreplacedKeys.length > 0) {
      console.warn(`Translation has unreplaced placeholders: ${unreplacedKeys.join(', ')}`);
    }
    
    return result;
  } catch (error) {
    console.error("Error formatting translation:", error);
    return text; // Return original text in case of error
  }
};
