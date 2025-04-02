
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import TranslatedText from "@/components/translation/TranslatedText";

interface SidebarNavItemProps {
  path: string;
  name: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

const SidebarNavItem = ({ path, name, icon: Icon, isCollapsed }: SidebarNavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <SidebarMenuItem className="mb-1">
      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              size="default"
              className={isActive ? 'bg-purple-600/20 text-purple-400' : 'hover:bg-charcoal-light/20'}
            >
              <Link to={path} className="flex items-center w-full">
                <div className="flex items-center justify-center w-full">
                  <Icon 
                    size={18} 
                    className={isActive ? 'text-purple-400' : 'text-muted-foreground'} 
                  />
                </div>
              </Link>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent 
            side="right"
            align="start"
            sideOffset={10}
            avoidCollisions={false}
            className="font-medium z-[99999]"
          >
            <TranslatedText keyName={name} fallback={name} />
          </TooltipContent>
        </Tooltip>
      ) : (
        <SidebarMenuButton
          asChild
          isActive={isActive}
          size="default"
          className={isActive ? 'bg-purple-600/20 text-purple-400' : 'hover:bg-charcoal-light/20'}
        >
          <Link to={path} className="flex items-center w-full">
            <Icon 
              className={`mr-2.5 ${isActive ? 'text-purple-400' : 'text-muted-foreground'}`} 
              size={18} 
            />
            <span 
              className={`truncate ${isActive ? 'text-purple-400 font-medium' : 'text-muted-foreground'}`}
            >
              <TranslatedText keyName={name} fallback={name} />
            </span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
};

export default SidebarNavItem;
