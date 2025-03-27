
import React from "react";
import { useLocation } from "react-router-dom";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarSubmenu from "./SidebarSubmenu";
import { 
  Home, 
  BarChart3, 
  History, 
  CreditCard, 
  Wallet, 
  User, 
  Users 
} from "lucide-react";
import { NavigationItem } from "./types";

const SidebarNavigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems: NavigationItem[] = [
    {
      title: "主页",
      icon: <Home size={18} />,
      path: "/dashboard",
      type: "single"
    },
    {
      title: "数据分析",
      icon: <BarChart3 size={18} />,
      path: "/dashboard/analytics",
      type: "single"
    },
    {
      title: "交易记录",
      icon: <History size={18} />,
      path: "/dashboard/transactions",
      type: "single"
    },
    {
      title: "卡片管理",
      icon: <CreditCard size={18} />,
      type: "submenu",
      items: [
        {
          title: "卡片查询",
          path: "/dashboard/cards/search",
        },
        {
          title: "激活任务",
          path: "/dashboard/cards/activation-tasks",
        },
        {
          title: "申请卡片",
          path: "/dashboard/cards/apply",
        },
      ],
    },
    {
      title: "钱包管理",
      icon: <Wallet size={18} />,
      type: "submenu",
      items: [
        {
          title: "充值",
          path: "/dashboard/wallet/deposit",
        },
        {
          title: "充值记录",
          path: "/dashboard/wallet/deposit-records",
        },
        {
          title: "资金明细",
          path: "/dashboard/wallet/fund-details",
        },
      ],
    },
    {
      title: "商户中心",
      icon: <User size={18} />,
      type: "submenu",
      items: [
        {
          title: "账户管理",
          path: "/dashboard/merchant/account-management",
        },
        {
          title: "账户信息",
          path: "/dashboard/merchant/account-info",
        },
        {
          title: "账户权限",
          path: "/dashboard/merchant/account-roles",
        },
      ],
    },
    {
      title: "邀请管理",
      icon: <Users size={18} />,
      type: "submenu",
      items: [
        {
          title: "邀请记录",
          path: "/dashboard/invitation/list",
        },
        {
          title: "返利记录",
          path: "/dashboard/invitation/rebate-list",
        },
      ],
    },
  ];

  return (
    <div className="space-y-1">
      {navItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.type === "single" ? (
            <SidebarMenuItem 
              title={item.title}
              icon={item.icon}
              path={item.path}
              isActive={isActive(item.path)}
            />
          ) : (
            <SidebarSubmenu
              title={item.title}
              icon={item.icon}
              items={item.items}
              isActive={isActive}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SidebarNavigation;
