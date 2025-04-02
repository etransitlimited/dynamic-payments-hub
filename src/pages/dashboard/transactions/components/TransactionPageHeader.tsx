
import React from "react";
import { Coins } from "lucide-react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const TransactionPageHeader = () => {
  const { language } = useSafeTranslation();
  
  // Adjust text size based on language
  const getTitleSize = () => {
    if (['fr', 'es'].includes(language)) {
      return "text-2xl sm:text-3xl";
    }
    return "text-3xl sm:text-4xl";
  };
  
  return (
    <motion.div 
      className="mb-6 lg:mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="mr-3 bg-purple-900/30 p-2 sm:p-3 rounded-lg border border-purple-500/20">
            <Coins className="h-6 w-6 sm:h-7 sm:w-7 text-purple-400" />
          </div>
          <div>
            <h1 className={`font-bold ${getTitleSize()} bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent`}>
              <TranslatedText keyName="transactions.title" fallback="Transactions" />
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-[600px] truncate">
              <TranslatedText 
                keyName="transactions.subtitle" 
                fallback="View and manage all transactions on the platform" 
                truncate 
                maxLines={1}
              />
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2 bg-charcoal-dark/50 backdrop-blur-md rounded-lg border border-purple-900/30 p-1.5 sm:p-2">
          <div className="px-3 py-1.5 bg-gradient-to-r from-purple-600/30 to-purple-700/30 border border-purple-500/30 rounded-md text-white text-sm">
            <TranslatedText 
              keyName="transactions.last24Hours" 
              fallback="Last 24 hours transactions" 
            />
          </div>
          <div className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors text-sm">
            <TranslatedText keyName="transactions.transactionAnalytics" fallback="Transaction data analysis and trends" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionPageHeader;
