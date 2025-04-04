
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { LanguageCode } from "@/utils/languageUtils";
import { getFundDetailsTranslation } from "./i18n";
import { Wallet } from "lucide-react";
import PageLayout from "@/components/dashboard/PageLayout";

// Import refactored components
import FundDetailsStats from "./components/FundDetailsStats";
import SearchSection from "./components/SearchSection";
import ExportButton from "./components/ExportButton";
import RecentTransactions from "./components/RecentTransactions";
import FundDetailsTable from "./components/FundDetailsTable";
import ViewAllLink from "./components/ViewAllLink";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
  
  // Button to return to wallet dashboard
  const pageActions = (
    <Button
      variant="ghost"
      className="bg-purple-900/30 border border-purple-800/30 hover:bg-purple-800/50 text-white transition-all duration-300"
      onClick={() => navigate("/dashboard/wallet")}
    >
      <ArrowLeft size={16} className="mr-2" /> 
      <span>Back to Wallet</span>
    </Button>
  );
  
  return (
    <PageLayout 
      title={getTranslation('title')}
      subtitle={getTranslation('transactionDetails')}
      actions={pageActions}
      animationKey={`fund-details-${language}-${forceUpdateKey}`}
    >
      <motion.div
        key={forceUpdateKey}
        data-language={currentLanguage}
        className="space-y-6"
      >
        {/* Stats Row */}
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
        <FundDetailsTable 
          transactions={recentTransactions} 
          onFilter={() => console.log("Filter clicked")}
          onExport={() => console.log("Export clicked")}
          onRefresh={() => {
            console.log("Refresh clicked");
            setForceUpdateKey(`fund-details-refresh-${language}-${Date.now()}`);
          }}
        />
        
        {/* View All Link */}
        <ViewAllLink />
      </motion.div>
    </PageLayout>
  );
};

export default FundDetails;
