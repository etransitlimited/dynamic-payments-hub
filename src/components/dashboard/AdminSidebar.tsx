
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
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TranslatedText from "@/components/translation/TranslatedText";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";

interface MainNavItem {
  title: string;
  translationKey: string;
  href: string;
  icon: React.ElementType;
  submenu?: SubNavItem[];
}

interface SubNavItem {
  title: string;
  translationKey: string;
  href: string;
}

const AdminSidebar = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const contentRef = useRef<HTMLDivElement>(null);
  const [updateKey, setUpdateKey] = useState(`sidebar-${Date.now()}`);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  // Update language reference when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      
      if (contentRef.current) {
        contentRef.current.setAttribute('data-language', language);
        setTimeout(() => {
          setUpdateKey(`sidebar-${language}-${Date.now()}`);
        }, 50);
      }
    }
  }, [language]);

  // Handle language change events
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      const { language: newLanguage } = e.detail;
      if (newLanguage && newLanguage !== languageRef.current) {
        languageRef.current = newLanguage as LanguageCode;
        
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

  // Define main navigation items with submenus
  const mainNavItems: MainNavItem[] = [
    {
      title: "Dashboard",
      translationKey: "sidebar.dashboard",
      href: "/dashboard",
      icon: Home
    },
    {
      title: "Transactions",
      translationKey: "sidebar.transactions",
      href: "/dashboard/transactions",
      icon: BarChart3
    },
    {
      title: "Analytics",
      translationKey: "sidebar.analytics",
      href: "/dashboard/analytics",
      icon: Layers
    },
    {
      title: "Wallet",
      translationKey: "sidebar.wallet",
      href: "/dashboard/wallet",
      icon: Wallet,
      submenu: [
        {
          title: "Overview",
          translationKey: "sidebar.wallet.overview",
          href: "/dashboard/wallet"
        },
        {
          title: "Fund Details",
          translationKey: "sidebar.wallet.fundDetails",
          href: "/dashboard/wallet/fund-details"
        }
      ]
    },
    {
      title: "Cards",
      translationKey: "sidebar.cards",
      href: "/dashboard/cards",
      icon: CreditCard,
      submenu: [
        {
          title: "All Cards",
          translationKey: "sidebar.cards.all",
          href: "/dashboard/cards"
        },
        {
          title: "Card Search",
          translationKey: "sidebar.cards.search",
          href: "/dashboard/cards/search"
        },
        {
          title: "Activation",
          translationKey: "sidebar.cards.activation",
          href: "/dashboard/cards/activation"
        }
      ]
    },
    {
      title: "Products",
      translationKey: "sidebar.products",
      href: "/dashboard/products",
      icon: Package
    },
    {
      title: "Users",
      translationKey: "sidebar.users",
      href: "/dashboard/users",
      icon: Users
    },
    {
      title: "Security",
      translationKey: "sidebar.security",
      href: "/dashboard/security",
      icon: Shield
    },
    {
      title: "Notifications",
      translationKey: "sidebar.notifications",
      href: "/dashboard/notifications",
      icon: Bell
    },
    {
      title: "Settings",
      translationKey: "sidebar.settings",
      href: "/dashboard/settings",
      icon: Settings
    }
  ];

  // Toggle submenu open/closed state
  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  // Check if a route is active, including checking if current path is in submenu
  const isRouteActive = useCallback((item: MainNavItem) => {
    if (location.pathname === item.href) return true;
    
    // Check if any submenu item matches current path
    if (item.submenu) {
      return item.submenu.some(subItem => location.pathname === subItem.href);
    }
    
    // For main items without submenu, check if path starts with item href (except dashboard root)
    return item.href !== "/dashboard" && location.pathname.startsWith(item.href);
  }, [location.pathname]);

  // Expand submenus for active routes on initial load
  useEffect(() => {
    const initialOpenState: Record<string, boolean> = {};
    
    mainNavItems.forEach(item => {
      if (item.submenu && isRouteActive(item)) {
        initialOpenState[item.title] = true;
      }
    });
    
    setOpenSubmenus(initialOpenState);
  }, [isRouteActive]);

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
          <div className="py-4">
            <SidebarGroupLabel className="text-xs text-gray-500 px-3 mb-2">
              <TranslatedText keyName="sidebar.navigation" fallback="Navigation" />
            </SidebarGroupLabel>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <>
                      <SidebarMenuButton
                        className={cn(
                          "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                          isRouteActive(item)
                            ? "bg-gradient-to-r from-purple-900/40 to-purple-900/20 text-white"
                            : "text-gray-400 hover:text-white hover:bg-purple-900/30"
                        )}
                        onClick={() => toggleSubmenu(item.title)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span>
                              <TranslatedText
                                keyName={item.translationKey}
                                fallback={item.title}
                              />
                            </span>
                          </div>
                          <ChevronLeft 
                            className={cn(
                              "h-4 w-4 transition-transform",
                              openSubmenus[item.title] ? "rotate-90" : "-rotate-90"
                            )} 
                          />
                        </div>
                      </SidebarMenuButton>
                      {openSubmenus[item.title] && (
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.href}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === subItem.href}
                              >
                                <NavLink to={subItem.href}>
                                  <span>
                                    <TranslatedText
                                      keyName={subItem.translationKey}
                                      fallback={subItem.title}
                                    />
                                  </span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) => cn(
                          "w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                          isActive || (item.href !== "/dashboard" && location.pathname.startsWith(item.href))
                            ? "bg-gradient-to-r from-purple-900/40 to-purple-900/20 text-white"
                            : "text-gray-400 hover:text-white hover:bg-purple-900/30"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>
                          <TranslatedText
                            keyName={item.translationKey}
                            fallback={item.title}
                          />
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
