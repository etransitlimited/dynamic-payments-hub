
import React, { useCallback, useRef, useEffect } from "react";
import { Coins } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getTransactionTranslation } from "../i18n";
import { useNavigate, useLocation } from "react-router-dom";
import { LanguageCode } from "@/utils/languageUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const TransactionPageHeader = () => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const navigate = useNavigate();
  const location = useLocation();
  const isHistoryPage = location.pathname.includes('/history');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lastTabBtn = useRef<HTMLButtonElement>(null);
  const transactionsTabBtn = useRef<HTMLButtonElement>(null);
  const componentKey = useRef(`transaction-header-${Math.random().toString(36).substring(2, 9)}`);
  
  // Update DOM elements with translations directly
  const updateTranslations = useCallback(() => {
    if (titleRef.current) {
      titleRef.current.textContent = getTransactionTranslation("pageTitle", languageRef.current);
    }
    
    if (subtitleRef.current) {
      subtitleRef.current.textContent = getTransactionTranslation("pageSubtitle", languageRef.current);
    }
    
    if (lastTabBtn.current) {
      lastTabBtn.current.textContent = getTransactionTranslation("last24Hours", languageRef.current);
    }
    
    if (transactionsTabBtn.current) {
      transactionsTabBtn.current.textContent = getTransactionTranslation("transactionList", languageRef.current);
    }
  }, []);
  
  // Update reference when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      updateTranslations();
    }
  }, [language, updateTranslations, refreshCounter]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage;
        updateTranslations();
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    // Initialize translations on mount
    updateTranslations();
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [updateTranslations]);
  
  // Further improved title size based on language
  const getTitleSize = useCallback(() => {
    if (languageRef.current === 'fr') {
      return "text-xl sm:text-2xl md:text-3xl"; // French often has longer words
    } else if (languageRef.current === 'es') {
      return "text-xl sm:text-2xl md:text-3xl"; // Spanish may have longer words too
    } else if (['zh-CN', 'zh-TW'].includes(languageRef.current)) {
      return "text-2xl sm:text-3xl md:text-4xl"; // Chinese characters often take less space
    }
    return "text-2xl sm:text-3xl md:text-4xl"; // Default for English
  }, []);
  
  // Enhanced subtitle styling based on language
  const getSubtitleStyle = useCallback(() => {
    const baseStyle = "text-gray-400";
    
    if (languageRef.current === 'fr') {
      return `${baseStyle} text-xs sm:text-sm max-w-full sm:max-w-[700px] md:max-w-[800px]`; // French needs more width
    } else if (languageRef.current === 'es') {
      return `${baseStyle} text-xs sm:text-sm max-w-full sm:max-w-[650px] md:max-w-[750px]`; // Spanish needs moderate width
    } else if (['zh-CN', 'zh-TW'].includes(languageRef.current)) {
      return `${baseStyle} text-xs sm:text-sm max-w-full sm:max-w-[450px] md:max-w-[550px]`; // Chinese takes less space
    }
    return `${baseStyle} text-xs sm:text-sm max-w-full sm:max-w-[550px] md:max-w-[650px]`; // Default for English
  }, []);

  const handleTabClick = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);
  
  return (
    <motion.div 
      key={`${componentKey.current}-${refreshCounter}`}
      className="mb-6 lg:mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      data-language={languageRef.current}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="mr-2 sm:mr-3 bg-purple-900/30 p-2 rounded-lg border border-purple-500/20">
            <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
          </div>
          <div>
            <h1 
              ref={titleRef}
              className={`font-bold ${getTitleSize()} bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent`}
            >
              {getTransactionTranslation("pageTitle", languageRef.current)}
            </h1>
            <p 
              ref={subtitleRef}
              className={getSubtitleStyle()}
            >
              {getTransactionTranslation("pageSubtitle", languageRef.current)}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-1 sm:space-x-2 bg-charcoal-dark/50 backdrop-blur-md rounded-lg border border-purple-900/30 p-1 sm:p-1.5 overflow-hidden">
          <button 
            ref={lastTabBtn}
            onClick={() => handleTabClick("/dashboard/transactions")}
            className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm flex items-center justify-center transition-colors ${!isHistoryPage 
              ? "bg-gradient-to-r from-purple-600/30 to-purple-700/30 border border-purple-500/30 text-white" 
              : "text-gray-400 hover:text-white"}`}
            data-test-id="last24-tab"
          >
            {getTransactionTranslation("last24Hours", languageRef.current)}
          </button>
          <button 
            ref={transactionsTabBtn}
            onClick={() => handleTabClick("/dashboard/transactions/history")}
            className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm flex items-center justify-center transition-colors ${isHistoryPage 
              ? "bg-gradient-to-r from-purple-600/30 to-purple-700/30 border border-purple-500/30 text-white" 
              : "text-gray-400 hover:text-white"}`}
            data-test-id="transactions-tab"
          >
            {getTransactionTranslation("transactionList", languageRef.current)}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(TransactionPageHeader);
