
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
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { navigationTranslations } from "./sidebarConfig";
import type { NavItem } from "./SidebarNavItem";

interface SidebarNavGroupProps {
  section: string;
  icon: LucideIcon;
  items: NavItem[];
  isCollapsed: boolean;
}

const SidebarNavGroup = ({ section, icon: Icon, items, isCollapsed }: SidebarNavGroupProps) => {
  const { language } = useSafeTranslation();
  
  // Get specific translations for section titles
  const getSectionTranslation = () => {
    // Handle wallet section
    if (section === "sidebar.wallet.title") {
      return navigationTranslations.wallet.title[language] || "Wallet";
    }
    
    // Handle cards section
    if (section === "sidebar.cards.title") {
      return navigationTranslations.cards.title[language] || "Cards";
    }
    
    // Handle merchant section
    if (section === "sidebar.merchant.title") {
      return navigationTranslations.merchant.title[language] || "Merchant";
    }
    
    // Handle invitation section
    if (section === "sidebar.invitation.title") {
      return navigationTranslations.invitation.title[language] || "Invitation";
    }
    
    // Default fallback
    return section;
  };
  
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
              {getSectionTranslation()}
            </TooltipContent>
          </Tooltip>
        ) : (
          <>
            <Icon className="mr-2 text-muted-foreground" size={16} />
            <span className="truncate">
              {getSectionTranslation()}
            </span>
          </>
        )}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="mt-2">
          {items.map((item) => (
            <SidebarNavItem
              key={item.name}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarNavGroup;
