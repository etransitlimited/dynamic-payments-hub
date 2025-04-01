
import React from "react";
import { LucideIcon, MoreHorizontal } from "lucide-react";
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarMenu 
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SidebarNavItem from "./SidebarNavItem";

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

interface SidebarNavGroupProps {
  section: string;
  icon: LucideIcon;
  items: NavItem[];
  isCollapsed: boolean;
}

const SidebarNavGroup = ({ section, icon: Icon, items, isCollapsed }: SidebarNavGroupProps) => {
  return (
    <SidebarGroup className="py-1">
      <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
        {isCollapsed ? (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-default w-full flex justify-center">
                  <MoreHorizontal className="text-muted-foreground" size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="right"
                align="start"
                sideOffset={20}
                className="z-[999999] font-medium bg-charcoal-dark/90 border-purple-500/30"
              >
                {section}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <>
            <Icon className="mr-2 text-muted-foreground" size={16} />
            <span className="truncate">{section}</span>
          </>
        )}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="mt-2">
          {items.map((item) => (
            <SidebarNavItem
              key={item.name}
              path={item.path}
              name={item.name}
              icon={item.icon}
              isCollapsed={isCollapsed}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarNavGroup;
