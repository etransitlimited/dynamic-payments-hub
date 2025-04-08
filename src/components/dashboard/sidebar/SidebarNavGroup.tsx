
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

interface SidebarNavGroupProps {
  section: string;
  icon: LucideIcon;
  items: NavItem[];
  isCollapsed: boolean;
}

const SidebarNavGroup = ({ section, icon: Icon, items, isCollapsed }: SidebarNavGroupProps) => {
  const { t, language, refreshCounter } = useSafeTranslation();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const sectionLabelRef = useRef<HTMLDivElement>(null);
  const stableKey = useRef(`nav-group-${section}-${Math.random().toString(36).substring(2, 9)}`);
  const isInitializedRef = useRef(false);
  
  // Get specific translations for section titles - memoize to prevent unnecessary recalculations
  const getSectionTranslation = useCallback(() => {
    // Try to get directly from navigationTranslations first
    if (section === "sidebar.wallet.title" && navigationTranslations.wallet?.title) {
      return navigationTranslations.wallet.title[language as LanguageCode] || t(section, "Wallet");
    }
    
    if (section === "sidebar.cards.title" && navigationTranslations.cards?.title) {
      return navigationTranslations.cards.title[language as LanguageCode] || t(section, "Cards");
    }
    
    if (section === "sidebar.merchant.title" && navigationTranslations.merchant?.title) {
      return navigationTranslations.merchant.title[language as LanguageCode] || t(section, "Merchant");
    }
    
    if (section === "sidebar.invitation.title" && navigationTranslations.invitation?.title) {
      return navigationTranslations.invitation.title[language as LanguageCode] || t(section, "Invitation");
    }
    
    // If not found in navigationTranslations, try general translation
    return t(section, section);
  }, [section, t, language]);

  // Update label text using a stable callback
  const updateLabelText = useCallback(() => {
    if (sectionLabelRef.current) {
      const labelSpan = sectionLabelRef.current.querySelector('span');
      if (labelSpan) {
        const translatedText = getSectionTranslation();
        labelSpan.textContent = translatedText;
      }
      
      // Also update data attributes
      sectionLabelRef.current.setAttribute('data-language', language);
      sectionLabelRef.current.setAttribute('data-refresh', refreshCounter.toString());
      sectionLabelRef.current.setAttribute('data-section', section);
    }
  }, [getSectionTranslation, language, refreshCounter, section]);

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

  // Call updateLabelText when collapsed state changes
  useEffect(() => {
    updateLabelText();
  }, [isCollapsed, updateLabelText]);
  
  // Calculate translated section title
  const sectionTitle = useMemo(() => getSectionTranslation(), [getSectionTranslation]);
  
  // Reset keys when language changes to force re-render
  const itemsWithUpdatedKeys = useMemo(() => {
    return items.map(item => ({
      ...item,
      key: `${item.path}-${language}-${refreshCounter}`
    }));
  }, [items, language, refreshCounter]);
  
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
