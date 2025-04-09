
import React, { useEffect, useRef, useState } from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import SidebarNavItem from "./SidebarNavItem";
import type { NavItem } from "./SidebarNavItem";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface SidebarQuickAccessProps {
  items: NavItem[];
  isCollapsed: boolean;
}

const SidebarQuickAccess = ({ items, isCollapsed }: SidebarQuickAccessProps) => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const [quickAccessItems, setQuickAccessItems] = useState<NavItem[]>(items);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const menuRef = useRef<HTMLUListElement>(null);
  const stableKey = useRef(`quick-access-${Math.random().toString(36).substring(2, 9)}`);
  const isInitializedRef = useRef(false);
  const forceUpdateKey = useRef(0);
  const prevLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const isMountedRef = useRef(true);

  // Component lifecycle management
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Initialize once on mount
  useEffect(() => {
    if (!isInitializedRef.current && isMountedRef.current) {
      isInitializedRef.current = true;
      if (menuRef.current) {
        menuRef.current.setAttribute('data-language', language);
        menuRef.current.setAttribute('data-initialized', 'true');
        menuRef.current.setAttribute('data-refresh', refreshCounter.toString());
      }
    }
  }, []);

  // Force update when language changes
  useEffect(() => {
    if (!isMountedRef.current) return;
    
    if (language !== prevLanguageRef.current) {
      prevLanguageRef.current = language as LanguageCode;
      forceUpdateKey.current += 1;
      
      // Update items with new language-specific keys
      setQuickAccessItems(items.map(item => ({
        ...item,
        key: `${item.name}-${language}-${refreshCounter}-${forceUpdateKey.current}`
      })));
      
      // Update data attributes for immediate visual feedback
      if (menuRef.current) {
        menuRef.current.setAttribute('data-language', language);
        menuRef.current.setAttribute('data-force-update', forceUpdateKey.current.toString());
        menuRef.current.setAttribute('data-refresh', refreshCounter.toString());
      }
    }
  }, [language, items, refreshCounter]);

  // Update items when they change from parent
  useEffect(() => {
    if (!isMountedRef.current) return;
    
    setQuickAccessItems(items.map(item => ({
      ...item,
      key: `${item.name}-${language}-${refreshCounter}-${forceUpdateKey.current}`
    })));
  }, [items, language, refreshCounter]);

  // Listen for language change events with proper cleanup
  useEffect(() => {
    if (!isMountedRef.current) return;
    
    const handleLanguageChange = (e: Event) => {
      if (!isMountedRef.current) return;
      
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        forceUpdateKey.current += 1;
        
        // Update items with new keys to force re-render
        setQuickAccessItems(items.map(item => ({
          ...item,
          key: `${item.name}-${newLanguage}-${Date.now()}-${forceUpdateKey.current}`
        })));
        
        // Update data-language attribute on the component
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
      <SidebarMenu 
        className="flex flex-col space-y-2"
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
