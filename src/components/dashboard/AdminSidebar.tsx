
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CreditCard,
  Home,
  Settings,
  Wallet,
  Package,
  Users,
  Shield,
  Bell,
  ChevronLeft,
  Layers,
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TranslatedText from "@/components/translation/TranslatedText";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";

interface SidebarLink {
  path: string;
  icon: React.ElementType;
  label: string;
  translationKey: string;
}

const AdminSidebar = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const contentRef = useRef<HTMLDivElement>(null);
  const [updateKey, setUpdateKey] = useState(`sidebar-${Date.now()}`);

  // Update language ref and force specific render when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      
      // Force update with minimal DOM changes
      if (contentRef.current) {
        contentRef.current.setAttribute('data-language', language);
        
        // Only force rerender after a small delay to avoid cascade of rerenders
        setTimeout(() => {
          setUpdateKey(`sidebar-${language}-${Date.now()}`);
        }, 50);
      }
    }
  }, [language]);

  // Set up global language change listener
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      const { language: newLanguage } = e.detail;
      if (newLanguage && newLanguage !== languageRef.current) {
        languageRef.current = newLanguage as LanguageCode;
        
        // Update DOM without immediate rerender
        if (contentRef.current) {
          contentRef.current.setAttribute('data-language', newLanguage as LanguageCode);
          setTimeout(() => {
            setUpdateKey(`sidebar-event-${newLanguage}-${Date.now()}`);
          }, 50);
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  // Main navigation links
  const mainLinks: SidebarLink[] = [
    {
      path: "/dashboard",
      icon: Home,
      label: "Dashboard",
      translationKey: "sidebar.dashboard"
    },
    {
      path: "/dashboard/transactions",
      icon: BarChart3,
      label: "Transactions",
      translationKey: "sidebar.transactions"
    },
    {
      path: "/dashboard/analytics",
      icon: Layers,
      label: "Analytics",
      translationKey: "sidebar.analytics"
    },
    {
      path: "/dashboard/wallet",
      icon: Wallet,
      label: "Wallet",
      translationKey: "sidebar.wallet"
    },
    {
      path: "/dashboard/cards",
      icon: CreditCard,
      label: "Cards",
      translationKey: "sidebar.cards"
    }
  ];

  // Secondary navigation links
  const secondaryLinks: SidebarLink[] = [
    {
      path: "/dashboard/products",
      icon: Package,
      label: "Products",
      translationKey: "sidebar.products"
    },
    {
      path: "/dashboard/users",
      icon: Users,
      label: "Users",
      translationKey: "sidebar.users"
    },
    {
      path: "/dashboard/security",
      icon: Shield,
      label: "Security",
      translationKey: "sidebar.security"
    },
    {
      path: "/dashboard/notifications",
      icon: Bell,
      label: "Notifications",
      translationKey: "sidebar.notifications"
    },
    {
      path: "/dashboard/settings",
      icon: Settings,
      label: "Settings",
      translationKey: "sidebar.settings"
    }
  ];

  // Custom NavLink that handles active state with nested routes
  const NavLinkWithActiveState = useCallback(({ link }: { link: SidebarLink }) => {
    const isActive = location.pathname === link.path || 
      (link.path !== '/dashboard' && location.pathname.startsWith(link.path));
    const Icon = link.icon;

    return (
      <NavLink 
        to={link.path} 
        className={({ isActive }) => cn(
          "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
          isActive 
            ? "bg-gradient-to-r from-purple-900/40 to-purple-900/20 text-white" 
            : "text-gray-400 hover:text-white hover:bg-purple-900/30"
        )}
        end={link.path === "/dashboard"}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="sidebar-link-content flex items-center gap-3 w-full">
                <Icon className="h-4 w-4" />
                <span className="sidebar-link-text">
                  <TranslatedText 
                    keyName={link.translationKey}
                    fallback={link.label}
                  />
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent 
              side="right" 
              className="bg-charcoal-dark text-white border-purple-900/30"
            >
              <TranslatedText 
                keyName={link.translationKey}
                fallback={link.label}
              />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </NavLink>
    );
  }, [location.pathname]);

  return (
    <Sidebar 
      className="bg-charcoal-dark border-r border-purple-900/30"
    >
      <SidebarHeader className="h-14 flex items-center px-4 border-b border-purple-900/30">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-purple-600 w-6 h-6 flex items-center justify-center">
            <ChevronLeft className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-white">
            <TranslatedText keyName="dashboard.adminPanel" fallback="Admin Panel" />
          </span>
        </div>
        <SidebarTrigger className="ml-auto hover:bg-purple-900/30 rounded-md w-6 h-6 flex items-center justify-center">
          <ChevronLeft className="h-4 w-4 text-gray-400 sidebar-trigger-icon" />
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent 
        ref={contentRef}
        data-language={languageRef.current}
        key={updateKey}
      >
        <ScrollArea className="h-[calc(100vh-3.5rem)] px-3">
          <div className="py-4 space-y-6">
            <div>
              <SidebarGroupLabel className="text-xs text-gray-500 px-3 mb-2">
                <TranslatedText keyName="sidebar.mainNavigation" fallback="Main Navigation" />
              </SidebarGroupLabel>
              <SidebarMenu className="space-y-1">
                {mainLinks.map((link) => (
                  <SidebarMenuItem key={link.path}>
                    <SidebarMenuButton asChild>
                      <NavLinkWithActiveState link={link} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
            <div>
              <SidebarGroupLabel className="text-xs text-gray-500 px-3 mb-2">
                <TranslatedText keyName="sidebar.management" fallback="Management" />
              </SidebarGroupLabel>
              <SidebarMenu className="space-y-1">
                {secondaryLinks.map((link) => (
                  <SidebarMenuItem key={link.path}>
                    <SidebarMenuButton asChild>
                      <NavLinkWithActiveState link={link} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
