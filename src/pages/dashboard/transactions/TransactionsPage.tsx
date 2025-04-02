
import React, { useState, useEffect } from "react";
import TransactionPageBackground from "./components/TransactionPageBackground";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionChartsSection from "./components/TransactionChartsSection";
import TransactionSearch from "./components/TransactionSearch";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useToast } from "@/hooks/use-toast";

const TransactionsPage = () => {
  const { t, language } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Stagger animation for child elements with optimized timing
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };
  
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
  
  // Set document title based on current language
  useEffect(() => {
    document.title = `${t("transactions.title")} | ${t("dashboard.dashboard")}`;
  }, [language, t]);
  
  return (
    <div className="relative min-h-full">
      {/* Enhanced Background elements */}
      <TransactionPageBackground />
      
      {/* Content with improved animations */}
      <motion.div 
        className="relative z-10 px-1 sm:px-2"
        variants={container}
        initial="hidden"
        animate="show"
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
        
        {/* Main Content Grid with responsive layout */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3">
          {/* Transaction Table with improved styling */}
          <div className="lg:col-span-2">
            <TransactionTableSection />
          </div>
          
          {/* Charts and Analytics with glow effects */}
          <div className="lg:col-span-1">
            <TransactionChartsSection />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionsPage;
