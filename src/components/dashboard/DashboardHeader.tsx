
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  return (
    <header className="border-b border-slate-200 bg-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold hidden md:block">卡台管理系统</h1>
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <Button variant="ghost" size="icon" className="text-slate-600">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-600">
          <User size={20} />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
