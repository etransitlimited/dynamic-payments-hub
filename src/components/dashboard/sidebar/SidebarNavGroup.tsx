
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
  const isMountedRef = useRef(true);
  const initialTranslationDone = useRef(false);
  
  // Debug logging
  useEffect(() => {
    console.log(`SidebarNavGroup [${section}] mounted/updated, language: ${language}, refreshCounter: ${refreshCounter}`);
    
    return () => {
      console.log(`SidebarNavGroup [${section}] unmounting`);
    };
  }, [section]);
  
  // Get specific translations for section titles - bypass cache for reliability
  const getSectionTranslation = useCallback(() => {
    // Special handling for wallet section
    if (section === "sidebar.wallet.title") {
      // Hardcoded translations for critical sections
      const walletTitleTranslations: Record<LanguageCode, string> = {
        'en': 'Wallet',
        'es': 'Billetera',
        'fr': 'Portefeuille',
        'zh-CN': '钱包',
        'zh-TW': '錢包'
      };
      
      // Try to get directly from navigationTranslations first (most reliable)
      if (navigationTranslations.wallet?.title && navigationTranslations.wallet?.title[language]) {
        return navigationTranslations.wallet.title[language];
      }
      
      // Use hardcoded translation
      if (walletTitleTranslations[language]) {
        return walletTitleTranslations[language];
      }
      
      // Use translation helper as last resort
      return getDirectTranslation(section, language, "Wallet", false);
    }
    
    // Regular translation path for other sections
    if (navigationTranslations[section.split('.')[1]]?.title) {
      const sectionKey = section.split('.')[1];
      return navigationTranslations[sectionKey].title[language] || 
             getDirectTranslation(section, language, sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1), false);
    }
    
    // Default direct translation
    return getDirectTranslation(section, language, section.split('.').pop() || section, false);
  }, [section, language]);

  // Update section title when language changes
  useEffect(() => {
    if (!isMountedRef.current) return;
    
    const newTitle = getSectionTranslation();
    setSectionTitle(newTitle);
    
    // Execute only once on mount
    if (!initialTranslationDone.current) {
      initialTranslationDone.current = true;
      console.log(`SidebarNavGroup [${section}] initial translation: ${newTitle}`);
    }
    
    // Force update when language changes
    if (language !== prevLanguageRef.current) {
      prevLanguageRef.current = language as LanguageCode;
      forceUpdateKey.current += 1;
      console.log(`SidebarNavGroup [${section}] language changed: ${prevLanguageRef.current} -> ${language}, new title: ${newTitle}`);
      
      // Update DOM for immediate feedback
      if (sectionLabelRef.current) {
        const labelSpan = sectionLabelRef.current.querySelector('span');
        if (labelSpan) {
          labelSpan.textContent = newTitle;
          labelSpan.setAttribute('data-updated', Date.now().toString());
          labelSpan.setAttribute('data-language', language);
        }
        
        sectionLabelRef.current.setAttribute('data-language', language);
        sectionLabelRef.current.setAttribute('data-force-update', forceUpdateKey.current.toString());
        sectionLabelRef.current.setAttribute('data-refresh', refreshCounter.toString());
      }
    }
  }, [language, refreshCounter, getSectionTranslation]);

  // Component lifecycle management
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  // Initialize once on mount and listen for language change events
  useEffect(() => {
    if (!isInitializedRef.current && isMountedRef.current) {
      isInitializedRef.current = true;
      const initialTitle = getSectionTranslation();
      setSectionTitle(initialTitle);
      console.log(`SidebarNavGroup [${section}] initialized with title: ${initialTitle}`);
    }
    
    const handleLanguageChange = (e: Event) => {
      if (!isMountedRef.current) return;
      
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        console.log(`SidebarNavGroup [${section}] language event: ${languageRef.current} -> ${newLanguage}`);
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
            labelSpan.setAttribute('data-updated', Date.now().toString());
            labelSpan.setAttribute('data-language', newLanguage);
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
  
  // Special handling for wallet section items
  const processedItems = useMemo(() => {
    if (section === "sidebar.wallet.title") {
      return items.map(item => {
        // Handle deposit records item specifically
        if (item.path.includes('/deposit-records')) {
          const walletRecordTranslations: Record<LanguageCode, string> = {
            'en': 'Deposit Records',
            'es': 'Registros de Depósito',
            'fr': 'Registres de Dépôt',
            'zh-CN': '充值记录',
            'zh-TW': '充值記錄'
          };
          
          return {
            ...item,
            translatedName: walletRecordTranslations[language] || 'Deposit Records',
            key: `${item.path}-${language}-${refreshCounter}-${forceUpdateKey.current}`
          };
        }
        
        // Handle deposit item specifically
        if (item.path.includes('/deposit')) {
          const walletDepositTranslations: Record<LanguageCode, string> = {
            'en': 'Deposit',
            'es': 'Depósito',
            'fr': 'Dépôt',
            'zh-CN': '充值',
            'zh-TW': '充值'
          };
          
          return {
            ...item,
            translatedName: walletDepositTranslations[language] || 'Deposit',
            key: `${item.path}-${language}-${refreshCounter}-${forceUpdateKey.current}`
          };
        }
        
        // Handle fund details item specifically
        if (item.path.includes('/fund-details')) {
          const fundDetailsTranslations: Record<LanguageCode, string> = {
            'en': 'Fund Details',
            'es': 'Detalles de Fondos',
            'fr': 'Détails des Fonds',
            'zh-CN': '资金明细',
            'zh-TW': '資金明細'
          };
          
          return {
            ...item,
            translatedName: fundDetailsTranslations[language] || 'Fund Details',
            key: `${item.path}-${language}-${refreshCounter}-${forceUpdateKey.current}`
          };
        }
        
        // Default case with language key update
        return {
          ...item,
          key: `${item.path}-${language}-${refreshCounter}-${forceUpdateKey.current}`
        };
      });
    }
    
    // Default processing for non-wallet items
    return items.map(item => ({
      ...item,
      key: `${item.path}-${language}-${refreshCounter}-${forceUpdateKey.current}`
    }));
  }, [items, section, language, refreshCounter, forceUpdateKey.current]);
  
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
            <span className="truncate" data-title={sectionTitle} data-language={language}>
              {sectionTitle}
            </span>
          </>
        )}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="mt-2">
          {processedItems.map((item) => (
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
