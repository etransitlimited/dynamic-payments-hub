
import React, { useState, useEffect } from "react";
import PageTitle from "../merchant/components/PageTitle";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import TranslationWrapper from "@/components/translation/TranslationWrapper";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

// Import refactored components
import FundDetailsStats from "./components/FundDetailsStats";
import SearchSection from "./components/SearchSection";
import ExportButton from "./components/ExportButton";
import RecentTransactions from "./components/RecentTransactions";
import FundDetailsTable from "./components/FundDetailsTable";
import ViewAllLink from "./components/ViewAllLink";

const FundDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { t, language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Monitor language changes and trigger re-rendering
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`FundDetails language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language);
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
    document.title = t('wallet.fundDetails.title', 'Fund Details');
    console.log("Document title updated with language:", language);
  }, [t, language]);
  
  // Add debug logs in development
  useEffect(() => {
    console.log(`FundDetails rendering with language: ${language} and force key: ${forceUpdateKey}`);
  }, [language, forceUpdateKey]);
  
  return (
    <TranslationWrapper>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible" 
        className="container px-4 mx-auto py-6 space-y-6"
        key={`fund-details-${currentLanguage}-${forceUpdateKey}`} // Ensure re-rendering on language change
        data-language={currentLanguage}
      >
        <div className="w-full">
          <PageTitle title={<TranslatedText keyName="wallet.fundDetails.title" fallback="Fund Details" />} />
        </div>
        
        {/* Stats Row - now a separate component */}
        <FundDetailsStats />
        
        {/* Search Section - now a separate component */}
        <SearchSection 
          searchQuery={searchQuery}
          handleSearch={handleSearch}
        />
        
        {/* Quick Export Button - now a separate component */}
        <ExportButton />
        
        {/* Recent Transactions - now a separate component */}
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
        
        {/* View All Link - now a separate component */}
        <ViewAllLink />
      </motion.div>
    </TranslationWrapper>
  );
};

export default FundDetails;
