
import { LanguageCode } from "@/utils/languageUtils";
import { getDirectTranslation } from "@/utils/translationHelpers";

// 缓存翻译结果以提高性能
const translationCache: Record<string, { value: string, timestamp: number }> = {};
const CACHE_TTL = 60000; // 缓存60秒

/**
 * 获取钱包资金明细相关翻译
 * @param key 翻译键
 * @param language 语言代码
 * @param fallback 回退文本
 * @returns 翻译后的文本
 */
export const getFundDetailsTranslation = (key: string, language: LanguageCode, fallback?: string): string => {
  try {
    // 构建缓存键
    const cacheKey = `${language}:fund:${key}`;
    
    // 检查缓存是否有效
    if (translationCache[cacheKey] && 
        (Date.now() - translationCache[cacheKey].timestamp < CACHE_TTL)) {
      return translationCache[cacheKey].value;
    }
    
    // 1. 首先从 wallet.fundDetails 路径获取
    let translatedText = getDirectTranslation(
      `wallet.fundDetails.${key}`, 
      language,
      undefined
    );
    
    // 2. 如果键本身包含了完整路径，则直接尝试获取
    if (translatedText === `wallet.fundDetails.${key}` && key.includes('.')) {
      translatedText = getDirectTranslation(
        key,
        language,
        undefined
      );
    }
    
    // 3. 如果还是没有找到，尝试从 transactions 获取
    if (translatedText === key || translatedText === `wallet.fundDetails.${key}`) {
      // 移除可能的前缀，如 "transactionTypes." 
      const simpleKey = key.includes('.') ? key.split('.').pop()! : key;
      translatedText = getDirectTranslation(
        `transactions.${simpleKey}`,
        language,
        undefined
      );
    }
    
    // 如果找到了翻译，缓存结果
    if (translatedText !== key && translatedText !== `wallet.fundDetails.${key}` && 
        translatedText !== `transactions.${key.includes('.') ? key.split('.').pop() : key}`) {
      translationCache[cacheKey] = {
        value: translatedText,
        timestamp: Date.now()
      };
      return translatedText;
    }
    
    // 如果没有找到翻译且不是英语，尝试英语作为后备
    if (language !== 'en') {
      const englishTranslation = getFundDetailsTranslation(key, 'en', fallback);
      if (englishTranslation !== key) {
        translationCache[cacheKey] = {
          value: englishTranslation,
          timestamp: Date.now()
        };
        return englishTranslation;
      }
    }
    
    // 使用回退值或原键
    return fallback || key;
    
  } catch (error) {
    console.error(`Error getting fund details translation for "${key}" in "${language}":`, error);
    return fallback || key;
  }
};

// 清除翻译缓存，用于强制刷新翻译
export const clearFundDetailsTranslationCache = () => {
  Object.keys(translationCache).forEach(key => {
    delete translationCache[key];
  });
  console.log("Fund details translation cache cleared");
};

// 监听语言变化事件，清除缓存
if (typeof window !== 'undefined') {
  window.addEventListener('app:languageChange', () => {
    clearFundDetailsTranslationCache();
  });
  document.addEventListener('languageChanged', () => {
    clearFundDetailsTranslationCache();
  });
}
