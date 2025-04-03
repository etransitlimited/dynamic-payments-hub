
import translations from '@/translations';
import { LanguageCode } from './languageUtils';

/**
 * 使用点表示法从嵌套对象中检索翻译值
 * @param obj 要搜索的对象
 * @param path 点表示法中的路径（例如 "wallet.deposit.form"）
 * @returns 翻译值或路径（如果未找到）
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
 * 获取特定键和语言的翻译
 * @param key 点表示法中的翻译键
 * @param language 语言代码
 * @returns 翻译后的字符串或键（如果未找到）
 */
export const getTranslation = (key: string, language: LanguageCode = 'en'): string => {
  try {
    if (!key) {
      console.warn('Empty translation key provided');
      return '';
    }
    
    // 首先，获取指定语言的翻译对象
    const langTranslations = translations[language];
    
    if (!langTranslations) {
      console.warn(`No translations found for language "${language}"`);
      
      // 如果请求的语言不可用，回退到英语
      if (language !== 'en') {
        return getTranslation(key, 'en');
      }
      
      return key;
    }
    
    // 使用键路径获取嵌套值
    const translation = getNestedValue(langTranslations, key);
    
    // 如果翻译与键相同（未找到），尝试回退到英语
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
 * 获取特定键的所有可用翻译
 * @param key 翻译键
 * @returns 包含每种可用语言翻译的对象
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
 * 格式化带有变量的翻译字符串
 * @param text 带有占位符（如{variable}）的翻译字符串
 * @param values 包含要插入的变量值的对象
 * @returns 替换了变量的格式化字符串
 */
export const formatTranslation = (text: string, values?: Record<string, string | number>): string => {
  if (!values || !text) return text;
  
  let result = text;
  
  try {
    // 处理values对象中的每个值
    Object.entries(values).forEach(([key, value]) => {
      // 为{key}格式创建正则表达式模式
      const pattern = new RegExp(`\\{${key}\\}`, 'g');
      
      // 确保值正确转换为字符串
      const stringValue = String(value);
      
      // 替换所有出现的情况
      result = result.replace(pattern, stringValue);
      
      // 在开发环境中记录调试信息
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Replacing {${key}} with "${stringValue}" in "${text}" -> "${result}"`);
      }
    });
    
    return result;
  } catch (error) {
    console.error("Error formatting translation:", error);
    return text; // 如果出错，返回原始文本
  }
};
