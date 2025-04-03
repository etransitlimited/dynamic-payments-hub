
import React, { useState, useEffect, useMemo } from "react";
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
  const [pageLanguage, setPageLanguage] = useState(language); // Track language for re-renders
  const { toast } = useToast();
  
  // Stagger animation for child elements with optimized timing
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
  
  const handleFilterClick = () => {
    toast({
      title: t("transactions.filterApplied"),
      description: t("transactions.filterDescription"),
      variant: "default"
    });
    console.log("Filter button clicked");
  };

  const handleDateFilterClick = () => {
    toast({
      title: t("transactions.dateFilterApplied"),
      description: t("transactions.dateRangeSelected"),
      variant: "default"
    });
    console.log("Date filter button clicked");
  };
  
  // Update document title and track language changes
  useEffect(() => {
    document.title = `${t("transactions.title")} | ${t("dashboard.dashboard")}`;
    
    // Only trigger re-render when language changes
    if (language !== pageLanguage) {
      setPageLanguage(language);
    }
  }, [language, t, pageLanguage]);
  
  return (
    <div className="relative min-h-full">
      {/* Enhanced Background elements */}
      <TransactionPageBackground />
      
      {/* Content with improved animations */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`transaction-page-${pageLanguage}`}
          className="relative z-10 px-1 sm:px-2"
          variants={container}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
        >
          {/* Header with improved translation */}
          <TransactionPageHeader />
          
          {/* Stats Cards with improved visualization */}
          <TransactionStatCards />
          
          {/* Search and Filters with proper language support */}
          <div className="my-5 sm:my-6">
            <TransactionSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onFilterClick={handleFilterClick}
              onDateFilterClick={handleDateFilterClick}
            />
          </div>
          
          {/* Changed layout - Transaction Table now takes full width */}
          <div className="space-y-5 sm:space-y-6">
            {/* Transaction Table with improved styling */}
            <div>
              <TransactionTableSection />
            </div>
            
            {/* Charts and Analytics moved below */}
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
