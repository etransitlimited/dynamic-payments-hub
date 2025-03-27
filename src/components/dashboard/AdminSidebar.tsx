
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
  Settings,
  LayoutDashboard,
  PieChart,
  Landmark
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from "@/components/OptimizedImage";

const AdminSidebar = () => {
  const location = useLocation();

  // Navigation structure
  const navigation = [
    {
      section: "钱包",
      icon: Wallet,
      items: [
        { name: "充值", path: "/dashboard/wallet/deposit" },
        { name: "充值记录", path: "/dashboard/wallet/deposit-records" },
        { name: "资金明细", path: "/dashboard/wallet/fund-details" },
      ],
    },
    {
      section: "卡片管理",
      icon: CreditCard,
      items: [
        { name: "卡片查询", path: "/dashboard/cards/search" },
        { name: "开卡任务", path: "/dashboard/cards/activation-tasks" },
        { name: "申请卡片", path: "/dashboard/cards/apply" },
      ],
    },
    {
      section: "商户中心",
      icon: Store,
      items: [
        { name: "账户管理", path: "/dashboard/merchant/account-management" },
        { name: "帐号信息", path: "/dashboard/merchant/account-info" },
        { name: "账户角色", path: "/dashboard/merchant/account-roles" },
      ],
    },
    {
      section: "邀请管理",
      icon: UserPlus,
      items: [
        { name: "邀请列表", path: "/dashboard/invitation/list" },
        { name: "返点列表", path: "/dashboard/invitation/rebate-list" },
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
              alt="Zora Virtual Card Logo"
              className="object-contain"
              priority={true}
            />
          </AspectRatio>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((nav) => (
          <SidebarGroup key={nav.section}>
            <SidebarGroupLabel>
              <nav.icon className="mr-2" size={18} />
              {nav.section}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.items.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                      tooltip={item.name}
                    >
                      <Link to={item.path}>{item.name}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
