
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode, formatLocalizedDateTime } from "@/utils/languageUtils";

// Helper function to get notification type translations
export const getNotificationTypeTranslation = (
  type: "system" | "payment" | "security" | "notification", 
  language: LanguageCode
): string => {
  const key = `notification.types.${type}`;
  
  return getDirectTranslation(key, language);
};

// Format the notification timestamp based on language
export const formatNotificationTime = (timestamp: string, language: LanguageCode): string => {
  return formatLocalizedDateTime(timestamp, language);
};

// Get relative time for notifications
export const getRelativeNotificationTime = (timestamp: string, language: LanguageCode): string => {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.round(diffMs / 60000);
    
    if (diffMin < 60) {
      // Less than an hour ago
      return getDirectTranslation(
        "time.minutesAgo", 
        language, 
        `${diffMin} minutes ago`
      ).replace('{count}', String(diffMin));
    } else if (diffMin < 1440) {
      // Less than a day ago
      const hours = Math.floor(diffMin / 60);
      return getDirectTranslation(
        "time.hoursAgo", 
        language, 
        `${hours} hours ago`
      ).replace('{count}', String(hours));
    } else {
      // More than a day ago
      const days = Math.floor(diffMin / 1440);
      if (days < 7) {
        return getDirectTranslation(
          "time.daysAgo", 
          language, 
          `${days} days ago`
        ).replace('{count}', String(days));
      } else {
        // Over a week ago, use formatted date
        return formatLocalizedDateTime(timestamp, language);
      }
    }
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return formatLocalizedDateTime(timestamp, language);
  }
};

// Process notification data with the correct language
export const processNotifications = (
  notifications: any[], 
  language: LanguageCode
): any[] => {
  if (!notifications || !Array.isArray(notifications)) {
    return [];
  }
  
  return notifications.map(notification => {
    return {
      ...notification,
      formattedTime: getRelativeNotificationTime(notification.timestamp, language),
      typeLabel: getNotificationTypeTranslation(notification.type, language)
    };
  });
};
