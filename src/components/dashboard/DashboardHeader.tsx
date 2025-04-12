
import React, { useRef, useEffect, useMemo, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, User, Search, LayoutDashboard, LogOut } from "lucide-react";
import DashboardLanguageSwitcher from "@/components/dashboard/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";
import MessageDropdown from "@/modules/notification/components/MessageDropdown";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import TranslatedText from "@/components/translation/TranslatedText";
import { toast } from 'sonner';
import { useSafeTranslation } from "@/hooks/use-safe-translation"; // 添加这个导入

interface DashboardHeaderProps {
  className?: string;
}

const headerTranslations = {
  dashboard: {
    "en": "Dashboard",
    "fr": "Tableau de Bord",
    "es": "Panel de Control",
    "zh-CN": "仪表板",
    "zh-TW": "儀表板"
  },
  search: {
    "en": "Search...",
    "fr": "Rechercher...",
    "es": "Buscar...",
    "zh-CN": "搜索...",
    "zh-TW": "搜尋..."
  },
  account: {
    "en": "My Account",
    "fr": "Mon Compte",
    "es": "Mi Cuenta",
    "zh-CN": "我的账户",
    "zh-TW": "我的帳戶"
  },
  logout: {
    "en": "Logout",
    "fr": "Déconnexion",
    "es": "Cerrar Sesión",
    "zh-CN": "退出登录",
    "zh-TW": "退出登錄"
  }
};

const DashboardHeader = ({ className }: DashboardHeaderProps) => {
  const { t, language, refreshTranslations } = useSafeTranslation(); // 使用 useSafeTranslation 替换原来的 useLanguage
  const [forceUpdateKey, setForceUpdateKey] = useState(`header-${Date.now()}`);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const mountedRef = useRef(true);
  const headerRef = useRef<HTMLElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  useEffect(() => {
    if (language !== languageRef.current && mountedRef.current) {
      languageRef.current = language as LanguageCode;
      updateTextContent();
      
      if (headerRef.current) {
        headerRef.current.setAttribute('data-language', language);
      }
      
      // 强制刷新组件
      setForceUpdateKey(`header-${Date.now()}`);
    }
  }, [language]);
  
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      if (!mountedRef.current) return;
      
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        updateTextContent();
        
        if (headerRef.current) {
          headerRef.current.setAttribute('data-language', newLanguage);
        }
        
        // 强制刷新组件
        setForceUpdateKey(`header-${Date.now()}`);
        
        // 刷新翻译
        if (refreshTranslations) {
          refreshTranslations();
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [refreshTranslations]);
  
  const updateTextContent = () => {
    if (titleRef.current) {
      titleRef.current.textContent = getDashboardTitle();
    }
    
    if (searchRef.current) {
      searchRef.current.placeholder = getSearchPlaceholder();
    }
  };
  
  const getDashboardTitle = () => {
    return headerTranslations.dashboard[languageRef.current] || "Dashboard";
  };
  
  const getSearchPlaceholder = () => {
    return headerTranslations.search[languageRef.current] || "Search...";
  };

  const handleAccountClick = () => {
    navigate('/dashboard/merchant/account-info');
  };

  const handleLogout = () => {
    try {
      logout();
      navigate('/login', { replace: true });
      console.log('用户已成功退出登录');
    } catch (error) {
      console.error('退出登录时发生错误:', error);
      toast.error('退出登录失败，请重试', {
        duration: 3000,
      });
    }
  };
  
  useEffect(() => {
    updateTextContent();
  }, []);
  
  return (
    <header
      ref={headerRef}
      className={cn(
        "border-b border-purple-900/20 backdrop-blur-md bg-charcoal-light/70 p-4 shadow-sm flex items-center justify-between h-16 relative z-20",
        className
      )}
      data-language={languageRef.current}
      data-isolation-scope="header"
      key={forceUpdateKey} // 添加键，确保语言变化时重新渲染
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
        <MessageDropdown locale={language as LanguageCode} version="v1" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-purple-200 hover:bg-purple-600/20">
              <User size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="header_dropdown_menu_3a4f bg-charcoal-dark/90 border-purple-900/30 text-purple-100 p-1 w-48">
            <DropdownMenuItem 
              onClick={handleAccountClick}
              className="header_menu_item_account_7b2e flex items-center px-3 py-2 cursor-pointer hover:bg-purple-900/30"
            >
              <User size={16} className="mr-2 text-purple-400" />
              <span>
                {headerTranslations.account[languageRef.current] || headerTranslations.account["en"]}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="header_menu_separator_9c3d bg-purple-900/20 my-1" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="header_menu_item_logout_5d1f flex items-center px-3 py-2 cursor-pointer hover:bg-purple-900/30 text-red-300 hover:text-red-200"
            >
              <LogOut size={16} className="mr-2" />
              <span>
                {headerTranslations.logout[languageRef.current] || headerTranslations.logout["en"]}
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default React.memo(DashboardHeader);
