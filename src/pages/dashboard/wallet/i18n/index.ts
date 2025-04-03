
import en from './en';
import zhCN from './zh-CN';
import zhTW from './zh-TW';
import fr from './fr';
import es from './es';
import { LanguageCode } from '@/utils/languageUtils';

const fundDetailsTranslations = {
  "en": en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  "fr": fr,
  "es": es
};

export const getFundDetailsTranslation = (key: string, language: LanguageCode = 'en'): string => {
  // Split the key by dots to navigate the translation object
  const keys = key.split('.');
  
  // Get the translations for the specified language
  const translations = fundDetailsTranslations[language];
  if (!translations) {
    return key;
  }
  
  // Navigate the translation object to find the value
  let result: any = translations;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      // If the key doesn't exist, try English as fallback
      if (language !== 'en') {
        return getFundDetailsTranslation(key, 'en');
      }
      return key;
    }
  }
  
  return typeof result === 'string' ? result : key;
};

export default fundDetailsTranslations;
