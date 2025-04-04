
import React, { useCallback } from "react";
import { Coins } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getTransactionTranslation } from "../i18n";
import TransactionNavigation from "./TransactionNavigation";

const TransactionPageHeader = () => {
  const { language } = useSafeTranslation();
  
  // Further improved title size based on language
  const getTitleSize = useCallback(() => {
    if (language === 'fr') {
      return "text-xl sm:text-2xl md:text-3xl"; // French often has longer words
    } else if (language === 'es') {
      return "text-xl sm:text-2xl md:text-3xl"; // Spanish may have longer words too
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return "text-2xl sm:text-3xl md:text-4xl"; // Chinese characters often take less space
    }
    return "text-2xl sm:text-3xl md:text-4xl"; // Default for English
  }, [language]);
  
  // Enhanced subtitle styling based on language
  const getSubtitleStyle = useCallback(() => {
    const baseStyle = "text-gray-400";
    
    if (language === 'fr') {
      return `${baseStyle} text-xs sm:text-sm max-w-full sm:max-w-[700px] md:max-w-[800px]`; // French needs more width
    } else if (language === 'es') {
      return `${baseStyle} text-xs sm:text-sm max-w-full sm:max-w-[650px] md:max-w-[750px]`; // Spanish needs moderate width
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return `${baseStyle} text-xs sm:text-sm max-w-full sm:max-w-[450px] md:max-w-[550px]`; // Chinese takes less space
    }
    return `${baseStyle} text-xs sm:text-sm max-w-full sm:max-w-[550px] md:max-w-[650px]`; // Default for English
  }, [language]);
  
  // Better tab text sizing based on language
  const getTabSize = useCallback(() => {
    if (language === 'fr') {
      return "text-[8px] xs:text-[9px] sm:text-xs md:text-sm whitespace-nowrap"; // French needs smaller text
    } else if (language === 'es') {
      return "text-[9px] xs:text-[10px] sm:text-xs md:text-sm whitespace-nowrap"; // Spanish needs slightly smaller text
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return "text-xs sm:text-sm"; // Chinese can be normal size
    }
    return "text-xs sm:text-sm"; // Default for English
  }, [language]);
  
  // Enhanced tab padding based on language
  const getTabPadding = useCallback(() => {
    if (language === 'fr') {
      return "px-1 sm:px-1.5 md:px-2.5 py-1 sm:py-1.5"; // French needs tighter padding
    } else if (language === 'es') {
      return "px-1.5 sm:px-2 md:px-2.5 py-1 sm:py-1.5"; // Spanish needs moderate padding
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return "px-2.5 sm:px-3.5 py-1 sm:py-1.5"; // Chinese can have more padding (shorter text)
    }
    return "px-3 sm:px-4 py-1 sm:py-1.5"; // Default for English
  }, [language]);
  
  return (
    <motion.div 
      className="mb-6 lg:mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="mr-2 sm:mr-3 bg-purple-900/30 p-2 rounded-lg border border-purple-500/20">
            <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
          </div>
          <div>
            <h1 className={`font-bold ${getTitleSize()} bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent`}>
              {getTransactionTranslation("pageTitle", language)}
            </h1>
            <p className={getSubtitleStyle()}>
              {getTransactionTranslation("pageSubtitle", language)}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-1 sm:space-x-2 bg-charcoal-dark/50 backdrop-blur-md rounded-lg border border-purple-900/30 p-1 sm:p-1.5 overflow-hidden">
          <div className={`${getTabPadding()} bg-gradient-to-r from-purple-600/30 to-purple-700/30 border border-purple-500/30 rounded-md text-white ${getTabSize()} flex items-center justify-center`}>
            {getTransactionTranslation("last24Hours", language)}
          </div>
          <div className={`${getTabPadding()} text-gray-400 hover:text-white transition-colors ${getTabSize()} flex items-center justify-center`}>
            {getTransactionTranslation("transactionList", language)}
          </div>
        </div>
      </div>
      
      {/* New navigation tabs with better design */}
      <div className="mt-6">
        <TransactionNavigation />
      </div>
    </motion.div>
  );
};

export default TransactionPageHeader;
