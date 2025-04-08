
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

// Cache for translation lookups with time-based expiration
const translationCache: Record<string, { value: string, timestamp: number }> = {};
const CACHE_TTL = 30000; // Cache lifetime: 30 seconds

/**
 * Enhanced direct access to translations to bypass context and ensure updates
 * This function is used to guarantee text updates when language changes
 * 
 * @param key The translation key
 * @param language The language code
 * @returns The translated string or the key if not found
 */
export const getTransactionTranslation = (key: string, language: LanguageCode): string => {
  if (!key || !language) {
    console.warn(`Invalid translation request: key=${key}, language=${language}`);
    return key || '';
  }
  
  try {
    // Create cache key
    const cacheKey = `${language}:${key}`;
    
    // Check cache first (if not expired)
    if (translationCache[cacheKey] && 
        (Date.now() - translationCache[cacheKey].timestamp < CACHE_TTL)) {
      return translationCache[cacheKey].value;
    }
    
    // Get translations for the requested language or fallback to English
    const languageTranslations = translations[language] || translations.en;
    
    if (!languageTranslations) {
      return key;
    }
    
    const translation = languageTranslations[key];
    
    if (translation === undefined) {
      // Try English as fallback
      if (language !== 'en') {
        const englishTranslation = translations.en[key];
        if (englishTranslation !== undefined) {
          // Cache the fallback result
          translationCache[cacheKey] = {
            value: englishTranslation,
            timestamp: Date.now()
          };
          return englishTranslation;
        }
      }
      
      // If the key is still not found, check if there are similar keys we can use
      // This helps with backward compatibility when key names change
      const possibleAlternateKeys: Record<string, string> = {
        'viewDetails': 'viewAll',
        'view': 'viewAll',
        'typeDeposit': 'deposit',
        'typeWithdrawal': 'withdrawal',
        'typeTransfer': 'transfer',
        'typePayment': 'payment'
      };
      
      const alternateKey = possibleAlternateKeys[key];
      if (alternateKey && languageTranslations[alternateKey]) {
        // Cache the alternate result
        translationCache[cacheKey] = {
          value: languageTranslations[alternateKey],
          timestamp: Date.now()
        };
        return languageTranslations[alternateKey];
      }
      
      return key;
    }
    
    // Cache the successful result
    translationCache[cacheKey] = {
      value: translation,
      timestamp: Date.now()
    };
    
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

// Clear cache when needed - this can be called externally to force fresh translations
export const clearTranslationCache = () => {
  Object.keys(translationCache).forEach(key => {
    delete translationCache[key];
  });
};

export default translations;
