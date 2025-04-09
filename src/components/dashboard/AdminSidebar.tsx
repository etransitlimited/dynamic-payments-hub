
import React, { useCallback, useRef, useEffect, useMemo } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import SidebarNavGroup from "./sidebar/SidebarNavGroup";
import SidebarQuickAccess from "./sidebar/SidebarQuickAccess";
import SidebarLogo from "./sidebar/SidebarLogo";
import { getNavigationGroups, getQuickAccessItems } from "./sidebar/sidebarConfig";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageCode } from "@/utils/languageUtils";

const AdminSidebar = () => {
  const { t, language, refreshCounter, refreshTranslations } = useSafeTranslation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const stableKey = useRef(`sidebar-${Math.random().toString(36).substring(2, 9)}`);
  const prevLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const forceUpdateKey = useRef(0);
  
  // Force refresh on language change
  useEffect(() => {
    if (language !== prevLanguageRef.current) {
      console.log(`AdminSidebar: Language changed from ${prevLanguageRef.current} to ${language}`);
      prevLanguageRef.current = language as LanguageCode;
      
      // Force refresh translations
      refreshTranslations();

      // Update forceUpdateKey to force re-render
      forceUpdateKey.current += 1;
      
      // Update data attributes manually for immediate visual feedback
      if (sidebarRef.current) {
        sidebarRef.current.setAttribute('data-language', language);
        sidebarRef.current.setAttribute('data-refresh', Date.now().toString());
        sidebarRef.current.setAttribute('data-force-update', forceUpdateKey.current.toString());
      }
      
      // Force all sidebar items to update
      document.querySelectorAll('[data-sidebar="menu-button"]').forEach(el => {
        el.setAttribute('data-language-update', language);
        el.setAttribute('data-refresh', Date.now().toString());
      });
    }
  }, [language, refreshTranslations]);

  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        console.log(`AdminSidebar: Language event received: ${newLanguage}`);
        languageRef.current = newLanguage as LanguageCode;
        
        // Update data attributes for immediate feedback
        if (sidebarRef.current) {
          sidebarRef.current.setAttribute('data-language', newLanguage);
          sidebarRef.current.setAttribute('data-event', Date.now().toString());
        }
        
        // Force refresh
        refreshTranslations();
        
        // Update forceUpdateKey to force re-render
        forceUpdateKey.current += 1;
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [refreshTranslations]);

  // Get navigation data with memoization to prevent unnecessary recalculations
  // This is critical for performance and preventing infinite render loops
  const navigationItems = useMemo(() => {
    console.log(`AdminSidebar: Recalculating navigation items for language: ${language}, refreshCounter: ${refreshCounter}, forceUpdate: ${forceUpdateKey.current}`);
    return {
      quickAccessItems: getQuickAccessItems(t),
      navigationGroups: getNavigationGroups(t)
    };
  }, [t, language, refreshCounter, forceUpdateKey.current]);

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar 
        className="border-r border-indigo-900/30 bg-gradient-to-b from-[#1a1a2e] to-[#16162b] z-40 transition-all duration-300 ease-in-out" 
        collapsible="icon"
        ref={sidebarRef}
        data-language={language}
        key={`${stableKey.current}-${refreshCounter}-${language}-${forceUpdateKey.current}`}
      >
        <SidebarHeader className="flex justify-center items-center border-b border-indigo-900/30 py-5 flex-shrink-0 bg-[#1A1F2C]/90 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:20px_20px]"></div>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/10"></div>
          
          <div className="relative z-10">
            <SidebarLogo isCollapsed={isCollapsed} />
          </div>
        </SidebarHeader>

        <ScrollArea className="h-[calc(100vh-80px)] bg-transparent">
          <SidebarContent className="pt-4 px-2">
            {/* Quick Access Menu with improved styling */}
            <SidebarQuickAccess 
              items={navigationItems.quickAccessItems} 
              isCollapsed={isCollapsed} 
              key={`quick-access-${language}-${refreshCounter}-${forceUpdateKey.current}`}
            />
            
            <SidebarSeparator className="bg-indigo-900/30 my-3" />
            
            {/* Main Navigation with improved styling */}
            <div className="space-y-5 mt-4">
              {navigationItems.navigationGroups.map((navGroup) => (
                <SidebarNavGroup
                  key={`${navGroup.section}-${refreshCounter}-${language}-${forceUpdateKey.current}`}
                  section={navGroup.section}
                  icon={navGroup.icon}
                  items={navGroup.items}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </SidebarContent>
        </ScrollArea>
      </Sidebar>
    </TooltipProvider>
  );
};

export default React.memo(AdminSidebar);
