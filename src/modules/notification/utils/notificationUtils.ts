import { LanguageCode } from "@/utils/languageUtils";
import { getDirectTranslation, formatDirectTranslation } from "@/utils/translationHelpers";

/**
 * 获取通知的相对时间
 * @param timestamp ISO格式时间戳
 * @param language 当前语言
 * @returns 可读的相对时间字符串
 */
export const getRelativeNotificationTime = (timestamp: string, language: LanguageCode): string => {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);
    
    // 直接使用模块内的翻译键
    const minutesKey = "notification.time.minutesAgo";
    const hoursKey = "notification.time.hoursAgo";
    const daysKey = "notification.time.daysAgo";
    
    // 根据时间差返回相应的翻译
    if (diffInMinutes < 60) {
      // 使用同步方式获取翻译
      const translation = getDirectTranslation(minutesKey, language, "{count} minutes ago");
      return formatDirectTranslation(translation, { count: diffInMinutes });
    } else if (diffInHours < 24) {
      const translation = getDirectTranslation(hoursKey, language, "{count} hours ago");
      return formatDirectTranslation(translation, { count: diffInHours });
    } else {
      const translation = getDirectTranslation(daysKey, language, "{count} days ago");
      return formatDirectTranslation(translation, { count: diffInDays });
    }
  } catch (error) {
    console.error("Error calculating relative notification time:", error);
    return timestamp;
  }
};

/**
 * 从模块的i18n获取翻译
 * @param key 翻译键
 * @param language 当前语言
 * @returns 翻译文本
 */
export const getModuleTranslation = async (key: string, language: LanguageCode): Promise<string> => {
  try {
    // 尝试动态导入模块的语言文件
    const i18nFile = await import(`../i18n/${language}.json`).catch(() => {
      // 如果找不到对应语言，回退到英文
      return import('../i18n/en.json');
    });
    
    // 处理嵌套键
    const keys = key.split('.');
    let result: any = i18nFile.default;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key;
      }
    }
    
    return typeof result === 'string' ? result : key;
  } catch (error) {
    console.error(`Error loading module translation for key ${key}:`, error);
    return key;
  }
};

/**
 * 获取通知类型的翻译
 * @param type 通知类型
 * @param language 当前语言
 * @returns 翻译后的类型名称
 */
export const getNotificationTypeTranslation = (
  type: "payment" | "security" | "system" | "notification" | string,
  language: LanguageCode
): string => {
  // 确保类型是有效的
  const validType = ['payment', 'security', 'system', 'notification'].includes(type) 
    ? type 
    : 'notification';
    
  // 使用模块特定的翻译路径
  const key = `notification.types.${validType}`;
  
  // 同步方式获取翻译
  return getDirectTranslation(key, language, type);
};
