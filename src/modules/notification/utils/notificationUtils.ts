
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
    
    // 翻译键基础
    const minutesKey = "time.minutesAgo";
    const hoursKey = "time.hoursAgo";
    const daysKey = "time.daysAgo";
    
    // 根据时间差返回相应的翻译
    if (diffInMinutes < 60) {
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
 * 获取通知类型的翻译
 * @param type 通知类型
 * @param language 当前语言
 * @returns 翻译后的类型名称
 */
export const getNotificationTypeTranslation = (
  type: "payment" | "security" | "system" | "notification" | string,
  language: LanguageCode
): string => {
  const key = `notification.types.${type}`;
  return getDirectTranslation(key, language, type);
};
