
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarClose, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  BarChart3,
  CreditCard,
  History,
  Wallet,
  FileText,
  Upload,
  Download,
  Users,
  User,
  UserCog,
  Settings,
  HelpCircle,
  ChevronLeft,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    {
      title: "主页",
      icon: <Home size={18} />,
      path: "/dashboard",
    },
    {
      title: "数据分析",
      icon: <BarChart3 size={18} />,
      path: "/dashboard/analytics",
    },
    {
      title: "交易记录",
      icon: <History size={18} />,
      path: "/dashboard/transactions",
    },
    {
      title: "卡片管理",
      icon: <CreditCard size={18} />,
      children: [
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
      children: [
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
      children: [
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
      children: [
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
    <Sidebar className="border-r border-blue-900/50 bg-gradient-to-b from-[#061428] to-[#0a1e3a]">
      <SidebarHeader className="border-b border-blue-900/50 p-4">
        <div className="flex items-center">
          <img src="/lovable-uploads/47003b38-e99e-468a-a1da-52124948df0d.png" alt="Logo" className="h-8 w-auto" />
          <div className="ml-2 text-lg font-bold text-white">卡台管理系统</div>
        </div>
        <SidebarClose className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.children ? (
                <div className="mb-2">
                  <div className="flex items-center px-3 py-2 text-sm font-medium text-blue-300">
                    <span className="mr-2">{item.icon}</span>
                    {item.title}
                  </div>
                  <div className="ml-6 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <Link to={child.path} key={childIndex}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start pl-6 text-sm font-normal",
                            isActive(child.path)
                              ? "bg-blue-900/40 text-white hover:bg-blue-900/50"
                              : "text-blue-200 hover:bg-blue-900/20 hover:text-white"
                          )}
                        >
                          {child.title}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sm font-medium",
                      isActive(item.path)
                        ? "bg-blue-900/40 text-white hover:bg-blue-900/50"
                        : "text-blue-200 hover:bg-blue-900/20 hover:text-white"
                    )}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.title}
                  </Button>
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
        <Separator className="my-4 bg-blue-900/30" />
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-sm font-medium text-blue-200 hover:bg-blue-900/20 hover:text-white">
            <span className="mr-2">
              <Settings size={18} />
            </span>
            系统设置
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm font-medium text-blue-200 hover:bg-blue-900/20 hover:text-white">
            <span className="mr-2">
              <HelpCircle size={18} />
            </span>
            帮助中心
          </Button>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-blue-900/50 p-4">
        <Button variant="ghost" className="w-full justify-start text-sm font-medium text-blue-200 hover:bg-blue-900/20 hover:text-white">
          <span className="mr-2">
            <LogOut size={18} />
          </span>
          退出登录
        </Button>
        <div className="mt-4 text-center text-xs text-blue-200/60">卡台管理系统 v1.0.0</div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
