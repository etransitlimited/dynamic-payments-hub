
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Wallet, 
  CreditCard, 
  Store, 
  UserPlus, 
  LayoutDashboard,
  PieChart,
  Landmark,
  CircleDot,
  ChevronRight
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "@/components/OptimizedImage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/context/LanguageContext";

const AdminSidebar = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Quick access shortcuts for dashboard homepage
  const quickAccess = [
    { name: t("sidebar.dashboard"), path: "/dashboard", icon: LayoutDashboard },
    { name: t("sidebar.analytics"), path: "/dashboard/analytics", icon: PieChart },
    { name: t("sidebar.transactions"), path: "/dashboard/transactions", icon: Landmark }
  ];

  // Navigation structure
  const navigation = [
    {
      section: t("sidebar.wallet.title"),
      icon: Wallet,
      items: [
        { name: t("sidebar.wallet.deposit"), path: "/dashboard/wallet/deposit", icon: ChevronRight },
        { name: t("sidebar.wallet.depositRecords"), path: "/dashboard/wallet/deposit-records", icon: ChevronRight },
        { name: t("sidebar.wallet.fundDetails"), path: "/dashboard/wallet/fund-details", icon: ChevronRight },
      ],
    },
    {
      section: t("sidebar.cards.title"),
      icon: CreditCard,
      items: [
        { name: t("sidebar.cards.search"), path: "/dashboard/cards/search", icon: ChevronRight },
        { name: t("sidebar.cards.activationTasks"), path: "/dashboard/cards/activation", icon: ChevronRight },
        { name: t("sidebar.cards.apply"), path: "/dashboard/cards/apply", icon: ChevronRight },
      ],
    },
    {
      section: t("sidebar.merchant.title"),
      icon: Store,
      items: [
        { name: t("sidebar.merchant.accountManagement"), path: "/dashboard/merchant/account-management", icon: ChevronRight },
        { name: t("sidebar.merchant.accountInfo"), path: "/dashboard/merchant/account-info", icon: ChevronRight },
        { name: t("sidebar.merchant.accountRoles"), path: "/dashboard/merchant/account-roles", icon: ChevronRight },
      ],
    },
    {
      section: t("sidebar.invitation.title"),
      icon: UserPlus,
      items: [
        { name: t("sidebar.invitation.list"), path: "/dashboard/invitation/list", icon: ChevronRight },
        { name: t("sidebar.invitation.rebateList"), path: "/dashboard/invitation/rebate-list", icon: ChevronRight },
      ],
    }
  ];

  return (
    <Sidebar 
      className="border-r border-purple-900/20 bg-charcoal-light" 
      collapsible="icon"
    >
      <SidebarHeader className="flex justify-center items-center border-b border-purple-900/20 py-4 flex-shrink-0 bg-charcoal-dark/40">
        <div className={`${isCollapsed ? "w-8" : "w-32"} h-8 relative transition-all duration-200`}>
          <AspectRatio ratio={isCollapsed ? 1 : 3 / 0.8}>
            <OptimizedImage
              src="/lovable-uploads/47003b38-e99e-468a-a1da-52124948df0d.png"
              alt={t("sidebar.logo")}
              className="object-contain"
              priority={true}
            />
          </AspectRatio>
        </div>
      </SidebarHeader>

      <ScrollArea className="h-[calc(100vh-80px)] bg-charcoal-light/90">
        <SidebarContent className="pt-4 px-1.5">
          {/* Quick Access Menu */}
          <div className="mb-4 px-1.5">
            <SidebarMenu className="flex flex-col space-y-2">
              {quickAccess.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={isCollapsed ? item.name : undefined}
                    size="default"
                    className={location.pathname === item.path ? 'bg-purple-600/20 text-purple-400' : 'hover:bg-purple-900/10'}
                  >
                    <Link to={item.path} className="flex items-center w-full">
                      <item.icon className={`${isCollapsed ? "mx-auto" : "mr-2.5"} ${location.pathname === item.path ? 'text-purple-400' : 'text-muted-foreground'}`} size={18} />
                      {!isCollapsed && <span className={`font-medium truncate ${location.pathname === item.path ? 'text-purple-400' : 'text-muted-foreground'}`}>{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
          
          <SidebarSeparator className="bg-purple-900/20" />
          
          {/* Main Navigation */}
          <div className="space-y-4 mt-4">
            {navigation.map((nav) => (
              <SidebarGroup key={nav.section} className="py-1">
                <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
                  <nav.icon className={`${isCollapsed ? "mx-auto" : "mr-2"} text-muted-foreground`} size={16} />
                  {!isCollapsed && <span className="truncate">{nav.section}</span>}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="mt-2">
                    {nav.items.map((item) => (
                      <SidebarMenuItem key={item.name} className="mb-1">
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === item.path}
                          tooltip={isCollapsed ? item.name : undefined}
                          size="default"
                          className={location.pathname === item.path ? 'bg-purple-600/20 text-purple-400' : 'hover:bg-purple-900/10'}
                        >
                          <Link to={item.path} className="flex items-center w-full">
                            {isCollapsed ? (
                              <div className="flex items-center justify-center w-full">
                                <item.icon 
                                  size={18} 
                                  className={`${location.pathname === item.path ? 'text-purple-400' : 'text-muted-foreground'}`} 
                                />
                              </div>
                            ) : (
                              <>
                                <item.icon 
                                  className={`mr-2.5 ${location.pathname === item.path ? 'text-purple-400' : 'text-muted-foreground'}`} 
                                  size={18} 
                                />
                                <span 
                                  className={`truncate ${location.pathname === item.path ? 'text-purple-400 font-medium' : 'text-muted-foreground'}`}
                                >
                                  {item.name}
                                </span>
                              </>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </div>
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
};

export default AdminSidebar;
