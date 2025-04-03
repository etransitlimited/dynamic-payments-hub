
import en from './en';
import zhCN from './zh-CN';
import zhTW from './zh-TW';
import fr from './fr';
import es from './es';
import { LanguageCode } from '@/utils/languageUtils';

const depositTranslations = {
  "en": en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  "fr": fr,
  "es": es
};

/**
 * Gets the deposit translation for the given key and language
 * @param key Translation key
 * @param language Language code
 * @returns Translated string
 */
export const getDepositTranslation = (key: string, language: LanguageCode = 'en'): string => {
  try {
    if (!key) {
      console.warn('Empty key provided to getDepositTranslation');
      return '';
    }
    
    const translations = depositTranslations[language];
    
    if (!translations) {
      console.warn(`No translations found for language "${language}", using English as fallback`);
      return getDepositTranslation(key, 'en');
    }
    
    // Get the translation directly
    const translation = translations[key as keyof typeof translations];
    
    if (translation === undefined) {
      console.warn(`Translation key "${key}" not found in "${language}", falling back to English`);
      // Only fall back to English if we're not already using English
      return language === 'en' ? key : getDepositTranslation(key, 'en');
    }
    
    return translation as string;
  } catch (error) {
    console.error(`Error getting translation for "${key}" in "${language}":`, error);
    return key;
  }
};

export default depositTranslations;
