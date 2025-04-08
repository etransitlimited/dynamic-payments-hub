
import React, { useEffect, useRef, useMemo } from "react";
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
  
  // Get specific translations for section titles - memoize to prevent unnecessary recalculations
  const getSectionTranslation = useMemo(() => {
    // Handle wallet section
    if (section === "sidebar.wallet.title") {
      return navigationTranslations.wallet.title[languageRef.current] || "Wallet";
    }
    
    // Handle cards section
    if (section === "sidebar.cards.title") {
      return navigationTranslations.cards.title[languageRef.current] || "Cards";
    }
    
    // Handle merchant section
    if (section === "sidebar.merchant.title") {
      return navigationTranslations.merchant.title[languageRef.current] || "Merchant";
    }
    
    // Handle invitation section
    if (section === "sidebar.invitation.title") {
      return navigationTranslations.invitation.title[languageRef.current] || "Invitation";
    }
    
    // Default fallback
    return section;
  }, [section, language, refreshCounter]);

  // Update language directly in the DOM to prevent re-renders
  const updateLabelText = () => {
    if (sectionLabelRef.current && !isCollapsed) {
      const labelSpan = sectionLabelRef.current.querySelector('span');
      if (labelSpan) {
        labelSpan.textContent = getSectionTranslation;
      }
    }
  };

  // Update when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      updateLabelText();
      
      // Update data-language attribute on the component
      if (sectionLabelRef.current) {
        sectionLabelRef.current.setAttribute('data-language', language);
      }
    }
  }, [language, refreshCounter, getSectionTranslation]);

  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        updateLabelText();
        
        // Update data-language attribute on the component
        if (sectionLabelRef.current) {
          sectionLabelRef.current.setAttribute('data-language', newLanguage);
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

  // Call updateLabelText initially and when collapsed state changes
  useEffect(() => {
    updateLabelText();
  }, [isCollapsed, getSectionTranslation]);
  
  return (
    <SidebarGroup className="py-1" key={stableKey.current}>
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
              {getSectionTranslation}
            </TooltipContent>
          </Tooltip>
        ) : (
          <>
            <Icon className="mr-2 text-muted-foreground" size={16} />
            <span className="truncate">
              {getSectionTranslation}
            </span>
          </>
        )}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="mt-2">
          {items.map((item) => (
            <SidebarNavItem
              key={`${item.name}`}
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
