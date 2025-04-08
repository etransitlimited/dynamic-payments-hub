
import React, { useRef, useEffect, useMemo } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User, Search, LayoutDashboard } from "lucide-react";
import DashboardLanguageSwitcher from "@/components/dashboard/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { LanguageCode } from "@/utils/languageUtils";

interface DashboardHeaderProps {
  className?: string;
}

const DashboardHeader = ({ className }: DashboardHeaderProps) => {
  const { language } = useSafeTranslation();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const mountedRef = useRef(true);
  
  // Track mounted state to prevent memory leaks
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Update references when language changes
  useEffect(() => {
    if (language !== languageRef.current && mountedRef.current) {
      languageRef.current = language as LanguageCode;
      updateTextContent();
    }
  }, [language]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      if (!mountedRef.current) return;
      
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        updateTextContent();
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  // Update text content based on language
  const updateTextContent = () => {
    if (titleRef.current) {
      titleRef.current.textContent = getDashboardTitle();
    }
    
    if (searchRef.current) {
      searchRef.current.placeholder = getSearchPlaceholder();
    }
  };
  
  // Get dashboard title based on language
  const getDashboardTitle = () => {
    switch(languageRef.current) {
      case 'zh-CN': return "仪表板";
      case 'zh-TW': return "儀表板";
      case 'fr': return "Tableau de Bord";
      case 'es': return "Panel de Control";
      default: return "Dashboard";
    }
  };
  
  // Get search placeholder based on language
  const getSearchPlaceholder = () => {
    switch(languageRef.current) {
      case 'zh-CN': return "搜索...";
      case 'zh-TW': return "搜尋...";
      case 'fr': return "Rechercher...";
      case 'es': return "Buscar...";
      default: return "Search...";
    }
  };
  
  // Initialize text content on mount
  useEffect(() => {
    updateTextContent();
  }, []);
  
  // Stable animation configuration
  const animationConfig = useMemo(() => ({
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  }), []);
  
  return (
    <motion.header
      initial={animationConfig.initial}
      animate={animationConfig.animate}
      transition={animationConfig.transition}
      className={cn(
        "border-b border-purple-900/20 backdrop-blur-md bg-charcoal-light/70 p-4 shadow-sm flex items-center justify-between h-16 relative z-20",
        className
      )}
      data-language={languageRef.current}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-purple-400 hover:bg-purple-600/20 hover:text-purple-300" />
        <div className="hidden md:flex items-center">
          <LayoutDashboard size={18} className="text-purple-400 mr-2" />
          <h1
            ref={titleRef}
            className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300"
          >
            {getDashboardTitle()}
          </h1>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-purple-400" />
          <Input 
            ref={searchRef}
            type="search" 
            placeholder={getSearchPlaceholder()}
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

export default React.memo(DashboardHeader);
