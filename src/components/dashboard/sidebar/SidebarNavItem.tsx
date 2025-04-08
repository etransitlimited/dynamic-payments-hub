
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { navigationTranslations } from "./sidebarConfig";

export interface NavItem {
  path: string;
  name: string;
  icon: LucideIcon;
}

interface SidebarNavItemProps {
  path: string;
  name: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

const SidebarNavItem = ({ path, name, icon: Icon, isCollapsed }: SidebarNavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  const { language } = useSafeTranslation();
  
  // Get specific translations for each navigation item
  const getItemTranslation = () => {
    // Handle wallet title item
    if (name === "sidebar.wallet.title") {
      return navigationTranslations.wallet.title[language] || "Wallet Management";
    }
    
    // Handle dashboard items
    if (name === "sidebar.dashboard") {
      return navigationTranslations.dashboard[language] || "Dashboard";
    }
    
    // Handle analytics
    if (name === "sidebar.analytics") {
      return navigationTranslations.analytics[language] || "Analytics";
    }
    
    // Handle transactions
    if (name === "sidebar.transactions") {
      return navigationTranslations.transactions[language] || "Transactions";
    }
    
    // Handle wallet items
    if (name === "sidebar.wallet.deposit") {
      return navigationTranslations.wallet.deposit[language] || "Deposit";
    }
    if (name === "sidebar.wallet.depositRecords") {
      return navigationTranslations.wallet.depositRecords[language] || "Deposit Records";
    }
    if (name === "sidebar.wallet.fundDetails") {
      return navigationTranslations.wallet.fundDetails[language] || "Fund Details";
    }
    
    // Handle cards items
    if (name === "sidebar.cards.search") {
      return navigationTranslations.cards.search[language] || "Card Search";
    }
    if (name === "sidebar.cards.activationTasks") {
      return navigationTranslations.cards.activationTasks[language] || "Activation Tasks";
    }
    if (name === "sidebar.cards.apply") {
      return navigationTranslations.cards.apply[language] || "Apply Card";
    }
    
    // Handle merchant items
    if (name === "sidebar.merchant.accountManagement") {
      return navigationTranslations.merchant.accountManagement[language] || "Account Management";
    }
    if (name === "sidebar.merchant.accountInfo") {
      return navigationTranslations.merchant.accountInfo[language] || "Account Info";
    }
    if (name === "sidebar.merchant.accountRoles") {
      return navigationTranslations.merchant.accountRoles[language] || "Account Roles";
    }
    
    // Handle invitation items
    if (name === "sidebar.invitation.list") {
      return navigationTranslations.invitation.list[language] || "Invitation List";
    }
    if (name === "sidebar.invitation.rebateList") {
      return navigationTranslations.invitation.rebateList[language] || "Rebate List";
    }
    
    // Default fallback
    return name;
  };

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
            {getItemTranslation()}
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
              {getItemTranslation()}
            </span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
};

export default SidebarNavItem;
