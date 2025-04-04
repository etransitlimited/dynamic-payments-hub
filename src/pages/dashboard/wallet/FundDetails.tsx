
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { ArrowLeft, Wallet } from "lucide-react";
import PageLayout from "@/components/dashboard/PageLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePageLanguage } from "@/hooks/use-page-language";
import { toast } from "sonner";

// Import refactored components
import FundDetailsStats from "./components/FundDetailsStats";
import SearchSection from "./components/SearchSection";
import ExportButton from "./components/ExportButton";
import RecentTransactions from "./components/RecentTransactions";
import FundDetailsTable from "./components/FundDetailsTable";
import ViewAllLink from "./components/ViewAllLink";

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
  const { t, language } = useSafeTranslation();
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  const pageLanguage = usePageLanguage('wallet.fundDetails.title', 'Fund Details');
  
  // Update component when language changes
  useEffect(() => {
    console.log(`FundDetails language updated: ${language}`);
    setForceUpdateKey(Date.now());
  }, [language]);
  
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
  
  // Create breadcrumbs for navigation
  const breadcrumbs = [
    {
      label: t("sidebar.dashboard"),
      href: "/dashboard"
    },
    {
      label: t("wallet.walletManagement"),
      href: "/dashboard/wallet"
    },
    {
      label: t("wallet.fundDetails.title")
    }
  ];
  
  // Button to return to wallet dashboard
  const pageActions = (
    <Button
      variant="ghost"
      className="bg-purple-900/30 border border-purple-800/30 hover:bg-purple-800/50 text-white transition-all duration-300"
      onClick={() => navigate("/dashboard/wallet")}
    >
      <ArrowLeft size={16} className="mr-2" /> 
      <span>{t("common.back")}</span>
    </Button>
  );
  
  return (
    <PageLayout 
      title={t("wallet.fundDetails.title")}
      subtitle={t("wallet.fundDetails.transactionDetails")}
      breadcrumbs={breadcrumbs}
      actions={pageActions}
      animationKey={`fund-details-${language}-${forceUpdateKey}`}
    >
      <motion.div
        key={`fund-container-${language}-${forceUpdateKey}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.1
        }}
        className="space-y-6"
      >
        {/* Stats Row */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FundDetailsStats 
            totalTransactions={totalTransactions}
            totalAmount={totalAmount}
            averageAmount={averageAmount}
            isLoading={false}
          />
        </motion.div>
        
        {/* Search Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <SearchSection 
            searchQuery={searchQuery}
            handleSearch={handleSearch}
          />
        </motion.div>
        
        {/* Quick Export Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ExportButton />
        </motion.div>
        
        {/* Recent Transactions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <RecentTransactions transactions={recentTransactions} />
        </motion.div>
        
        {/* Main Transactions Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <FundDetailsTable 
            transactions={recentTransactions} 
            onFilter={() => console.log("Filter clicked")}
            onExport={() => console.log("Export clicked")}
            onRefresh={() => {
              console.log("Refresh clicked");
              toast.success(t("common.refreshed"), {
                position: "bottom-right",
                duration: 2000
              });
              setForceUpdateKey(Date.now());
            }}
          />
        </motion.div>
        
        {/* View All Link */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <ViewAllLink />
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default FundDetails;
