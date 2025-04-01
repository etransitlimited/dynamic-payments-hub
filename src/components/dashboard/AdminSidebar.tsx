
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/context/LanguageContext";
import SidebarNavGroup from "./sidebar/SidebarNavGroup";
import SidebarQuickAccess from "./sidebar/SidebarQuickAccess";
import SidebarLogo from "./sidebar/SidebarLogo";
import { getNavigationGroups, getQuickAccessItems } from "./sidebar/sidebarConfig";
import { TooltipProvider } from "@/components/ui/tooltip";

const AdminSidebar = () => {
  const { t } = useLanguage();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Get navigation data from config
  const quickAccessItems = getQuickAccessItems(t);
  const navigationGroups = getNavigationGroups(t);

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar 
        className="border-r border-charcoal-light bg-gradient-to-b from-[#222226] to-[#191923] z-40 transition-all duration-300 ease-in-out" 
        collapsible="icon"
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
            <SidebarQuickAccess items={quickAccessItems} isCollapsed={isCollapsed} />
            
            <SidebarSeparator className="bg-charcoal-light/80 my-3" />
            
            {/* Main Navigation with improved styling */}
            <div className="space-y-4 mt-4">
              {navigationGroups.map((navGroup) => (
                <SidebarNavGroup
                  key={navGroup.section}
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

export default AdminSidebar;
