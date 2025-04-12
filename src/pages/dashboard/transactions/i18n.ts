
import { LanguageCode } from "@/utils/languageUtils";
import en from "./i18n/en";
import es from "./i18n/es";
import fr from "./i18n/fr";
import zhCN from "./i18n/zh-CN";
import zhTW from "./i18n/zh-TW";

/**
 * 获取特定语言的翻译
 */
export const getTransactionTranslation = (key: string, language: LanguageCode = "en"): string => {
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
  return translations[key] || key;
};
