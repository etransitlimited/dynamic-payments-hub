
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
  }
};

// Get transaction translation
export const getTransactionTranslation = (key: string, language: LanguageCode): string => {
  if (!key) return "";
  
  const keyParts = key.split(".");
  const mainKey = keyParts[keyParts.length - 1];
  
  if (transactionTranslations[mainKey as keyof typeof transactionTranslations]) {
    const translations = transactionTranslations[mainKey as keyof typeof transactionTranslations];
    return translations[language] || translations.en || key;
  }
  
  return key;
};

export default transactionTranslations;
