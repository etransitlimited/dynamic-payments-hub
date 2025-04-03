
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { LanguageCode } from "@/utils/languageUtils";
import { getFundDetailsTranslation } from "./i18n";
import { Wallet } from "lucide-react";

// Import refactored components
import FundDetailsStats from "./components/FundDetailsStats";
import SearchSection from "./components/SearchSection";
import ExportButton from "./components/ExportButton";
import RecentTransactions from "./components/RecentTransactions";
import FundDetailsTable from "./components/FundDetailsTable";
import ViewAllLink from "./components/ViewAllLink";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

// Updated Transaction interface to match what TransactionRow expects
export interface Transaction {
  id: string;
  type: string;
  amount: number;
  balance: number;
  timestamp: string;
  note?: string;
}

const FundDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { language } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState(`fund-details-${language}-${Date.now()}`);
  
  // Function to get direct translations
  const getTranslation = useCallback((key: string): string => {
    return getFundDetailsTranslation(key, currentLanguage);
  }, [currentLanguage]);
  
  // Monitor language changes
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`FundDetails language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language as LanguageCode);
      setForceUpdateKey(`fund-details-${language}-${Date.now()}`); // Force update on language change
      
      // Silent notification for debugging
      if (process.env.NODE_ENV !== 'production') {
        toast.info(`Language changed to ${language}`, {
          duration: 2000,
          position: 'bottom-right'
        });
      }
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

  // Example recent transactions data with updated typing
  const recentTransactions: Transaction[] = [
    {
      id: "TRX-3924",
      type: "Deposit",
      amount: 1200.00,
      balance: 15243.50,
      timestamp: "2023-06-15 09:45:22",
      note: "Monthly investment"
    },
    {
      id: "TRX-3923",
      type: "Expense",
      amount: -350.75,
      balance: 14043.50,
      timestamp: "2023-06-14 15:22:10",
      note: "Software subscription"
    },
    {
      id: "TRX-3922",
      type: "Transfer",
      amount: -2500.00,
      balance: 14394.25,
      timestamp: "2023-06-12 11:30:15",
      note: "Transfer to savings account"
    }
  ];

  // Calculate stats for FundDetailsStats
  const totalTransactions = recentTransactions.length;
  const totalAmount = recentTransactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  const averageAmount = totalTransactions > 0 ? totalAmount / totalTransactions : 0;
  
  // Debug logs
  console.log("FundDetails rendering with language:", language);
  console.log("Stats being passed:", { totalTransactions, totalAmount, averageAmount });
  
  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible" 
        className="container px-4 mx-auto py-6 space-y-6"
        key={forceUpdateKey}
        data-language={currentLanguage}
      >
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-purple-400"><Wallet size={24} /></span>
            {getTranslation('title')}
          </h1>
        </div>
        
        {/* Stats Row - Now with proper props */}
        <FundDetailsStats 
          totalTransactions={totalTransactions}
          totalAmount={totalAmount}
          averageAmount={averageAmount}
          isLoading={false}
        />
        
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
              setForceUpdateKey(`fund-details-refresh-${language}-${Date.now()}`);
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
