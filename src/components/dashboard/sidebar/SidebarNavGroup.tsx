
import React, { useEffect, useRef, useMemo, useCallback } from "react";
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
import type { NavItem } from "./SidebarNavItem";
import { LanguageCode } from "@/utils/languageUtils";
import { getDirectTranslation } from "@/utils/translationHelpers";

interface SidebarNavGroupProps {
  section: string;
  icon: LucideIcon;
  items: NavItem[];
  isCollapsed: boolean;
}

const SidebarNavGroup = ({ section, icon: Icon, items, isCollapsed }: SidebarNavGroupProps) => {
  const { language, refreshCounter } = useSafeTranslation();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const sectionLabelRef = useRef<HTMLDivElement>(null);
  const stableKey = useRef(`nav-group-${section}-${Math.random().toString(36).substring(2, 9)}`);
  const isInitializedRef = useRef(false);
  
  // Get specific translations for section titles - memoize to prevent unnecessary recalculations
  const getSectionTranslation = useCallback(() => {
    // First try direct method from navigationTranslations
    if (section === "sidebar.wallet.title" && navigationTranslations.wallet?.title) {
      return navigationTranslations.wallet.title[languageRef.current] || "Wallet";
    }
    
    if (section === "sidebar.cards.title" && navigationTranslations.cards?.title) {
      return navigationTranslations.cards.title[languageRef.current] || "Cards";
    }
    
    if (section === "sidebar.merchant.title" && navigationTranslations.merchant?.title) {
      return navigationTranslations.merchant.title[languageRef.current] || "Merchant";
    }
    
    if (section === "sidebar.invitation.title" && navigationTranslations.invitation?.title) {
      return navigationTranslations.invitation.title[languageRef.current] || "Invitation";
    }
    
    // If not found in navigationTranslations, try general translation
    return getDirectTranslation(section, languageRef.current, section);
  }, [section, language, refreshCounter]);

  // Update label text using a stable callback
  const updateLabelText = useCallback(() => {
    if (sectionLabelRef.current) {
      const labelSpan = sectionLabelRef.current.querySelector('span');
      if (labelSpan) {
        labelSpan.textContent = getSectionTranslation();
      }
      
      // Also update data attributes
      sectionLabelRef.current.setAttribute('data-language', languageRef.current);
      sectionLabelRef.current.setAttribute('data-refresh', Date.now().toString());
    }
  }, [getSectionTranslation]);

  // Initialize once on mount
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      updateLabelText();
    }
  }, [updateLabelText]);

  // Update when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`SidebarNavGroup ${section}: Language changed to ${language}`);
      languageRef.current = language as LanguageCode;
      updateLabelText();
    }
  }, [language, refreshCounter, updateLabelText, section]);

  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      try {
        const customEvent = e as CustomEvent;
        const { language: newLanguage } = customEvent.detail || {};
        
        if (newLanguage && languageRef.current !== newLanguage) {
          console.log(`SidebarNavGroup ${section}: Language event received: ${newLanguage}`);
          languageRef.current = newLanguage as LanguageCode;
          updateLabelText();
        }
      } catch (error) {
        console.error(`SidebarNavGroup ${section}: Error in language change handler:`, error);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [updateLabelText, section]);

  // Call updateLabelText when collapsed state changes
  useEffect(() => {
    updateLabelText();
  }, [isCollapsed, updateLabelText]);
  
  // Calculate translated section title
  const sectionTitle = useMemo(() => getSectionTranslation(), [getSectionTranslation]);
  
  return (
    <SidebarGroup 
      className="py-1" 
      key={`${stableKey.current}-${refreshCounter}-${language}`}
      data-section={section}
    >
      <SidebarGroupLabel 
        className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center"
        ref={sectionLabelRef}
        data-section={section}
        data-language={languageRef.current}
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
          {items.map((item) => (
            <SidebarNavItem
              key={`${item.name}-${refreshCounter}-${language}`}
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
