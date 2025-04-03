
import React from "react";
import { motion } from "framer-motion";
import TransactionsHeader from "../components/transactions/TransactionsHeader";
import TransactionsTable from "../components/transactions/TransactionsTable";
import TransactionsOverview from "../components/transactions/TransactionsOverview";
import { usePageLanguage } from "@/hooks/use-page-language";

const TransactionsPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("transactions.title", "Transactions");
  
  // Get translations
  const pageTitle = getTranslation("transactions.title", "Transactions");
  const pageSubtitle = getTranslation("transactions.subtitle", "View and manage all transactions on the platform");
  
  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <TransactionsHeader 
        title={pageTitle}
        subtitle={pageSubtitle}
      />
      
      <TransactionsOverview />
      
      <TransactionsTable />
    </motion.div>
  );
};

export default TransactionsPage;
