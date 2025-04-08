
import React, { memo, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getTransactionTranslation } from "../i18n";
import { useNavigate } from "react-router-dom";
import TransactionTypeChart from "./TransactionTypeChart";
import TransactionCharts from "./TransactionCharts";
import { LanguageCode } from "@/utils/languageUtils";

const TransactionChartsSection = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const navigate = useNavigate();
  const currentLanguage = language as LanguageCode;
  
  // Use memoized translations to prevent re-renders
  const translations = useMemo(() => ({
    title: getTransactionTranslation("transactionStatistics", currentLanguage),
    subtitle: getTransactionTranslation("transactionAnalytics", currentLanguage),
    viewAll: getTransactionTranslation("viewAll", currentLanguage),
    viewDetails: getTransactionTranslation("viewDetails", currentLanguage) || getTransactionTranslation("viewAll", currentLanguage),
    transactionsByType: getTransactionTranslation("transactionsByType", currentLanguage),
    systemLoad: getTransactionTranslation("systemLoad", currentLanguage)
  }), [currentLanguage]);
  
  const handleViewDetailsClick = () => {
    navigate("/dashboard/analytics");
  };
  
  // Create a stable key that changes only when language or refreshCounter changes
  const uniqueKey = useMemo(() => 
    `transaction-charts-${currentLanguage}-${refreshCounter}`, 
    [currentLanguage, refreshCounter]
  );
  
  return (
    <Card 
      key={uniqueKey}
      className="border-blue-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative rounded-xl"
      data-language={currentLanguage}
    >
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
      <CardContent className="p-4 md:p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-blue-500 rounded-sm mr-2 sm:mr-3"></span>
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              {translations.title}
            </h2>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="text-blue-400 hover:text-neon-green flex items-center text-xs sm:text-sm transition-colors"
            onClick={handleViewDetailsClick}
          >
            {translations.viewDetails}
            <ChevronRight className="h-4 w-4 ml-1" />
          </motion.button>
        </div>
        <p className="text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm">
          {translations.subtitle}
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-blue-950/30 rounded-lg p-3 sm:p-4 border border-blue-900/40">
            <h3 className="text-sm text-blue-200 font-medium mb-4">
              {translations.transactionsByType}
            </h3>
            <div className="h-56 sm:h-64">
              <TransactionTypeChart key={`chart-type-${currentLanguage}-${refreshCounter}`} />
            </div>
          </div>
          <div className="bg-blue-950/30 rounded-lg p-3 sm:p-4 border border-blue-900/40">
            <h3 className="text-sm text-blue-200 font-medium mb-4">
              {translations.systemLoad}
            </h3>
            <div className="h-56 sm:h-64">
              <TransactionCharts key={`chart-load-${currentLanguage}-${refreshCounter}`} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(TransactionChartsSection);
