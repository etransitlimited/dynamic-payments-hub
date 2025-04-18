
import { LanguageCode } from "./languageUtils";

/**
 * 获取包含语言前缀的路径
 * @param path 原始路径
 * @param language 可选的语言代码，如果没有提供则从localStorage获取
 * @returns 带有语言前缀的路径
 */
export const getLanguagePrefixedPath = (path: string, language?: LanguageCode): string => {
  // 如果路径已经包含语言前缀，直接返回
  if (/^\/[a-z]{2}(-[A-Z]{2})?\//.test(path)) {
    return path;
  }
  
  // 获取当前语言代码
  const currentLanguage = language || localStorage.getItem('language') as LanguageCode || 'en';
  
  // 构建带有语言前缀的路径
  if (path === '/') {
    return `/${currentLanguage}`;
  }
  
  if (path.startsWith('/')) {
    return `/${currentLanguage}${path}`;
  }
  
  return `/${currentLanguage}/${path}`;
};

/**
 * 从路径中提取语言代码
 * @param path 路径字符串
 * @returns 提取的语言代码，如果没有找到则返回undefined
 */
export const extractLanguageFromPath = (path: string): LanguageCode | undefined => {
  const match = path.match(/^\/([a-z]{2}(-[A-Z]{2})?)\//) || path.match(/^\/([a-z]{2}(-[A-Z]{2})?)$/);
  if (match && match[1]) {
    return match[1] as LanguageCode;
  }
  return undefined;
};

/**
 * 从路径中移除语言前缀
 * @param path 带语言前缀的路径
 * @returns 移除语言前缀的路径
 */
export const removeLanguagePrefix = (path: string): string => {
  return path.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '') || '/';
};

/**
 * 通过应用当前语言更新路径
 * @param currentPath 当前路径
 * @param newLanguage 新语言代码
 * @returns 带有更新语言的路径
 */
export const updatePathWithLanguage = (currentPath: string, newLanguage: LanguageCode): string => {
  const pathWithoutLanguage = removeLanguagePrefix(currentPath);
  return getLanguagePrefixedPath(pathWithoutLanguage, newLanguage);
};

/**
 * 验证路径中的语言是否有效，如果无效则重定向
 * @param path 当前路径
 * @param supportedLanguages 支持的语言代码数组
 * @param defaultLanguage 默认语言代码
 * @returns 如果需要重定向，则返回目标路径；否则返回null
 */
export const validatePathLanguage = (
  path: string, 
  supportedLanguages: LanguageCode[],
  defaultLanguage: LanguageCode = 'en'
): string | null => {
  const languageFromPath = extractLanguageFromPath(path);
  
  // 如果路径没有语言，重定向到带默认语言的路径
  if (!languageFromPath) {
    return getLanguagePrefixedPath(path, defaultLanguage);
  }
  
  // 如果路径语言不受支持，重定向到带默认语言的路径
  if (!supportedLanguages.includes(languageFromPath)) {
    const pathWithoutLanguage = removeLanguagePrefix(path);
    return getLanguagePrefixedPath(pathWithoutLanguage, defaultLanguage);
  }
  
  // 路径语言有效，不需要重定向
  return null;
};
