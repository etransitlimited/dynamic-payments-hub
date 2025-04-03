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
    
    // Log all translations for debugging in non-production
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Getting translation for key "${key}" in language "${language}"`);
    }
    
    // Special cases for frequently accessed translations
    if (key === "cards.activationTasks.searchTasks") {
      if (language === "zh-CN") return "搜索任务";
      if (language === "zh-TW") return "搜索任務";
      if (language === "fr") return "Rechercher des tâches";
      if (language === "es") return "Buscar tareas";
    }
    
    if (key === "cards.activationTasks.filterByStatus") {
      if (language === "zh-CN") return "按状态筛选";
      if (language === "zh-TW") return "按狀態篩選";
      if (language === "fr") return "Filtrer par statut";
      if (language === "es") return "Filtrar por estado";
    }
    
    if (key === "cards.apply.next") {
      if (language === "zh-CN") return "下一步";
      if (language === "zh-TW") return "下一步";
      if (language === "fr") return "Suivant";
      if (language === "es") return "Siguiente";
    }
    
    if (key === "cards.apply.applicationNote") {
      if (language === "zh-CN") return "填写所有必填字段并上传清晰的身份证明文件照片，以加快验证过程。";
      if (language === "zh-TW") return "填寫所有必填字段並上傳身份證明文件的清晰照片，以加快驗證過程。";
    }

    if (key === "transactions.positiveChange") {
      if (language === "zh-CN") return "+{value}%";
      if (language === "zh-TW") return "+{value}%";
      if (language === "fr") return "+{value}%";
      if (language === "es") return "+{value}%";
      return "+{value}%";
    }
    
    if (key === "transactions.negativeChange") {
      if (language === "zh-CN") return "-{value}%";
      if (language === "zh-TW") return "-{value}%";
      if (language === "fr") return "-{value}%";
      if (language === "es") return "-{value}%";
      return "-{value}%";
    }
    
    if (key === "transactions.comparedToLastMonth") {
      if (language === "zh-CN") return "与上月相比";
      if (language === "zh-TW") return "與上月相比";
      if (language === "fr") return "par rapport au mois dernier";
      if (language === "es") return "comparado con el mes pasado";
    }
    
    if (key === "transactions.totalTransactions") {
      if (language === "zh-CN") return "总交易量";
      if (language === "zh-TW") return "總交易量";
      if (language === "fr") return "Total des Transactions";
      if (language === "es") return "Transacciones Totales";
    }
    
    if (key === "transactions.monthlyTransactions") {
      if (language === "zh-CN") return "月度交易量";
      if (language === "zh-TW") return "月度交易量";
      if (language === "fr") return "Transactions Mensuelles";
      if (language === "es") return "Transacciones Mensuales";
    }
    
    if (key === "transactions.systemLoad") {
      if (language === "zh-CN") return "系统负载";
      if (language === "zh-TW") return "系統負載";
      if (language === "fr") return "Charge du Système";
      if (language === "es") return "Carga del Sistema";
    }

    if (key === "transactions.transactionAnalytics") {
      if (language === "zh-CN") return "交易数据分析和趋势";
      if (language === "zh-TW") return "交易數據分析和趨勢";
      if (language === "fr") return "Analyse des données et tendances des transactions";
      if (language === "es") return "Análisis de datos y tendencias de transacciones";
    }

    if (key === "transactions.amount") {
      if (language === "zh-CN") return "金额";
      if (language === "zh-TW") return "金額";
      if (language === "fr") return "Montant";
      if (language === "es") return "Monto";
    }

    // Common card types
    if (key === "cards.types.credit") {
      if (language === "zh-CN") return "信用卡";
      if (language === "zh-TW") return "信用卡";
      if (language === "fr") return "Cartes de Crédit";
      if (language === "es") return "Tarjetas de Crédito";
    }
    
    if (key === "cards.types.debit") {
      if (language === "zh-CN") return "借记卡";
      if (language === "zh-TW") return "借記卡";
      if (language === "fr") return "Cartes de Débit";
      if (language === "es") return "Tarjetas de Débito";
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
  Object.entries(values).forEach(([key, value]) => {
    // Support two placeholder formats: {value} and {{value}}
    const regex1 = new RegExp(`{${key}}`, 'g');
    const regex2 = new RegExp(`{{${key}}}`, 'g');
    
    // Ensure value is properly converted to string
    const stringValue = String(value);
    
    // Replace all occurrences
    result = result
      .replace(regex1, stringValue)
      .replace(regex2, stringValue);
  });
  
  return result;
};
