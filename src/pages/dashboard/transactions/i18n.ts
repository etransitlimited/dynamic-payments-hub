
import { LanguageCode } from "@/utils/languageUtils";
import translations from "./i18n/index";

// Define transaction translations
const transactionTranslations = {
  title: {
    "en": "Transactions",
    "fr": "Transactions",
    "es": "Transacciones",
    "zh-CN": "交易记录",
    "zh-TW": "交易記錄"
  },
  history: {
    "en": "History",
    "fr": "Historique",
    "es": "Historial",
    "zh-CN": "交易历史",
    "zh-TW": "交易歷史"
  },
  wallet: {
    "en": "Funds",
    "fr": "Fonds",
    "es": "Fondos",
    "zh-CN": "资金",
    "zh-TW": "資金"
  },
  pageTitle: {
    "en": "Transaction Management",
    "fr": "Gestion des Transactions",
    "es": "Gestión de Transacciones",
    "zh-CN": "交易管理",
    "zh-TW": "交易管理"
  },
  transactionsByType: {
    "en": "Transactions by Type",
    "fr": "Transactions par Type",
    "es": "Transacciones por Tipo",
    "zh-CN": "按类型划分的交易",
    "zh-TW": "按類型劃分的交易"
  },
  expenseDistribution: {
    "en": "Expense Distribution",
    "fr": "Distribution des Dépenses",
    "es": "Distribución de Gastos",
    "zh-CN": "支出分布",
    "zh-TW": "支出分佈"
  }
};

// Translation cache for better performance
const translationCache: Record<string, { value: string, timestamp: number }> = {};
const CACHE_TTL = 30000; // 30 seconds cache lifetime

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
    
    // Handle nested keys like "transactions.title"
    const keyParts = key.split('.');
    
    // Try direct match in transactionTranslations first
    if (keyParts.length === 1 || keyParts[0] !== 'transactions') {
      const mainKey = keyParts[keyParts.length - 1];
      
      if (transactionTranslations[mainKey as keyof typeof transactionTranslations]) {
        const translationsForKey = transactionTranslations[mainKey as keyof typeof transactionTranslations];
        const result = translationsForKey[language] || translationsForKey.en || key;
        
        // Cache the result
        translationCache[cacheKey] = {
          value: result,
          timestamp: Date.now()
        };
        
        return result;
      }
    }
    
    // If not found in direct translations, try the imported translations
    const langObj = translations[language] || translations.en;
    
    if (!langObj) {
      console.warn(`No translations found for language "${language}"`);
      return key;
    }
    
    // Navigate through the nested properties
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
    
    // Try English as fallback
    if (language !== 'en') {
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

/**
 * Clear translation cache to force fresh translations
 */
export const clearTranslationCache = (): void => {
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
