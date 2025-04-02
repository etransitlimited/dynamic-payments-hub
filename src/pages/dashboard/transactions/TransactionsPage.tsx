
import React, { useState } from "react";
import TransactionPageBackground from "./components/TransactionPageBackground";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionChartsSection from "./components/TransactionChartsSection";
import TransactionSearch from "./components/TransactionSearch";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const TransactionsPage = () => {
  const { language } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Stagger animation for child elements
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const handleFilterClick = () => {
    console.log("Filter button clicked");
  };

  const handleDateFilterClick = () => {
    console.log("Date filter button clicked");
  };
  
  return (
    <div className="relative min-h-full">
      {/* Background elements */}
      <TransactionPageBackground />
      
      {/* Content */}
      <motion.div 
        className="relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header */}
        <TransactionPageHeader />
        
        {/* Stats Cards */}
        <TransactionStatCards />
        
        {/* Search and Filters */}
        <div className="my-6">
          <TransactionSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onFilterClick={handleFilterClick}
            onDateFilterClick={handleDateFilterClick}
          />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Transaction Table */}
          <div className="lg:col-span-2">
            <TransactionTableSection />
          </div>
          
          {/* Charts and Analytics */}
          <div className="lg:col-span-1">
            <TransactionChartsSection />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionsPage;
