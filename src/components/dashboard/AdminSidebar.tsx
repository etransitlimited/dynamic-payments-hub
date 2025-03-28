
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
} from "@/components/ui/sidebar";
import { 
  Wallet, 
  CreditCard, 
  Store, 
  UserPlus, 
  LayoutDashboard,
  PieChart,
  Landmark
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "@/components/OptimizedImage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/context/LanguageContext";

const AdminSidebar = () => {
  const location = useLocation();
  const { t } = useLanguage();

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
        { name: t("sidebar.wallet.deposit"), path: "/dashboard/wallet/deposit" },
        { name: t("sidebar.wallet.depositRecords"), path: "/dashboard/wallet/deposit-records" },
        { name: t("sidebar.wallet.fundDetails"), path: "/dashboard/wallet/fund-details" },
      ],
    },
    {
      section: t("sidebar.cards.title"),
      icon: CreditCard,
      items: [
        { name: t("sidebar.cards.search"), path: "/dashboard/cards/search" },
        { name: t("sidebar.cards.activationTasks"), path: "/dashboard/cards/activation-tasks" },
        { name: t("sidebar.cards.apply"), path: "/dashboard/cards/apply" },
      ],
    },
    {
      section: t("sidebar.merchant.title"),
      icon: Store,
      items: [
        { name: t("sidebar.merchant.accountManagement"), path: "/dashboard/merchant/account-management" },
        { name: t("sidebar.merchant.accountInfo"), path: "/dashboard/merchant/account-info" },
        { name: t("sidebar.merchant.accountRoles"), path: "/dashboard/merchant/account-roles" },
      ],
    },
    {
      section: t("sidebar.invitation.title"),
      icon: UserPlus,
      items: [
        { name: t("sidebar.invitation.list"), path: "/dashboard/invitation/list" },
        { name: t("sidebar.invitation.rebateList"), path: "/dashboard/invitation/rebate-list" },
      ],
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-center items-center border-b border-sidebar-border py-4">
        <div className="w-32 h-8 relative">
          <AspectRatio ratio={3 / 0.8}>
            <OptimizedImage
              src="/lovable-uploads/47003b38-e99e-468a-a1da-52124948df0d.png"
              alt={t("sidebar.logo")}
              className="object-contain"
              priority={true}
            />
          </AspectRatio>
        </div>
      </SidebarHeader>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <SidebarContent className="pt-4 px-1.5">
          {/* Quick Access Menu */}
          <div className="mb-4 px-1.5">
            <SidebarMenu className="flex flex-col space-y-1">
              {quickAccess.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.name}
                    size="default"
                  >
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="mr-2.5" size={18} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
          
          {/* Main Navigation */}
          <div className="space-y-3 mt-3">
            {navigation.map((nav) => (
              <SidebarGroup key={nav.section} className="py-1">
                <SidebarGroupLabel className="px-3 text-xs font-semibold text-accent-foreground uppercase tracking-wider flex items-center">
                  <nav.icon className="mr-2" size={16} />
                  {nav.section}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="mt-1.5">
                    {nav.items.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={location.pathname === item.path}
                          tooltip={item.name}
                        >
                          <Link to={item.path} className="pl-6">
                            {item.name}
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
