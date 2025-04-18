
import React, { useEffect, useRef, useState } from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import SidebarNavItem from "./SidebarNavItem";
import type { NavItem } from "./SidebarNavItem";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useMessages } from "@/services/messageService";
import { Bell } from "lucide-react";
import NotificationBadge from "@/modules/notification/components/NotificationBadge";
import TranslatedText from "@/components/translation/TranslatedText";
import { getLanguagePrefixedPath } from "@/utils/authNavigationUtils";

interface SidebarQuickAccessProps {
  items: NavItem[];
  isCollapsed: boolean;
}

const SidebarQuickAccess = ({ items, isCollapsed }: SidebarQuickAccessProps) => {
  const { language } = useLanguage();
  const { unreadCount } = useMessages();
  const { t, refreshCounter } = useSafeTranslation();
  const [quickAccessItems, setQuickAccessItems] = useState<NavItem[]>([]);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const menuRef = useRef<HTMLUListElement>(null);
  const stableKey = useRef(`quick-access-${Math.random().toString(36).substring(2, 9)}`);
  const isInitializedRef = useRef(false);
  const forceUpdateKey = useRef(0);
  const prevLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const isMountedRef = useRef(true);

  // 初始化快速访问菜单项
  useEffect(() => {
    // 复制原始项目并添加通知项
    const initialItems = [...items];
    
    // 检查是否已经有通知项
    const hasNotificationItem = initialItems.some(item => 
      item.url?.includes('/notifications')
    );
    
    // 添加或更新带有语言前缀的通知路径
    const notificationUrl = getLanguagePrefixedPath('/dashboard/notifications', language);
    
    // 如果没有通知项，添加一个
    if (!hasNotificationItem) {
      initialItems.push({
        name: 'sidebar.quickAccess.notifications', // 使用正确的翻译键
        translationKey: 'sidebar.quickAccess.notifications', // 备份键
        url: notificationUrl,
        icon: Bell,
        badge: unreadCount > 0 ? unreadCount : undefined,
        key: `notifications-${language}-${refreshCounter}-${forceUpdateKey.current}`
      });
    } else {
      // 如果已有通知项，更新其badge和URL
      const updatedItems = initialItems.map(item => 
        item.url?.includes('/notifications') 
          ? { 
              ...item, 
              url: notificationUrl, // 更新为带语言前缀的URL
              badge: unreadCount > 0 ? unreadCount : undefined,
              key: `${item.name}-${language}-${refreshCounter}-${forceUpdateKey.current}`
            } 
          : item
      );
      setQuickAccessItems(updatedItems);
      return;
    }
    
    setQuickAccessItems(initialItems);
  }, [items, language, unreadCount, refreshCounter]); // 添加unreadCount作为依赖

  // 监听语言变化并更新组件
  useEffect(() => {
    if (language !== prevLanguageRef.current) {
      prevLanguageRef.current = language as LanguageCode;
      forceUpdateKey.current += 1;
      
      // 强制更新所有项目的键和URL
      setQuickAccessItems(prev => prev.map(item => {
        // 更新通知项的URL，确保包含正确的语言前缀
        if (item.url?.includes('/notifications')) {
          const updatedUrl = getLanguagePrefixedPath('/dashboard/notifications', language);
          return {
            ...item,
            url: updatedUrl,
            key: `${item.name}-${language}-${refreshCounter}-${forceUpdateKey.current}`
          };
        }
        return {
          ...item,
          key: `${item.name}-${language}-${refreshCounter}-${forceUpdateKey.current}`
        };
      }));
      
      if (menuRef.current) {
        menuRef.current.setAttribute('data-language', language);
        menuRef.current.setAttribute('data-force-update', forceUpdateKey.current.toString());
      }
    }
  }, [language, refreshCounter]);

  // 清理组件
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <div 
      className="mb-4 px-1.5" 
      key={`${stableKey.current}-${refreshCounter}-${language}-${forceUpdateKey.current}`}
      data-language={language}
      data-quick-access="true"
    >
      {!isCollapsed && (
        <div className="px-3 mb-2">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-indigo-300/70">
            <TranslatedText 
              keyName="sidebar.quickAccess.title" 
              fallback="快速访问" 
            />
          </h3>
        </div>
      )}
      <SidebarMenu 
        className="flex flex-col space-y-1"
        ref={menuRef}
        data-language={languageRef.current}
        data-refresh={refreshCounter}
      >
        {quickAccessItems.map((item) => (
          <SidebarNavItem
            key={item.key || `${item.name}-${refreshCounter}-${language}-${forceUpdateKey.current}`}
            item={item}
            isCollapsed={isCollapsed}
          />
        ))}
      </SidebarMenu>
    </div>
  );
};

export default React.memo(SidebarQuickAccess);
