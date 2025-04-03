
import React, { useState, useEffect } from "react";
import PageTitle from "../merchant/components/PageTitle";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getFundDetailsTranslation } from "./i18n";
import { LanguageCode } from "@/utils/languageUtils";

// Import refactored components
import FundDetailsStats from "./components/FundDetailsStats";
import SearchSection from "./components/SearchSection";
import ExportButton from "./components/ExportButton";
import RecentTransactions from "./components/RecentTransactions";
import FundDetailsTable from "./components/FundDetailsTable";
import ViewAllLink from "./components/ViewAllLink";

const FundDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Function to get direct translations
  const getTranslation = (key: string): string => {
    return getFundDetailsTranslation(key, currentLanguage);
  };
  
  // Monitor language changes and trigger re-rendering
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`FundDetails language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language as LanguageCode);
      setForceUpdateKey(Date.now()); // Force update on language change
    }
  }, [language, currentLanguage]);
  
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
      type: "Deposit" as "Deposit",
      amount: "+$1,200.00",
      balance: "15,243.50",
      date: "2023-06-15 09:45:22",
      note: "Monthly investment"
    },
    {
      id: "TRX-3923",
      type: "Expense" as "Expense",
      amount: "-$350.75",
      balance: "14,043.50",
      date: "2023-06-14 15:22:10",
      note: "Software subscription"
    },
    {
      id: "TRX-3922",
      type: "Transfer" as "Transfer",
      amount: "-$2,500.00",
      balance: "14,394.25",
      date: "2023-06-12 11:30:15",
      note: "Transfer to savings account"
    }
  ];
  
  // Update document title with proper translation
  useEffect(() => {
    document.title = getTranslation('title');
    console.log("Document title updated with language:", currentLanguage);
  }, [currentLanguage]);
  
  // Add debug logs in development
  useEffect(() => {
    console.log(`FundDetails rendering with language: ${currentLanguage} and force key: ${forceUpdateKey}`);
  }, [currentLanguage, forceUpdateKey]);
  
  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible" 
        className="container px-4 mx-auto py-6 space-y-6"
        key={`fund-details-${currentLanguage}-${forceUpdateKey}`}
        data-language={currentLanguage}
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
