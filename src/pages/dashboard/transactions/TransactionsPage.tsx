
import React, { useState, useEffect, useMemo, useCallback } from "react";
import TransactionPageBackground from "./components/TransactionPageBackground";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionChartsSection from "./components/TransactionChartsSection";
import TransactionSearch from "./components/TransactionSearch";
import { motion, AnimatePresence } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useToast } from "@/hooks/use-toast";

const TransactionsPage = () => {
  const { t, language } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState(language); // Track language for re-rendering
  const { toast } = useToast();
  
  // Update language state when it changes to force re-render
  useEffect(() => {
    if (language !== currentLanguage) {
      console.log(`Language changed from ${currentLanguage} to ${language}, triggering re-render`);
      setCurrentLanguage(language);
      
      // Force re-render of the entire page
      document.title = `${t("transactions.title")} | ${t("dashboard.dashboard")}`;
    }
  }, [language, currentLanguage, t]);
  
  // Define staggered animation for children
  const container = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  }), []);
  
  const handleFilterClick = useCallback(() => {
    toast({
      title: t("transactions.filterApplied"),
      description: t("transactions.filterDescription"),
      variant: "default"
    });
    console.log("Filter button clicked");
  }, [toast, t]);

  const handleDateFilterClick = useCallback(() => {
    toast({
      title: t("transactions.dateFilterApplied"),
      description: t("transactions.dateRangeSelected"),
      variant: "default"
    });
    console.log("Date filter button clicked");
  }, [toast, t]);
  
  // Update document title
  useEffect(() => {
    document.title = `${t("transactions.title")} | ${t("dashboard.dashboard")}`;
  }, [t, currentLanguage]);
  
  return (
    <div className="relative min-h-full">
      {/* Background elements */}
      <TransactionPageBackground />
      
      {/* Content with animation */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`transaction-page-${currentLanguage}-${Date.now()}`} // Enhanced key to force re-render
          className="relative z-10 px-1 sm:px-2"
          variants={container}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
          data-language={currentLanguage}
        >
          {/* Header */}
          <TransactionPageHeader />
          
          {/* Stat cards */}
          <TransactionStatCards />
          
          {/* Search and filters */}
          <div className="my-5 sm:my-6">
            <TransactionSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onFilterClick={handleFilterClick}
              onDateFilterClick={handleDateFilterClick}
            />
          </div>
          
          {/* Transaction table and charts */}
          <div className="space-y-5 sm:space-y-6">
            {/* Transaction table */}
            <div>
              <TransactionTableSection />
            </div>
            
            {/* Charts and analytics */}
            <div>
              <TransactionChartsSection />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TransactionsPage;
