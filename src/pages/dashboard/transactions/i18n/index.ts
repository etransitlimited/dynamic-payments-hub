
import en from '@/translations/en/transactions';
import fr from '@/translations/fr/transactions';
import es from '@/translations/es/transactions';
import zhCN from '@/translations/zh-CN/transactions';
import zhTW from '@/translations/zh-TW/transactions';
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
const CACHE_TTL = 60000; // Cache lifetime: 60 seconds (increased from 30 seconds)

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
    // For better debugging
    console.log(`Getting transaction translation for key "${key}" in language "${language}"`);
    
    // Create cache key
    const cacheKey = `${language}:${key}`;
    
    // Check cache first (if not expired)
    if (translationCache[cacheKey] && 
        (Date.now() - translationCache[cacheKey].timestamp < CACHE_TTL)) {
      return translationCache[cacheKey].value;
    }
    
    // Get translations for the requested language or fallback to English
    const langObj = translations[language] || translations.en;
    
    if (!langObj) {
      console.warn(`No translations found for language "${language}"`);
      return key;
    }
    
    // Handle nested keys like "transactions.title"
    const keyParts = key.split('.');
    
    // Special case for when someone forgets to add "transactions." prefix
    if (keyParts.length === 1 && Object.keys(langObj.transactions).includes(key)) {
      const result = langObj.transactions[key];
      if (typeof result === 'string') {
        translationCache[cacheKey] = {
          value: result,
          timestamp: Date.now()
        };
        return result;
      }
    }
    
    let result: any = langObj;
    
    // Navigate through the nested properties
    for (const part of keyParts) {
      if (!result || typeof result !== 'object') {
        break;
      }
      result = result[part];
    }
    
    // If we found a string, return it
    if (typeof result === 'string') {
      // Cache the result
      translationCache[cacheKey] = {
        value: result,
        timestamp: Date.now()
      };
      return result;
    }
    
    // Try adding "transactions." prefix if not already there
    if (!key.startsWith('transactions.')) {
      const prefixedKey = `transactions.${key}`;
      const prefixedResult = getTransactionTranslation(prefixedKey, language);
      
      if (prefixedResult !== prefixedKey) {
        translationCache[cacheKey] = {
          value: prefixedResult,
          timestamp: Date.now()
        };
        return prefixedResult;
      }
    }
    
    // Try English as fallback
    if (language !== 'en') {
      console.log(`Translation not found for "${key}" in ${language}, trying English fallback`);
      const englishTranslation = getTransactionTranslation(key, 'en');
      if (englishTranslation !== key) {
        // Cache the fallback result
        translationCache[cacheKey] = {
          value: englishTranslation,
          timestamp: Date.now()
        };
        return englishTranslation;
      }
    }
    
    console.warn(`Translation not found for key "${key}" in any language`);
    return key;
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
  console.log("Transaction translation cache cleared");
};

// Listen for language changes and clear the cache
if (typeof window !== 'undefined') {
  window.addEventListener('app:languageChange', () => {
    clearTranslationCache();
  });
  document.addEventListener('languageChanged', () => {
    clearTranslationCache();
  });
}

export default translations;
