import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { LanguageCode } from "@/utils/languageUtils";
import { getFundDetailsTranslation } from "./i18n";
import PageLayout from "@/components/dashboard/PageLayout";
import { useToast } from "@/components/ui/use-toast";

// Import refactored components
import FundDetailsStats from "./components/FundDetailsStats";
import SearchSection from "./components/SearchSection";
import RecentTransactions from "./components/RecentTransactions";
import FundDetailsTable from "./components/FundDetailsTable";
import ViewAllLink from "./components/ViewAllLink";
import TransactionTypeFilter from "./components/TransactionTypeFilter";
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

export type TransactionType = 'all' | 'deposit' | 'expense' | 'transfer' | 'withdrawal';

export { Transaction };

const FundDetails = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<TransactionType>('all');
  const { language } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState(`fund-details-${language}-${Date.now()}`);
  const { toast: uiToast } = useToast();
  
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

  // Example transaction data with merged expense/payment type
  const allTransactions: Transaction[] = [
    {
      id: "TRX-3924",
      type: "deposit",
      amount: 1200.00,
      balance: 15243.50,
      timestamp: "2023-06-15 09:45:22",
      note: "Monthly investment"
    },
    {
      id: "TRX-3923",
      type: "expense",
      amount: -350.75,
      balance: 14043.50,
      timestamp: "2023-06-14 15:22:10",
      note: "Software subscription"
    },
    {
      id: "TRX-3922",
      type: "transfer",
      amount: -2500.00,
      balance: 14394.25,
      timestamp: "2023-06-12 11:30:15",
      note: "Transfer to savings account"
    },
    {
      id: "TRX-3921",
      type: "withdrawal",
      amount: -1000.00,
      balance: 16894.25,
      timestamp: "2023-06-10 16:45:30",
      note: "ATM withdrawal"
    },
    {
      id: "TRX-3920",
      type: "expense",
      amount: -750.50,
      balance: 17894.25,
      timestamp: "2023-06-08 13:20:45",
      note: "Online purchase"
    },
    {
      id: "TRX-3919",
      type: "deposit",
      amount: 5000.00,
      balance: 18644.75,
      timestamp: "2023-06-05 10:15:00",
      note: "Salary deposit"
    }
  ];
  
  // Filter transactions based on type and search query
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(transaction => {
      // Filter by transaction type
      if (selectedType !== 'all' && transaction.type !== selectedType) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery && !Object.values(transaction).some(value => 
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )) {
        return false;
      }
      
      return true;
    });
  }, [allTransactions, selectedType, searchQuery]);
  
  // Get most recent transactions for the Recent Transactions component
  const recentTransactions = useMemo(() => {
    return [...allTransactions].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 3);
  }, [allTransactions]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };
  
  const handleTypeFilter = (type: TransactionType) => {
    setSelectedType(type);
    console.log("Filtering by type:", type);
    
    // Show feedback toast
    toast.success(getTranslation(`filterApplied`), {
      description: getTranslation(`transactionTypes.${type === 'all' ? 'all' : type}`),
      duration: 2000
    });
  };

  // Calculate stats for FundDetailsStats
  const totalTransactions = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  const averageAmount = totalTransactions > 0 ? totalAmount / totalTransactions : 0;
  
  // Button to return to wallet dashboard
  const pageActions = (
    <Button
      variant="ghost"
      className="bg-purple-900/30 border border-purple-800/30 hover:bg-purple-800/50 text-white transition-all duration-300"
      onClick={() => navigate("/dashboard/wallet")}
    >
      <ArrowLeft size={16} className="mr-2" /> 
      <span>{getTranslation('backToWallet')}</span>
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
        
        {/* Transaction Type Filter */}
        <TransactionTypeFilter
          selectedType={selectedType}
          onSelectType={handleTypeFilter}
          currentLanguage={currentLanguage}
        />
        
        {/* Search Section */}
        <SearchSection 
          searchQuery={searchQuery}
          handleSearch={handleSearch}
        />
        
        {/* Recent Transactions */}
        <RecentTransactions 
          transactions={recentTransactions} 
          currentLanguage={currentLanguage}
          getTranslation={getTranslation}
        />
        
        {/* Main Transactions Table */}
        <FundDetailsTable 
          transactions={filteredTransactions} 
          onFilter={() => console.log("Filter clicked")}
          onExport={() => {
            console.log("Export clicked");
            toast.success(getTranslation('exportStarted'), {
              description: getTranslation('exportInProgress')
            });
          }}
          onRefresh={() => {
            console.log("Refresh clicked");
            setForceUpdateKey(`fund-details-refresh-${language}-${Date.now()}`);
            toast.success(getTranslation('dataRefreshed'));
          }}
        />
        
        {/* View All Link */}
        <ViewAllLink />
      </motion.div>
    </PageLayout>
  );
};

export default FundDetails;
