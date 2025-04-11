
import { LanguageCode } from "@/utils/languageUtils";
import { getDirectTranslation } from "@/utils/translationHelpers";

// Import module-specific translations
import enTranslations from './en.json';
import zhCNTranslations from './zh-CN.json';
import esTranslations from './es.json';

// Module translations organized by language code
const walletTranslations = {
  en: enTranslations,
  'zh-CN': zhCNTranslations,
  es: esTranslations
};

/**
 * Get translation specific to wallet module
 * @param key Translation key
 * @param language Target language
 * @returns Translated text or fallback
 */
export const getWalletTranslation = (key: string, language: LanguageCode): string => {
  // First try using the wallet-specific translations
  try {
    // Check if we have translations for this language in our module
    const moduleTranslations = walletTranslations[language];
    
    if (moduleTranslations) {
      // Navigate through the nested structure using the key path
      const keyParts = key.split('.');
      let result: any = moduleTranslations;
      
      for (const part of keyParts) {
        if (result && typeof result === 'object' && part in result) {
          result = result[part];
        } else {
          // Break if the path doesn't exist
          result = undefined;
          break;
        }
      }
      
      // Return the translation if found
      if (typeof result === 'string') {
        return result;
      }
    }
  } catch (err) {
    console.warn(`Error in wallet module translations for key "${key}":`, err);
  }
  
  // Fall back to the global translations system
  return getDirectTranslation(key, language);
};
