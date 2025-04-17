
import React from "react";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";
import { Badge } from "@/components/ui/badge";
import TranslatedText from "@/components/translation/TranslatedText";

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
  
  return (
    <Badge 
      variant="outline" 
      className={`notification_type_badge_${type}_3a4f ${typeColors[type]} font-normal px-2 py-0.5 ${className}`}
      data-type={type}
      data-language={language}
    >
      <TranslatedText 
        keyName={`notification.types.${type}`} 
        fallback={type.charAt(0).toUpperCase() + type.slice(1)} 
      />
    </Badge>
  );
};

export default NotificationType;
