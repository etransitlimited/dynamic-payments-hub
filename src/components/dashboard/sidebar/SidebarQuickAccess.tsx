
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
import { translationToString } from "@/utils/translationString";

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
      item.url === '/dashboard/notifications'
    );
    
    // 如果没有通知项，添加一个
    if (!hasNotificationItem) {
      initialItems.push({
        name: 'dashboard.quickAccess.notifications',
        url: '/dashboard/notifications',
        icon: Bell,
        badge: unreadCount > 0 ? unreadCount : undefined,
        key: `notifications-${language}-${refreshCounter}-${forceUpdateKey.current}`
      });
    }
    
    // 为每个项目添加唯一的key
    const itemsWithKeys = initialItems.map(item => ({
      ...item,
      key: item.key || `${item.name}-${language}-${refreshCounter}-${forceUpdateKey.current}`
    }));
    
    setQuickAccessItems(itemsWithKeys);
  }, [items, language, refreshCounter, unreadCount]); // 在相关依赖变化时重新初始化

  // 更新通知计数
  useEffect(() => {
    setQuickAccessItems(prev => 
      prev.map(item => 
        item.url === '/dashboard/notifications' 
          ? { 
              ...item, 
              badge: unreadCount > 0 ? unreadCount : undefined,
              key: `notifications-${language}-${refreshCounter}-${forceUpdateKey.current}`
            } 
          : item
      )
    );
  }, [unreadCount, language, refreshCounter]);

  useEffect(() => {
    console.log(`SidebarQuickAccess updated, language: ${language}, refreshCounter: ${refreshCounter}, items count: ${quickAccessItems.length}`);
    
    return () => {
      console.log(`SidebarQuickAccess unmounting`);
    };
  }, [language, refreshCounter, quickAccessItems.length]);
  
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isInitializedRef.current && isMountedRef.current) {
      isInitializedRef.current = true;
      if (menuRef.current) {
        menuRef.current.setAttribute('data-language', language);
        menuRef.current.setAttribute('data-initialized', 'true');
        menuRef.current.setAttribute('data-refresh', refreshCounter.toString());
        menuRef.current.setAttribute('data-items-count', quickAccessItems.length.toString());
        console.log(`SidebarQuickAccess initialized with language: ${language}, items: ${quickAccessItems.length}`);
      }
    }
  }, [items, language, refreshCounter, quickAccessItems.length]);

  useEffect(() => {
    if (!isMountedRef.current) return;
    
    if (language !== prevLanguageRef.current) {
      prevLanguageRef.current = language as LanguageCode;
      forceUpdateKey.current += 1;
      console.log(`SidebarQuickAccess language changed: ${prevLanguageRef.current} -> ${language}, forceUpdateKey: ${forceUpdateKey.current}`);
      
      if (menuRef.current) {
        menuRef.current.setAttribute('data-language', language);
        menuRef.current.setAttribute('data-force-update', forceUpdateKey.current.toString());
        menuRef.current.setAttribute('data-refresh', refreshCounter.toString());
        menuRef.current.setAttribute('data-items-count', quickAccessItems.length.toString());
      }
    }
  }, [language, refreshCounter, quickAccessItems.length]);

  useEffect(() => {
    if (!isMountedRef.current) return;
    
    const handleLanguageChange = (e: Event) => {
      if (!isMountedRef.current) return;
      
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        console.log(`SidebarQuickAccess language event: ${languageRef.current} -> ${newLanguage}`);
        languageRef.current = newLanguage as LanguageCode;
        forceUpdateKey.current += 1;
        
        if (menuRef.current) {
          menuRef.current.setAttribute('data-language', newLanguage);
          menuRef.current.setAttribute('data-event-update', Date.now().toString());
          menuRef.current.setAttribute('data-force-update', forceUpdateKey.current.toString());
          menuRef.current.setAttribute('data-items-count', quickAccessItems.length.toString());
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [quickAccessItems.length]);

  return (
    <div 
      className="mb-4 px-1.5" 
      key={`${stableKey.current}-${refreshCounter}-${language}-${forceUpdateKey.current}`}
      data-language={language}
      data-quick-access="true"
      data-items-count={quickAccessItems.length}
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
        data-items-count={quickAccessItems.length}
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
