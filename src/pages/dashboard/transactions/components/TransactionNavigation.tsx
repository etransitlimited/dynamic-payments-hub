import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BarChart3, Calendar, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getTransactionTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { safeNavigate } from "@/utils/authNavigationUtils";

interface NavigationTab {
  path: string;
  key: string;
  icon: React.ReactNode;
  value: string;
}

const TransactionNavigation: React.FC = () => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const navRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes("/history")) return "history";
    if (path.includes("/wallet")) return "wallet";
    return "transactions";
  });
  
  const componentKey = useRef(`nav-${Math.random().toString(36).substring(2, 9)}`);
  
  useEffect(() => {
    if (languageRef.current !== language) {
      languageRef.current = language as LanguageCode;
      
      updateNavigationText();
      
      if (navRef.current) {
        navRef.current.setAttribute('data-language', language);
      }
    }
  }, [language, refreshCounter]);
  
  const navigationTabs = useMemo(() => [
    {
      path: `/${language}/dashboard/transactions`,
      key: "title",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
      value: getTransactionTranslation("title", languageRef.current)
    },
    {
      path: `/${language}/dashboard/transactions/history`,
      key: "history",
      icon: <Calendar className="h-4 w-4 mr-2" />,
      value: getTransactionTranslation("history", languageRef.current)
    },
    {
      path: `/${language}/dashboard/wallet/funds`,
      key: "wallet",
      icon: <Wallet className="h-4 w-4 mr-2" />,
      value: getTransactionTranslation("wallet", languageRef.current)
    }
  ], [language, refreshCounter]);

  const updateNavigationText = useCallback(() => {
    const tabElements = document.querySelectorAll('[data-transaction-nav-item]');
    tabElements.forEach((element) => {
      const key = element.getAttribute('data-key');
      if (key) {
        const translation = getTransactionTranslation(key, languageRef.current);
        const textElement = element.querySelector('[data-translation-text]');
        if (textElement) {
          textElement.textContent = translation;
        }
      }
    });
  }, []);
  
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        updateNavigationText();
        
        if (navRef.current) {
          navRef.current.setAttribute('data-language', newLanguage);
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [updateNavigationText]);

  const handleTabChange = (value: string) => {
    if (value === activeTab || isNavigating) {
      return;
    }
    
    setIsNavigating(true);
    setActiveTab(value);
    
    const tab = navigationTabs.find(tab => tab.key === value);
    if (tab) {
      if (navRef.current) {
        navRef.current.classList.add('opacity-90');
      }
      
      safeNavigate(navigate, tab.path);
      
      setTimeout(() => {
        setIsNavigating(false);
        if (navRef.current) {
          navRef.current.classList.remove('opacity-90');
        }
      }, 300);
    }
  };
  
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/history")) {
      setActiveTab("history");
    } else if (path.includes("/wallet")) {
      setActiveTab("wallet");
    } else if (path.includes("/transactions")) {
      setActiveTab("title");
    }
    
    setIsNavigating(false);
  }, [location.pathname]);
  
  useEffect(() => {
    updateNavigationText();
  }, [updateNavigationText, refreshCounter]);

  return (
    <motion.div
      ref={navRef}
      key={componentKey.current}
      className={`mb-6 ${isNavigating ? 'pointer-events-none' : ''} transition-opacity duration-200`}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      data-language={languageRef.current}
    >
      <Tabs 
        ref={tabsRef as React.RefObject<HTMLDivElement>}
        defaultValue={activeTab} 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="w-full"
        data-refresh-key={refreshCounter}
      >
        <TabsList className="grid grid-cols-3 bg-indigo-950/20 border border-indigo-800/30 p-1 rounded-lg">
          {navigationTabs.map((tab) => (
            <TabsTrigger
              key={`${tab.key}-${refreshCounter}`}
              value={tab.key}
              className="flex items-center gap-1.5 data-[state=active]:bg-indigo-700/30 data-[state=active]:text-indigo-100 data-[state=active]:shadow-sm"
              data-transaction-nav-item
              data-key={tab.key === "transactions" ? "title" : tab.key}
            >
              {tab.icon}
              <span 
                className="text-xs sm:text-sm whitespace-nowrap"
                data-translation-text
              >
                {tab.value}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default React.memo(TransactionNavigation);
