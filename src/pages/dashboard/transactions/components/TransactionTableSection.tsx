
import React, { memo, useMemo, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import TransactionTable from "./TransactionTable";
import { getTransactionTranslation } from "../i18n";
import { useNavigate } from "react-router-dom";
import { LanguageCode } from "@/utils/languageUtils";
import { useLanguage } from "@/context/LanguageContext";

interface TransactionTableSectionProps {
  filterMode?: "last24Hours" | "allTransactions";
}

const TransactionTableSection: React.FC<TransactionTableSectionProps> = ({ 
  filterMode = "allTransactions" 
}) => {
  const { language } = useLanguage();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const { refreshCounter } = useSafeTranslation();
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const viewAllRef = useRef<HTMLSpanElement>(null);
  const [uniqueKey, setUniqueKey] = React.useState(`table-section-${language}-${filterMode}-${Date.now()}`);
  
  // Force refresh when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`TransactionTableSection language updated to: ${language}`);
      languageRef.current = language as LanguageCode;
      setUniqueKey(`table-section-${language}-${filterMode}-${Date.now()}-${refreshCounter}`);
      
      // Update translations directly
      updateTranslations();
    }
  }, [language, refreshCounter, filterMode]);
  
  // Update translations directly in the DOM
  const updateTranslations = () => {
    const transactionListKey = filterMode === "last24Hours" ? "last24Hours" : "transactionList";
    const allTransactionsKey = filterMode === "last24Hours" ? "last24Hours" : "allTransactions";
    const viewAllKey = "viewAll";
    
    const titleText = getTransactionTranslation(transactionListKey, languageRef.current);
    const subtitleText = getTransactionTranslation(allTransactionsKey, languageRef.current);
    const viewAllText = getTransactionTranslation(viewAllKey, languageRef.current);
    
    if (titleRef.current) titleRef.current.textContent = titleText;
    if (subtitleRef.current) subtitleRef.current.textContent = subtitleText;
    if (viewAllRef.current) viewAllRef.current.textContent = viewAllText;
  };
  
  // Set up translation event listeners
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail && e.detail.language && e.detail.language !== languageRef.current) {
        languageRef.current = e.detail.language as LanguageCode;
        setUniqueKey(`table-section-${e.detail.language}-${filterMode}-${Date.now()}`);
        
        // Update translations immediately when language changes
        updateTranslations();
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    // Initialize translations
    updateTranslations();
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, [filterMode]);
  
  const handleViewAllClick = () => {
    if (filterMode === "last24Hours") {
      navigate("/dashboard/transactions/history");
    }
  };
  
  return (
    <Card 
      key={uniqueKey}
      className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative rounded-xl h-full"
      data-language={languageRef.current}
    >
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
      <CardContent className="p-3 sm:p-4 md:p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-purple-500 rounded-sm mr-2 sm:mr-3"></span>
            <h2 
              ref={titleRef}
              className="text-lg sm:text-xl font-semibold text-white"
            >
              {getTransactionTranslation(
                filterMode === "last24Hours" ? "last24Hours" : "transactionList", 
                languageRef.current
              )}
            </h2>
          </div>
          {filterMode === "last24Hours" && (
            <motion.button 
              whileHover={{ x: 5 }}
              className="text-purple-400 hover:text-neon-green flex items-center text-xs sm:text-sm transition-colors"
              onClick={handleViewAllClick}
            >
              <span ref={viewAllRef}>
                {getTransactionTranslation("viewAll", languageRef.current)}
              </span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </motion.button>
          )}
        </div>
        <p 
          ref={subtitleRef}
          className="text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm"
        >
          {getTransactionTranslation(
            filterMode === "last24Hours" ? "last24Hours" : "allTransactions", 
            languageRef.current
          )}
        </p>
        <TransactionTable filterMode={filterMode} key={`table-content-${languageRef.current}-${refreshCounter}`} />
      </CardContent>
    </Card>
  );
};

export default memo(TransactionTableSection);
