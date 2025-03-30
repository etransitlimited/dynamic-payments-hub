
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User, LayoutDashboard } from "lucide-react";
import DashboardLanguageSwitcher from "@/components/dashboard/LanguageSwitcher";
import ThemeSwitch from "@/components/dashboard/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface DashboardHeaderProps {
  className?: string;
}

const DashboardHeader = ({ className }: DashboardHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <header 
      className={cn(
        "border-b dark:border-blue-900/50 border-gray-200 dark:bg-[#061428]/70 bg-white/90 backdrop-blur-sm p-4 shadow-sm flex items-center justify-between h-16 relative z-20",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <div className="hidden md:flex items-center">
          <LayoutDashboard size={18} className="dark:text-blue-400 text-blue-600 mr-2" />
          <h1 className="text-xl font-semibold dark:text-white text-gray-900">{t("dashboard.title")}</h1>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-4 justify-center">
        <ThemeSwitch />
      </div>
      
      <div className="flex items-center gap-3 z-30">
        <DashboardLanguageSwitcher />
        <Button variant="ghost" size="icon" className="dark:text-blue-200 text-blue-600 dark:hover:bg-blue-900/40 hover:bg-blue-100 relative">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon" className="dark:text-blue-200 text-blue-600 dark:hover:bg-blue-900/40 hover:bg-blue-100">
          <User size={20} />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
