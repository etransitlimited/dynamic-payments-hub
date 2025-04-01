
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

  return (
    <SidebarMenuItem className="mb-1">
      {isCollapsed ? (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
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
              alignOffset={-8}
              className="bg-charcoal-dark/95 text-white border-purple-500/30"
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
          <Link to={path} className="flex items-center w-full">
            <Icon 
              className={`mr-2.5 ${isActive ? 'text-purple-400' : 'text-muted-foreground'}`} 
              size={18} 
            />
            <span 
              className={`truncate ${isActive ? 'text-purple-400 font-medium' : 'text-muted-foreground'}`}
            >
              {name}
            </span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
};

export default SidebarNavItem;
