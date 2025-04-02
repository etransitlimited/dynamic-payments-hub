
import React from "react";
import { LucideIcon } from "lucide-react";
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarMenu 
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SidebarNavItem from "./SidebarNavItem";
import TranslatedText from "@/components/translation/TranslatedText";

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
              <TranslatedText keyName={section} fallback={section} />
            </TooltipContent>
          </Tooltip>
        ) : (
          <>
            <Icon className="mr-2 text-muted-foreground" size={16} />
            <span className="truncate">
              <TranslatedText keyName={section} fallback={section} />
            </span>
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
