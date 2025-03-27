
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Settings, HelpCircle, LogOut } from "lucide-react";
import SidebarFooterItem from "./SidebarFooterItem";

const SidebarFooter: React.FC = () => {
  return (
    <>
      <Separator className="my-4 bg-blue-900/30" />
      <div className="space-y-1">
        <SidebarFooterItem 
          icon={<Settings size={18} />}
          title="系统设置"
        />
        <SidebarFooterItem 
          icon={<HelpCircle size={18} />}
          title="帮助中心"
        />
      </div>
      <Separator className="my-4 bg-blue-900/30" />
      <SidebarFooterItem 
        icon={<LogOut size={18} />}
        title="退出登录"
      />
      <div className="mt-4 text-center text-xs text-blue-200/60">卡台管理系统 v1.0.0</div>
    </>
  );
};

export default SidebarFooter;
