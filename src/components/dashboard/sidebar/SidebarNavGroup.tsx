
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { LucideIcon } from "lucide-react";
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarMenu 
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SidebarNavItem from "./SidebarNavItem";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { navigationTranslations } from "./sidebarConfig";
import { getDirectTranslation } from "@/utils/translationHelpers";
import type { NavItem } from "./SidebarNavItem";
import { LanguageCode } from "@/utils/languageUtils";

interface SidebarNavGroupProps {
  section: string;
  icon: LucideIcon;
  items: NavItem[];
  isCollapsed: boolean;
}

const SidebarNavGroup = ({ section, icon: Icon, items, isCollapsed }: SidebarNavGroupProps) => {
  const { t, language, refreshCounter } = useSafeTranslation();
  const [sectionTitle, setSectionTitle] = useState<string>("");
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const sectionLabelRef = useRef<HTMLDivElement>(null);
  const stableKey = useRef(`nav-group-${section}-${Math.random().toString(36).substring(2, 9)}`);
  const isInitializedRef = useRef(false);
  const prevLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const forceUpdateKey = useRef(0);
  
  // Get specific translations for section titles - bypass cache for reliability
  const getSectionTranslation = useCallback(() => {
    // Try to get directly from navigationTranslations first (most reliable)
    if (section === "sidebar.wallet.title" && navigationTranslations.wallet?.title) {
      return navigationTranslations.wallet.title[language as LanguageCode] || 
             getDirectTranslation(section, language as LanguageCode, "Wallet", false);
    }
    
    if (section === "sidebar.cards.title" && navigationTranslations.cards?.title) {
      return navigationTranslations.cards.title[language as LanguageCode] || 
             getDirectTranslation(section, language as LanguageCode, "Cards", false);
    }
    
    if (section === "sidebar.merchant.title" && navigationTranslations.merchant?.title) {
      return navigationTranslations.merchant.title[language as LanguageCode] || 
             getDirectTranslation(section, language as LanguageCode, "Merchant", false);
    }
    
    if (section === "sidebar.invitation.title" && navigationTranslations.invitation?.title) {
      return navigationTranslations.invitation.title[language as LanguageCode] || 
             getDirectTranslation(section, language as LanguageCode, "Invitation", false);
    }
    
    // If not found in navigationTranslations, force direct translation with cache bypass
    return getDirectTranslation(section, language as LanguageCode, section, false);
  }, [section, language]);

  // Update section title when language changes
  useEffect(() => {
    const newTitle = getSectionTranslation();
    setSectionTitle(newTitle);
    
    // Force update when language changes
    if (language !== prevLanguageRef.current) {
      prevLanguageRef.current = language as LanguageCode;
      forceUpdateKey.current += 1;
      
      // Update DOM for immediate feedback
      if (sectionLabelRef.current) {
        const labelSpan = sectionLabelRef.current.querySelector('span');
        if (labelSpan) {
          labelSpan.textContent = newTitle;
        }
        
        sectionLabelRef.current.setAttribute('data-language', language);
        sectionLabelRef.current.setAttribute('data-force-update', forceUpdateKey.current.toString());
        sectionLabelRef.current.setAttribute('data-refresh', refreshCounter.toString());
      }
    }
  }, [language, refreshCounter, getSectionTranslation]);

  // Initialize once on mount and listen for language change events
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      setSectionTitle(getSectionTranslation());
    }
    
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        forceUpdateKey.current += 1;
        
        // Get new translation
        const newTitle = getSectionTranslation();
        setSectionTitle(newTitle);
        
        // Update DOM directly for immediate feedback
        if (sectionLabelRef.current) {
          const labelSpan = sectionLabelRef.current.querySelector('span');
          if (labelSpan) {
            labelSpan.textContent = newTitle;
          }
          
          sectionLabelRef.current.setAttribute('data-language', newLanguage);
          sectionLabelRef.current.setAttribute('data-event-update', Date.now().toString());
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [getSectionTranslation]);
  
  // Reset keys when language changes to force re-render
  const itemsWithUpdatedKeys = useMemo(() => {
    return items.map(item => ({
      ...item,
      key: `${item.path}-${language}-${refreshCounter}-${forceUpdateKey.current}`
    }));
  }, [items, language, refreshCounter, forceUpdateKey.current]);
  
  // Generate a stable key for the entire group that includes language info
  const stableGroupKey = `${stableKey.current}-${language}-${forceUpdateKey.current}-${refreshCounter}`;
  
  return (
    <SidebarGroup 
      className="py-1" 
      key={stableGroupKey}
      data-section={section}
      data-language={language}
    >
      <SidebarGroupLabel 
        className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center"
        ref={sectionLabelRef}
        data-section={section}
        data-language={language}
      >
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-default w-full flex justify-center">
                <Icon className="text-muted-foreground" size={18} />
              </div>
            </TooltipTrigger>
            <TooltipContent 
              side="right"
              align="start"
              sideOffset={10}
              avoidCollisions={false}
              className="font-medium z-[99999]"
            >
              {sectionTitle}
            </TooltipContent>
          </Tooltip>
        ) : (
          <>
            <Icon className="mr-2 text-muted-foreground" size={16} />
            <span className="truncate">
              {sectionTitle}
            </span>
          </>
        )}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="mt-2">
          {itemsWithUpdatedKeys.map((item) => (
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
