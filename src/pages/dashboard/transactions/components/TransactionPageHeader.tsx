
import React from "react";
import { Coins } from "lucide-react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const TransactionPageHeader = () => {
  const { language } = useSafeTranslation();
  
  // Adjust text size based on language with improved handling
  const getTitleSize = () => {
    if (['fr', 'es'].includes(language)) {
      return "text-xl sm:text-2xl md:text-3xl";
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return "text-2xl sm:text-3xl md:text-4xl";
    }
    return "text-2xl sm:text-3xl md:text-4xl";
  };
  
  // Adjust subtitle max width and size based on language
  const getSubtitleStyle = () => {
    const baseStyle = "text-gray-400";
    
    if (['fr', 'es'].includes(language)) {
      return `${baseStyle} text-xs sm:text-sm max-w-full sm:max-w-[650px] md:max-w-[750px]`;
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return `${baseStyle} text-xs sm:text-sm max-w-full sm:max-w-[450px] md:max-w-[550px]`;
    }
    return `${baseStyle} text-xs sm:text-sm max-w-full sm:max-w-[550px] md:max-w-[650px]`;
  };
  
  // Improved tab sizes based on language with smaller text for languages with longer words
  const getTabSize = () => {
    if (['fr', 'es'].includes(language)) {
      return "text-[9px] xs:text-[10px] sm:text-xs md:text-sm whitespace-nowrap";
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return "text-xs sm:text-sm";
    }
    return "text-xs sm:text-sm";
  };
  
  // Adjust tab padding based on language
  const getTabPadding = () => {
    if (['fr', 'es'].includes(language)) {
      return "px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5";
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return "px-2 sm:px-3 py-1 sm:py-1.5";
    }
    return "px-3 sm:px-4 py-1 sm:py-1.5";
  };
  
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
              <TranslatedText keyName="transactions.title" fallback="Transactions" />
            </h1>
            <p className={getSubtitleStyle()}>
              <TranslatedText 
                keyName="transactions.subtitle" 
                fallback="View and manage all transactions on the platform" 
                truncate
                maxLines={2}
              />
            </p>
          </div>
        </div>
        
        <div className="flex space-x-1 sm:space-x-2 bg-charcoal-dark/50 backdrop-blur-md rounded-lg border border-purple-900/30 p-1 sm:p-1.5 overflow-hidden">
          <div className={`${getTabPadding()} bg-gradient-to-r from-purple-600/30 to-purple-700/30 border border-purple-500/30 rounded-md text-white ${getTabSize()} flex items-center justify-center`}>
            <TranslatedText 
              keyName="transactions.last24Hours" 
              fallback="Last 24 hours transactions"
              truncate
              maxLines={1}
            />
          </div>
          <div className={`${getTabPadding()} text-gray-400 hover:text-white transition-colors ${getTabSize()} flex items-center justify-center`}>
            <TranslatedText 
              keyName="transactions.transactionAnalytics" 
              fallback="Transaction data analysis and trends" 
              truncate
              maxLines={1}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionPageHeader;
