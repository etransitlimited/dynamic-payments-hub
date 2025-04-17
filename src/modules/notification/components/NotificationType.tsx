
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { LanguageCode } from "@/utils/languageUtils";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Bell, ShieldAlert, CreditCard, BellRing } from "lucide-react";
import { getNotificationTypeTranslation } from "../utils/notificationUtils";

interface NotificationTypeProps {
  type: "payment" | "security" | "system" | "notification" | string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

/**
 * 通知类型组件，根据不同的通知类型显示不同的样式
 */
const NotificationType: React.FC<NotificationTypeProps> = ({
  type,
  className,
  size = "sm",
  showIcon = true,
}) => {
  const { language } = useLanguage();
  const [typeName, setTypeName] = useState<string>("");
  
  // 获取通知类型显示名称
  useEffect(() => {
    // 初始化时设置翻译
    updateTypeTranslation();
    
    // 监听语言变化
    const handleLanguageChange = () => {
      updateTypeTranslation();
    };
    
    // 注册事件监听
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      // 清理事件监听
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [type, language]);
  
  // 更新类型翻译
  const updateTypeTranslation = () => {
    const translated = getNotificationTypeTranslation(type, language as LanguageCode);
    setTypeName(translated);
  };
  
  // 根据通知类型获取样式配置
  const getTypeConfig = () => {
    const typeLower = typeof type === 'string' ? type.toLowerCase() : 'notification';
    
    switch (typeLower) {
      case "payment":
        return {
          bg: "bg-green-900/30",
          text: "text-green-400",
          border: "border-green-800/50",
          icon: <CreditCard className="h-3.5 w-3.5" />
        };
      case "security":
        return {
          bg: "bg-red-900/30",
          text: "text-red-400", 
          border: "border-red-800/50",
          icon: <ShieldAlert className="h-3.5 w-3.5" />
        };
      case "system":
        return {
          bg: "bg-purple-900/30",
          text: "text-purple-400", 
          border: "border-purple-800/50",
          icon: <BellRing className="h-3.5 w-3.5" />
        };
      default:
        return {
          bg: "bg-blue-900/30", 
          text: "text-blue-400", 
          border: "border-blue-800/50",
          icon: <Bell className="h-3.5 w-3.5" />
        };
    }
  };
  
  const { bg, text, border, icon } = getTypeConfig();
  
  // 根据大小配置padding和字体大小
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm"
  }[size];
  
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-md border font-medium inline-flex items-center gap-1",
        bg,
        text,
        border,
        sizeClasses,
        className
      )}
      data-notification-type={type}
      data-language={language}
    >
      {showIcon && icon}
      {typeName}
    </Badge>
  );
};

export default React.memo(NotificationType);
