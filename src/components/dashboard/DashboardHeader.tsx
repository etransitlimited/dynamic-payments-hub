
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User, Search, LayoutDashboard } from "lucide-react";
import DashboardLanguageSwitcher from "@/components/dashboard/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface DashboardHeaderProps {
  className?: string;
}

const DashboardHeader = ({ className }: DashboardHeaderProps) => {
  const { t } = useSafeTranslation();
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "border-b border-purple-900/20 backdrop-blur-md bg-charcoal-light/70 p-4 shadow-sm flex items-center justify-between h-16 relative z-20",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-purple-400 hover:bg-purple-600/20 hover:text-purple-300" />
        <div className="hidden md:flex items-center">
          <LayoutDashboard size={18} className="text-purple-400 mr-2" />
          <h1 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">
            <TranslatedText keyName="dashboard.title" fallback="Dashboard" />
          </h1>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-purple-400" />
          <Input 
            type="search" 
            placeholder={t("dashboard.searchPlaceholder")}
            className="w-full bg-charcoal-dark/40 border-purple-900/20 text-white pl-9 focus:bg-charcoal-dark/60 transition-colors focus:border-purple-600/30 focus:ring-1 focus:ring-purple-500/30"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3 z-30">
        <DashboardLanguageSwitcher />
        <Button variant="ghost" size="icon" className="text-purple-200 hover:bg-purple-600/20 relative">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-neon-green rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon" className="text-purple-200 hover:bg-purple-600/20">
          <User size={20} />
        </Button>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
