
import React, { useState, useEffect, useCallback } from "react";
import PageTitle from "../merchant/components/PageTitle";
import { motion } from "framer-motion";
import { LanguageCode } from "@/utils/languageUtils";
import { getFundDetailsTranslation } from "./i18n";

// Import refactored components
import FundDetailsStats from "./components/FundDetailsStats";
import SearchSection from "./components/SearchSection";
import ExportButton from "./components/ExportButton";
import RecentTransactions from "./components/RecentTransactions";
import FundDetailsTable from "./components/FundDetailsTable";
import ViewAllLink from "./components/ViewAllLink";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

const FundDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { language } = useLanguage();
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Function to get direct translations
  const getTranslation = useCallback((key: string): string => {
    return getFundDetailsTranslation(key, language as LanguageCode);
  }, [language]);
  
  // Notify language change for debugging
  useEffect(() => {
    console.log(`FundDetails language changed to: ${language}`);
    setForceUpdateKey(Date.now()); // Force update on language change
    
    // Silent notification for debugging
    if (process.env.NODE_ENV !== 'production') {
      toast.info(`Language changed to ${language}`, {
        duration: 2000,
        position: 'bottom-right'
      });
    }
  }, [language]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Additional search logic would go here
    console.log("Searching for:", query);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Example recent transactions data with explicit types
  const recentTransactions = [
    {
      id: "TRX-3924",
      type: "deposit" as "deposit",
      amount: "+$1,200.00",
      balance: "15,243.50",
      date: "2023-06-15 09:45:22",
      note: "Monthly investment"
    },
    {
      id: "TRX-3923",
      type: "expense" as "expense",
      amount: "-$350.75",
      balance: "14,043.50",
      date: "2023-06-14 15:22:10",
      note: "Software subscription"
    },
    {
      id: "TRX-3922",
      type: "transfer" as "transfer",
      amount: "-$2,500.00",
      balance: "14,394.25",
      date: "2023-06-12 11:30:15",
      note: "Transfer to savings account"
    }
  ];
  
  // Update document title with proper translation
  useEffect(() => {
    document.title = getTranslation('title');
    console.log("Document title updated:", document.title);
  }, [getTranslation]);
  
  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible" 
        className="container px-4 mx-auto py-6 space-y-6"
        key={`fund-details-${language}-${forceUpdateKey}`}
        data-language={language}
      >
        <div className="w-full">
          <PageTitle title={getTranslation('title')} />
        </div>
        
        {/* Stats Row */}
        <FundDetailsStats />
        
        {/* Search Section */}
        <SearchSection 
          searchQuery={searchQuery}
          handleSearch={handleSearch}
        />
        
        {/* Quick Export Button */}
        <ExportButton />
        
        {/* Recent Transactions */}
        <RecentTransactions transactions={recentTransactions} />
        
        {/* Main Transactions Table */}
        <motion.div variants={containerVariants}>
          <FundDetailsTable 
            transactions={recentTransactions} 
            onFilter={() => console.log("Filter clicked")}
            onExport={() => console.log("Export clicked")}
            onRefresh={() => {
              console.log("Refresh clicked");
              setForceUpdateKey(Date.now());
            }}
          />
        </motion.div>
        
        {/* View All Link */}
        <ViewAllLink />
      </motion.div>
    </div>
  );
};

export default FundDetails;
