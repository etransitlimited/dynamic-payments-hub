
import { LanguageCode } from "@/utils/languageUtils";

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

// Get transaction translation
export const getTransactionTranslation = (key: string, language: LanguageCode): string => {
  if (!key) return "";
  
  // Create cache key
  const cacheKey = `${language}:${key}`;
  
  // Check cache first
  if (translationCache[cacheKey] && 
      (Date.now() - translationCache[cacheKey].timestamp < CACHE_TTL)) {
    return translationCache[cacheKey].value;
  }
  
  const keyParts = key.split(".");
  const mainKey = keyParts[keyParts.length - 1];
  
  if (transactionTranslations[mainKey as keyof typeof transactionTranslations]) {
    const translations = transactionTranslations[mainKey as keyof typeof transactionTranslations];
    const result = translations[language] || translations.en || key;
    
    // Cache the result
    translationCache[cacheKey] = {
      value: result,
      timestamp: Date.now()
    };
    
    return result;
  }
  
  return key;
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

export default transactionTranslations;

