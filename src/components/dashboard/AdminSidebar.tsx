
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
import { dispatchLanguageChangeEvent } from "@/utils/translationHelpers";

const AdminSidebar = () => {
  const { t, language, refreshCounter } = useSafeTranslation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const stableKey = useRef(`sidebar-${Math.random().toString(36).substring(2, 9)}`);
  const isInitializedRef = useRef(false);
  const prevRefreshCounterRef = useRef(refreshCounter);
  const forceUpdateTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Pre-initialize items on mount to prevent re-renders
  useEffect(() => {
    if (!isInitializedRef.current) {
      // Pre-warm the items to ensure they are in cache
      getQuickAccessItems(t);
      getNavigationGroups(t);
      isInitializedRef.current = true;
      
      // Initialize data attributes
      if (sidebarRef.current) {
        sidebarRef.current.setAttribute('data-language', language);
        sidebarRef.current.setAttribute('data-initialized', 'true');
      }
    }
    
    // Force a language refresh when mounting to ensure proper translations
    setTimeout(() => {
      dispatchLanguageChangeEvent(language as LanguageCode);
    }, 100);
    
    return () => {
      if (forceUpdateTimerRef.current) {
        clearTimeout(forceUpdateTimerRef.current);
      }
    };
  }, [t, language]);

  // Update language ref when language changes
  useEffect(() => {
    if (language !== languageRef.current || refreshCounter !== prevRefreshCounterRef.current) {
      console.log(`AdminSidebar: Language changed from ${languageRef.current} to ${language}`);
      languageRef.current = language as LanguageCode;
      prevRefreshCounterRef.current = refreshCounter;
      
      // Update data-language attribute on the sidebar
      if (sidebarRef.current) {
        sidebarRef.current.setAttribute('data-language', language);
        sidebarRef.current.setAttribute('data-refresh', refreshCounter.toString());
      }
      
      // Force an update to ensure translations are applied
      if (forceUpdateTimerRef.current) {
        clearTimeout(forceUpdateTimerRef.current);
      }
      
      forceUpdateTimerRef.current = setTimeout(() => {
        // Re-dispatch language change event to ensure all components update
        dispatchLanguageChangeEvent(language as LanguageCode);
      }, 50);
    }
  }, [language, refreshCounter]);

  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      try {
        const customEvent = e as CustomEvent;
        const { language: newLanguage, timestamp } = customEvent.detail || {};
        
        if (newLanguage && languageRef.current !== newLanguage) {
          console.log(`AdminSidebar: Language event received: ${newLanguage}`);
          languageRef.current = newLanguage as LanguageCode;
          
          // Update data-language attribute on the sidebar
          if (sidebarRef.current) {
            sidebarRef.current.setAttribute('data-language', newLanguage);
            sidebarRef.current.setAttribute('data-event-update', timestamp || Date.now().toString());
          }
        }
      } catch (error) {
        console.error("Error in AdminSidebar language change handler:", error);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  // Get navigation data from config with stable reference
  // Use useCallback with stable dependencies to prevent recreating the function on every render
  const getItems = useCallback(() => {
    return {
      quickAccess: getQuickAccessItems(t),
      navigationGroups: getNavigationGroups(t)
    };
  }, [t]);
  
  // Use the callback to get items with useMemo to prevent unnecessary recalculations
  const navigationItems = useMemo(() => {
    const items = getItems();
    return {
      quickAccessItems: items.quickAccess,
      navigationGroups: items.navigationGroups
    };
  }, [getItems, refreshCounter, language]); // Added language dependency to force re-evaluation

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar 
        className="border-r border-charcoal-light bg-gradient-to-b from-[#222226] to-[#191923] z-40 transition-all duration-300 ease-in-out" 
        collapsible="icon"
        ref={sidebarRef}
        data-language={languageRef.current}
        key={`${stableKey.current}-${refreshCounter}-${language}`}
      >
        <SidebarHeader className="flex justify-center items-center border-b border-charcoal-light py-4 flex-shrink-0 bg-[#1A1F2C] relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:20px_20px]"></div>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-transparent"></div>
          
          <div className="relative z-10">
            <SidebarLogo isCollapsed={isCollapsed} />
          </div>
        </SidebarHeader>

        <ScrollArea className="h-[calc(100vh-80px)] bg-transparent">
          <SidebarContent className="pt-4 px-1.5">
            {/* Quick Access Menu with improved styling */}
            <SidebarQuickAccess 
              items={navigationItems.quickAccessItems} 
              isCollapsed={isCollapsed} 
            />
            
            <SidebarSeparator className="bg-charcoal-light/80 my-3" />
            
            {/* Main Navigation with improved styling */}
            <div className="space-y-4 mt-4">
              {navigationItems.navigationGroups.map((navGroup) => (
                <SidebarNavGroup
                  key={`${navGroup.section}-${refreshCounter}-${language}`}
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
