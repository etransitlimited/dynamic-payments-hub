
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarNavItemProps {
  path: string;
  name: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

const SidebarNavItem = ({ path, name, icon: Icon, isCollapsed }: SidebarNavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  const buttonContent = (
    <Link to={path} className="flex items-center w-full">
      {isCollapsed ? (
        <div className="flex items-center justify-center w-full">
          <Icon 
            size={18} 
            className={isActive ? 'text-purple-400' : 'text-muted-foreground'} 
          />
        </div>
      ) : (
        <>
          <Icon 
            className={`mr-2.5 ${isActive ? 'text-purple-400' : 'text-muted-foreground'}`} 
            size={18} 
          />
          <span 
            className={`truncate ${isActive ? 'text-purple-400 font-medium' : 'text-muted-foreground'}`}
          >
            {name}
          </span>
        </>
      )}
    </Link>
  );

  return (
    <SidebarMenuItem className="mb-1">
      {isCollapsed ? (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                size="default"
                className={isActive ? 'bg-purple-600/20 text-purple-400' : 'hover:bg-charcoal-light/20'}
              >
                {buttonContent}
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent 
              side="right" 
              align="start"
              alignOffset={0}
              sideOffset={12}
              className="z-[2000000] font-medium"
            >
              {name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <SidebarMenuButton
          asChild
          isActive={isActive}
          size="default"
          className={isActive ? 'bg-purple-600/20 text-purple-400' : 'hover:bg-charcoal-light/20'}
        >
          {buttonContent}
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
};

export default SidebarNavItem;
