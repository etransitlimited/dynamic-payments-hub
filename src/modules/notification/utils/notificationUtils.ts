
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

// Helper function to get notification type translations
export const getNotificationTypeTranslation = (
  type: "system" | "payment" | "security" | "notification", 
  language: LanguageCode
): string => {
  const key = `notification.types.${type}`;
  
  // Fallbacks in case translations are not available
  const fallbacks: Record<string, string> = {
    system: "System Notice",
    payment: "Payment Notification",
    security: "Security Alert",
    notification: "General Notification",
  };
  
  return getDirectTranslation(key, language, fallbacks[type]);
};

// Format the notification timestamp based on language
export const formatNotificationTime = (timestamp: string, language: LanguageCode): string => {
  try {
    const date = new Date(timestamp);
    
    // Choose locale based on language
    const locale = language === 'zh-CN' || language === 'zh-TW' 
      ? 'zh-Hans-CN' 
      : language === 'fr' 
        ? 'fr-FR'
        : language === 'es'
          ? 'es-ES'
          : 'en-US';
    
    // Format options
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (error) {
    console.error("Error formatting notification time:", error);
    return timestamp;
  }
};
