
import en from './en';
import fr from './fr';
import es from './es';
import zhCN from './zh-CN';
import zhTW from './zh-TW';
import { LanguageCode } from '@/utils/languageUtils';

// Group all translations by language
const translations = {
  en,
  fr,
  es,
  'zh-CN': zhCN,
  'zh-TW': zhTW
};

// Cache for translation lookups
const translationCache: Record<string, Record<string, string>> = {};

/**
 * Enhanced direct access to translations to bypass context and ensure updates
 * This function is used to guarantee text updates when language changes
 * 
 * @param key The translation key
 * @param language The language code
 * @returns The translated string or the key if not found
 */
export const getTransactionTranslation = (key: string, language: LanguageCode): string => {
  // Create cache key
  const cacheKey = `${language}:${key}`;
  
  // Check cache first
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey][key];
  }
  
  try {
    // Get translations for the requested language or fallback to English
    const languageTranslations = translations[language] || translations.en;
    
    if (!languageTranslations) {
      return key;
    }
    
    // Cache the entire language translations for this key
    translationCache[cacheKey] = languageTranslations;
    
    const translation = languageTranslations[key];
    
    if (translation === undefined) {
      // Try English as fallback
      if (language !== 'en') {
        const englishTranslation = translations.en[key];
        if (englishTranslation !== undefined) {
          return englishTranslation;
        }
      }
      
      // If the key is still not found, check if there are similar keys we can use
      // This helps with backward compatibility when key names change
      const possibleAlternateKeys: Record<string, string> = {
        'viewDetails': 'viewAll',
        'view': 'viewAll'
      };
      
      const alternateKey = possibleAlternateKeys[key];
      if (alternateKey && languageTranslations[alternateKey]) {
        return languageTranslations[alternateKey];
      }
      
      return key;
    }
    
    return translation;
  } catch (error) {
    console.error(`Error getting transaction translation for key "${key}" in language "${language}":`, error);
    return key;
  }
};

/**
 * Format translation string with variables
 * @param text The translation string with placeholders
 * @param values Values to insert into the placeholders
 * @returns The formatted translation
 */
export const formatTransactionTranslation = (text: string, values?: Record<string, string | number>): string => {
  if (!values || !text) return text;
  
  let result = text;
  
  try {
    Object.entries(values).forEach(([key, value]) => {
      const pattern = new RegExp(`\\{${key}\\}`, 'g');
      result = result.replace(pattern, String(value));
    });
    
    return result;
  } catch (error) {
    console.error("Error formatting transaction translation:", error);
    return text;
  }
};

// Clear cache when needed
export const clearTranslationCache = () => {
  Object.keys(translationCache).forEach(key => {
    delete translationCache[key];
  });
};

export default translations;
