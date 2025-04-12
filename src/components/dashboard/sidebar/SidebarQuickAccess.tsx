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
import TranslatedText from "@/components/ui/TranslatedText";

interface SidebarQuickAccessProps {
  items: NavItem[];
  isCollapsed: boolean;
}

const SidebarQuickAccess = ({ items, isCollapsed }: SidebarQuickAccessProps) => {
  const { language } = useLanguage();
  const { unreadCount } = useMessages();
  const { refreshCounter } = useSafeTranslation();
  const [quickAccessItems, setQuickAccessItems] = useState<NavItem[]>(items);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const menuRef = useRef<HTMLUListElement>(null);
  const stableKey = useRef(`quick-access-${Math.random().toString(36).substring(2, 9)}`);
  const isInitializedRef = useRef(false);
  const forceUpdateKey = useRef(0);
  const prevLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const isMountedRef = useRef(true);

  // Add notification item to quick access menu
  useEffect(() => {
    const notificationItem: NavItem = {
      name: 'dashboard.quickAccess.notifications',
      url: '/dashboard/notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
      key: `notifications-${language}-${refreshCounter}-${forceUpdateKey.current}`
    };
    
    const hasNotificationItem = quickAccessItems.some(item => 
      item.url === '/dashboard/notifications'
    );
    
    if (!hasNotificationItem) {
      setQuickAccessItems(prev => [...prev, notificationItem]);
    } else {
      setQuickAccessItems(prev => 
        prev.map(item => 
          item.url === '/dashboard/notifications' 
            ? { ...item, badge: unreadCount > 0 ? unreadCount : undefined } 
            : item
        )
      );
    }
  }, [unreadCount, language, refreshCounter]);

  useEffect(() => {
    console.log(`SidebarQuickAccess updated, language: ${language}, refreshCounter: ${refreshCounter}`);
    
    return () => {
      console.log(`SidebarQuickAccess unmounting`);
    };
  }, [language, refreshCounter]);
  
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
        console.log(`SidebarQuickAccess initialized with language: ${language}`);
      }
      
      setQuickAccessItems(items.map(item => ({
        ...item,
        key: `${item.name}-${language}-${refreshCounter}-${forceUpdateKey.current}`
      })));
    }
  }, [items, language, refreshCounter]);

  useEffect(() => {
    if (!isMountedRef.current) return;
    
    if (language !== prevLanguageRef.current) {
      prevLanguageRef.current = language as LanguageCode;
      forceUpdateKey.current += 1;
      console.log(`SidebarQuickAccess language changed: ${prevLanguageRef.current} -> ${language}, forceUpdateKey: ${forceUpdateKey.current}`);
      
      const updatedItems = items.map(item => {
        let translatedName;
        
        if (item.name === 'dashboard.quickAccess.dashboard') {
          const dashboardTranslations: Record<LanguageCode, string> = {
            'en': 'Dashboard',
            'es': 'Panel Principal',
            'fr': 'Tableau de Bord',
            'zh-CN': '仪表板',
            'zh-TW': '儀表板'
          };
          translatedName = dashboardTranslations[language] || 'Dashboard';
        }
        
        return {
          ...item,
          translatedName,
          key: `${item.name}-${language}-${refreshCounter}-${forceUpdateKey.current}`
        };
      });
      
      setQuickAccessItems(updatedItems);
      
      if (menuRef.current) {
        menuRef.current.setAttribute('data-language', language);
        menuRef.current.setAttribute('data-force-update', forceUpdateKey.current.toString());
        menuRef.current.setAttribute('data-refresh', refreshCounter.toString());
      }
    }
  }, [language, items, refreshCounter]);

  useEffect(() => {
    if (!isMountedRef.current) return;
    
    const updatedItems = items.map(item => ({
      ...item,
      key: `${item.name}-${language}-${refreshCounter}-${forceUpdateKey.current}`
    }));
    
    setQuickAccessItems(updatedItems);
  }, [items, language, refreshCounter]);

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
        
        const updatedItems = items.map(item => ({
          ...item,
          key: `${item.name}-${newLanguage}-${Date.now()}-${forceUpdateKey.current}`
        }));
        
        setQuickAccessItems(updatedItems);
        
        if (menuRef.current) {
          menuRef.current.setAttribute('data-language', newLanguage);
          menuRef.current.setAttribute('data-event-update', Date.now().toString());
          menuRef.current.setAttribute('data-force-update', forceUpdateKey.current.toString());
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [items]);

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
