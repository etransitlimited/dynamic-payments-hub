
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

interface NavigationTab {
  path: string;
  key: string;
  icon: React.ReactNode;
  value: string;
}

const TransactionNavigation: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const navRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(() => {
    const path = window.location.pathname;
    if (path.includes("/history")) return "history";
    if (path.includes("/wallet")) return "wallet";
    return "transactions";
  });
  
  // Use a fixed component key to prevent remounting
  const componentKey = useRef(`nav-${Math.random().toString(36).substring(2, 9)}`);
  
  // Update language ref without causing re-renders
  useEffect(() => {
    if (languageRef.current !== language) {
      languageRef.current = language as LanguageCode;
      
      // Force DOM update on language change
      updateNavigationText();
      
      // Update data attributes directly
      if (navRef.current) {
        navRef.current.setAttribute('data-language', language);
      }
    }
  }, [language]);
  
  // Get navigation tabs with proper translations
  const navigationTabs = useMemo(() => [
    {
      path: "/dashboard/transactions",
      key: "transactions",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
      value: getTransactionTranslation("title", languageRef.current)
    },
    {
      path: "/dashboard/transactions/history",
      key: "history",
      icon: <Calendar className="h-4 w-4 mr-2" />,
      value: getTransactionTranslation("history", languageRef.current)
    },
    {
      path: "/dashboard/wallet/funds",
      key: "wallet",
      icon: <Wallet className="h-4 w-4 mr-2" />,
      value: getTransactionTranslation("wallet", languageRef.current)
    }
  ], []);

  // Force DOM update for navigation text when language changes
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
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        updateNavigationText();
        
        // Update data-attributes directly
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

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const tab = navigationTabs.find(tab => tab.key === value);
    if (tab) {
      navigate(tab.path);
    }
  };
  
  // Ensure tab navigation is properly initialized on mount
  useEffect(() => {
    // Initialize navigation text
    updateNavigationText();
  }, [updateNavigationText]);

  return (
    <motion.div
      ref={navRef}
      key={componentKey.current}
      className="mb-6"
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
      >
        <TabsList className="grid grid-cols-3 bg-indigo-950/20 border border-indigo-800/30 p-1 rounded-lg">
          {navigationTabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
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
