
import React from "react";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";
import { Badge } from "@/components/ui/badge";

interface NotificationTypeProps {
  type: "system" | "payment" | "security" | "notification";
  className?: string;
}

const typeColors = {
  system: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  payment: "bg-green-500/20 text-green-400 border-green-500/30",
  security: "bg-red-500/20 text-red-400 border-red-500/30",
  notification: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const NotificationType: React.FC<NotificationTypeProps> = ({ type, className = "" }) => {
  const { language } = useLanguage();
  
  // Get the translated type text based on language
  const getTypeText = () => {
    const key = `notification.types.${type}`;
    const fallbacks: Record<string, string> = {
      system: "System Notice",
      payment: "Payment Notification",
      security: "Security Alert",
      notification: "General Notification",
    };
    
    return getDirectTranslation(key, language as LanguageCode, fallbacks[type]);
  };
  
  return (
    <Badge 
      variant="outline" 
      className={`${typeColors[type]} font-normal px-2 py-0.5 ${className}`}
      data-type={type}
      data-language={language}
    >
      {getTypeText()}
    </Badge>
  );
};

export default NotificationType;
