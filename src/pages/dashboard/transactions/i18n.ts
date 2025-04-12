
import { LanguageCode } from "@/utils/languageUtils";
import en from "./i18n/en";
import es from "./i18n/es";
import fr from "./i18n/fr";
import zhCN from "./i18n/zh-CN";
import zhTW from "./i18n/zh-TW";

// Translation cache for better performance
const translationCache: Record<string, string> = {};

/**
 * 获取特定语言的翻译
 */
export const getTransactionTranslation = (key: string, language: LanguageCode = "en"): string => {
  // 首先检查缓存
  const cacheKey = `${language}:${key}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }
  
  // 选择正确的语言包
  let translations: Record<string, string>;
  
  switch (language) {
    case "es":
      translations = es;
      break;
    case "fr":
      translations = fr;
      break;
    case "zh-CN":
      translations = zhCN;
      break;
    case "zh-TW":
      translations = zhTW;
      break;
    case "en":
    default:
      translations = en;
      break;
  }

  // 返回翻译或键名作为后备
  const result = translations[key] || key;
  
  // 存入缓存
  translationCache[cacheKey] = result;
  
  return result;
};

/**
 * 清除翻译缓存，在语言变更时调用
 */
export const clearTranslationCache = (): void => {
  Object.keys(translationCache).forEach(key => {
    delete translationCache[key];
  });
};

/**
 * 格式化带有变量的翻译
 */
export const formatTransactionTranslation = (text: string, values: Record<string, string | number>): string => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
  }, text);
};
