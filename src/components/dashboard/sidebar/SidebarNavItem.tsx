
import React, { useEffect, useRef, useState } from "react";
import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { navigationTranslations } from "./sidebarConfig";

export interface NavItem {
  icon?: LucideIcon;
  name: string;
  url?: string;
  translationKey?: string;
  translatedName?: string;
  badge?: string | number;
  key?: string;
  group?: string;
}

export interface SidebarNavItemProps {
  item: NavItem;
  isCollapsed: boolean;
}

// Helper function to get item translation using all available methods
const getMenuItemTranslation = (item: NavItem, language: LanguageCode): string => {
  // 1. First use translatedName if available (pre-translated)
  if (item.translatedName) {
    return item.translatedName;
  }
  
  // 2. Try using translationKey if available
  if (item.translationKey) {
    // Special handling for transactions items
    if (item.translationKey.startsWith('transactions.')) {
      const key = item.translationKey;
      const translated = getDirectTranslation(key, language, item.name);
      if (translated && translated !== key) {
        return translated;
      }
    }
    
    const translated = getDirectTranslation(item.translationKey, language, item.name);
    if (translated && translated !== item.translationKey) {
      return translated;
    }
  }
  
  // 3. Check if item name is a path to navigationTranslations object
  const nameParts = item.name.split('.');
  if (nameParts.length > 1) {
    // Try to traverse the navigationTranslations object using the path
    try {
      let result: any = navigationTranslations;
      for (let i = 0; i < nameParts.length; i++) {
        const part = nameParts[i];
        if (!result[part]) break;
        result = result[part];
      }
      
      // If we found a matching translation object with language keys
      if (result && typeof result === 'object' && language in result) {
        return result[language];
      }
    } catch (e) {
      console.log(`Translation traversal failed for ${item.name}:`, e);
    }
  }
  
  // 4. Try direct key lookup in navigationTranslations
  const pathKey = item.name.replace(/^sidebar\./, '');
  const pathParts = pathKey.split('.');
  
  // Handle nested translation objects
  if (pathParts.length >= 2) {
    const section = pathParts[0];
    const subKey = pathParts[1];
    
    if (
      navigationTranslations[section as keyof typeof navigationTranslations] && 
      typeof navigationTranslations[section as keyof typeof navigationTranslations] === 'object'
    ) {
      const sectionObj = navigationTranslations[section as keyof typeof navigationTranslations] as any;
      
      if (sectionObj[subKey] && typeof sectionObj[subKey] === 'object' && language in sectionObj[subKey]) {
        return sectionObj[subKey][language];
      }
    }
  }
  
  // 5. Special case for transactions
  if (item.name.startsWith('transactions.')) {
    const key = item.name;
    const translated = getDirectTranslation(key, language, item.name);
    if (translated !== key) {
      return translated;
    }
  }
  
  // 6. Full path approach for certain patterns
  if (item.name.startsWith('sidebar.')) {
    const key = item.name;
    const translated = getDirectTranslation(key, language, item.name);
    if (translated !== key) {
      return translated;
    }
  }
  
  // 7. Fallback to original name
  return item.name;
};

const SidebarNavItem = ({ item, isCollapsed }: SidebarNavItemProps) => {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const { t, refreshCounter } = useSafeTranslation();
  const [displayName, setDisplayName] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const itemLinkRef = useRef<HTMLAnchorElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);
  const lastLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const forceUpdateKey = useRef(0);
  
  // Generate a stable ID for this component instance
  const stableId = useRef(`nav-${Math.random().toString(36).slice(2, 9)}`);
  
  // Update display name whenever language changes
  useEffect(() => {
    const translated = getMenuItemTranslation(item, language as LanguageCode);
    setDisplayName(translated);
    
    // Save current language to ref
    lastLanguageRef.current = language as LanguageCode;
    
    // Update DOM attributes for visual feedback
    if (itemRef.current) {
      itemRef.current.setAttribute('data-lang', language);
      itemRef.current.setAttribute('data-key', item.name);
      itemRef.current.setAttribute('data-text', translated);
    }
    
    // Force re-render if language changed
    if (language !== lastLanguageRef.current) {
      forceUpdateKey.current++;
    }
  }, [item, language, refreshCounter]);
  
  // Check if current path matches this item's URL
  useEffect(() => {
    const isItemActive = item.url ? pathname.startsWith(item.url) : false;
    setIsActive(isItemActive);
    
    // Add visual feedback for active item
    if (itemLinkRef.current) {
      if (isItemActive) {
        itemLinkRef.current.setAttribute('data-active', 'true');
      } else {
        itemLinkRef.current.removeAttribute('data-active');
      }
    }
  }, [pathname, item.url]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && newLanguage !== lastLanguageRef.current) {
        console.log(`SidebarNavItem ${stableId.current} updating for language: ${newLanguage}`);
        lastLanguageRef.current = newLanguage as LanguageCode;
        
        // Get updated translation
        const translated = getMenuItemTranslation(item, newLanguage as LanguageCode);
        
        // Update state
        setDisplayName(translated);
        
        // Update DOM directly for immediate feedback
        if (itemRef.current) {
          itemRef.current.setAttribute('data-lang', newLanguage);
          itemRef.current.setAttribute('data-text', translated);
        }
        
        // Apply changes directly to the content as well for immediate update
        const textElement = itemRef.current?.querySelector('[data-nav-item-text]');
        if (textElement) {
          textElement.textContent = translated;
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [item]);

  return (
    <li 
      ref={itemRef} 
      className="w-full" 
      id={stableId.current} 
      data-sidebar="menu-item" 
      data-lang={language}
      data-key={item.name}
      data-text={displayName}
    >
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className={cn(
          "flex w-full h-10 items-center gap-3 rounded-md px-3 py-2.5 transition-colors",
          "hover:bg-sidebar-hover/90 hover:text-sidebar-hover-foreground",
          "data-[active=true]:bg-sidebar-active data-[active=true]:text-sidebar-active-foreground",
          isCollapsed && "justify-center"
        )}
        data-sidebar="menu-button"
      >
        <Link 
          to={item.url || "#"} 
          ref={itemLinkRef} 
          className="flex w-full items-center gap-3"
          data-active={isActive}
        >
          {item.icon && (
            <item.icon className={cn("h-4 w-4 flex-shrink-0", isCollapsed && "w-5 h-5")} />
          )}
          
          {!isCollapsed && (
            <span className="truncate text-sm" data-nav-item-text>
              {displayName}
            </span>
          )}
          
          {!isCollapsed && item.badge && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-purple-900/30 text-xs font-medium text-purple-300">
              {item.badge}
            </span>
          )}
        </Link>
      </SidebarMenuButton>
    </li>
  );
};

export default React.memo(SidebarNavItem);
