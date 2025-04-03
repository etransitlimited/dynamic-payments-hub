
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
  try {
    if (!key) {
      console.warn('Empty key provided to getFundDetailsTranslation');
      return '';
    }
    
    const keys = key.split('.');
    const translations = fundDetailsTranslations[language];
    
    if (!translations) {
      console.warn(`No translations found for language "${language}", using English as fallback`);
      return getFundDetailsTranslation(key, 'en');
    }
    
    // Start with the translations object
    let result: any = translations;
    
    // Navigate through nested properties
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        console.warn(`Translation key "${key}" not found in "${language}", falling back to English`);
        // Only fall back to English if we're not already using English
        return language === 'en' ? key : getFundDetailsTranslation(key, 'en');
      }
    }
    
    return typeof result === 'string' ? result : key;
  } catch (error) {
    console.error(`Error getting translation for "${key}" in "${language}":`, error);
    return key;
  }
};

export default fundDetailsTranslations;
