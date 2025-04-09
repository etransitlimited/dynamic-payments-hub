
import React, { useState, useRef, useEffect, useCallback } from "react";
import { LucideIcon } from "lucide-react";
import {
  SidebarMenu,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import SidebarNavItem, { NavItem } from "./SidebarNavItem";
import { useLanguage } from "@/context/LanguageContext";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { LanguageCode } from "@/utils/languageUtils";
import { getDirectTranslation } from "@/utils/translationHelpers";

export interface SidebarNavGroupProps {
  section: string;
  icon: LucideIcon;
  items: NavItem[];
  isCollapsed: boolean;
}

const SidebarNavGroup = ({ section, icon: Icon, items, isCollapsed }: SidebarNavGroupProps) => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const [groupTitle, setGroupTitle] = useState("");
  const [navItems, setNavItems] = useState<NavItem[]>(items);
  const menuRef = useRef<HTMLUListElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const forceUpdateKey = useRef(0);
  const stableKey = useRef(`nav-group-${section}-${Math.random().toString(36).substring(2, 9)}`);
  
  // Get section title translation
  const getSectionTitle = useCallback((lang: LanguageCode) => {
    // Try direct sidebar.section.title first
    const directKey = `sidebar.${section}.title`;
    const translated = getDirectTranslation(directKey, lang, section);
    return translated !== directKey ? translated : section;
  }, [section]);
  
  // Update title and items when language changes
  useEffect(() => {
    if (!items || !Array.isArray(items)) return;
    
    // Update section title
    const newTitle = getSectionTitle(language as LanguageCode);
    setGroupTitle(newTitle);
    
    // Store current language in ref
    languageRef.current = language as LanguageCode;
    
    // Update DOM attributes directly for immediate feedback
    if (labelRef.current) {
      labelRef.current.setAttribute('data-language', language);
      labelRef.current.setAttribute('data-section', section);
      labelRef.current.setAttribute('data-title', newTitle);
      labelRef.current.textContent = newTitle;
    }
    
    // Update menu items with unique keys to force re-render
    const updatedItems = items.map(item => ({
      ...item,
      key: `${item.name}-${language}-${refreshCounter}-${forceUpdateKey.current}`
    }));
    setNavItems(updatedItems);
    
    if (menuRef.current) {
      menuRef.current.setAttribute('data-language', language);
      menuRef.current.setAttribute('data-refresh', refreshCounter.toString());
    }
  }, [language, refreshCounter, items, section, getSectionTitle]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        console.log(`SidebarNavGroup ${section} updating for language: ${newLanguage}`);
        languageRef.current = newLanguage as LanguageCode;
        
        // Update title translation
        const newTitle = getSectionTitle(newLanguage as LanguageCode);
        setGroupTitle(newTitle);
        
        // Update DOM directly for immediate feedback
        if (labelRef.current) {
          labelRef.current.setAttribute('data-language', newLanguage);
          labelRef.current.textContent = newTitle;
        }
        
        // Force re-render of items
        forceUpdateKey.current++;
        
        // Update items with new keys to trigger re-render
        const updatedItems = items.map(item => ({
          ...item,
          key: `${item.name}-${newLanguage}-${Date.now()}-${forceUpdateKey.current}`
        }));
        setNavItems(updatedItems);
        
        // Update menu attributes
        if (menuRef.current) {
          menuRef.current.setAttribute('data-language', newLanguage);
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
  }, [section, getSectionTitle, items]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <SidebarGroup 
      key={`${stableKey.current}-${refreshCounter}-${language}-${forceUpdateKey.current}`}
      data-sidebar-section={section}
      data-language={language}
    >
      {!isCollapsed && (
        <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/60">
          <div 
            className="flex items-center" 
            ref={labelRef} 
            data-section={section} 
            data-language={language}
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            <span>{groupTitle || section}</span>
          </div>
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu 
          ref={menuRef}
          className="flex flex-col space-y-1 px-1"
          data-language={languageRef.current}
          data-section={section}
          data-force-update={forceUpdateKey.current}
          data-refresh={refreshCounter}
        >
          {navItems.map((item) => (
            <SidebarNavItem
              key={item.key || `${item.name}-${language}-${refreshCounter}-${forceUpdateKey.current}`}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default React.memo(SidebarNavGroup);
