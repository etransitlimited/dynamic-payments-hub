
import React, { useEffect, useRef } from "react";
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
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const menuRef = useRef<HTMLUListElement>(null);
  const stableKey = useRef(`quick-access-${Math.random().toString(36).substring(2, 9)}`);
  const isInitializedRef = useRef(false);

  // Initialize once on mount
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      if (menuRef.current) {
        menuRef.current.setAttribute('data-language', language);
        menuRef.current.setAttribute('data-initialized', 'true');
      }
    }
  }, []);

  // Update language ref when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      
      // Update data-language attribute on the component
      if (menuRef.current) {
        menuRef.current.setAttribute('data-language', language);
        menuRef.current.setAttribute('data-refresh', refreshCounter.toString());
      }
    }
  }, [language, refreshCounter]);

  // Listen for language change events with proper cleanup
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        
        // Update data-language attribute on the component
        if (menuRef.current) {
          menuRef.current.setAttribute('data-language', newLanguage);
          menuRef.current.setAttribute('data-event-update', Date.now().toString());
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  // Prepare items with correct keys to force re-render on language change
  const itemsWithKeys = items.map(item => ({
    ...item,
    key: `${item.name}-${language}-${refreshCounter}`
  }));

  return (
    <div className="mb-4 px-1.5" key={`${stableKey.current}-${refreshCounter}-${language}`}>
      <SidebarMenu 
        className="flex flex-col space-y-2"
        ref={menuRef}
        data-language={languageRef.current}
      >
        {itemsWithKeys.map((item) => (
          <SidebarNavItem
            key={`${item.name}-${refreshCounter}-${language}`}
            item={item}
            isCollapsed={isCollapsed}
          />
        ))}
      </SidebarMenu>
    </div>
  );
};

export default React.memo(SidebarQuickAccess);
