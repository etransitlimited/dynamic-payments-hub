
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
    <TooltipProvider>
      <Sidebar 
        className="border-r border-charcoal-light bg-[#222226] z-40" 
        collapsible="icon"
      >
        <SidebarHeader className="flex justify-center items-center border-b border-charcoal-light py-4 flex-shrink-0 bg-[#1A1F2C]">
          <SidebarLogo isCollapsed={isCollapsed} />
        </SidebarHeader>

        <ScrollArea className="h-[calc(100vh-80px)] bg-[#222226]">
          <SidebarContent className="pt-4 px-1.5">
            {/* Quick Access Menu */}
            <SidebarQuickAccess items={quickAccessItems} isCollapsed={isCollapsed} />
            
            <SidebarSeparator className="bg-charcoal-light" />
            
            {/* Main Navigation */}
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
