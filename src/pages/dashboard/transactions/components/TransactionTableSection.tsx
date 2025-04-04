
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import TransactionTable from "./TransactionTable";
import { getTransactionTranslation } from "../i18n";
import { useNavigate } from "react-router-dom";

interface TransactionTableSectionProps {
  filterMode?: "last24Hours" | "allTransactions";
}

const TransactionTableSection: React.FC<TransactionTableSectionProps> = ({ 
  filterMode = "allTransactions" 
}) => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`table-section-${language}-${Date.now()}`);
  const navigate = useNavigate();
  
  // Force refresh when language changes to ensure proper translation rendering
  useEffect(() => {
    console.log(`TransactionTableSection language updated to: ${language}`);
    setUniqueKey(`table-section-${language}-${Date.now()}-${refreshCounter}`);
  }, [language, refreshCounter]);
  
  // Use the direct translation function for guaranteed language updates
  const transactionList = getTransactionTranslation(
    filterMode === "last24Hours" ? "last24Hours" : "transactionList", 
    language
  );
  const viewAll = getTransactionTranslation("viewAll", language);
  const allTransactions = getTransactionTranslation(
    filterMode === "last24Hours" ? "last24Hours" : "allTransactions", 
    language
  );
  
  const handleViewAllClick = () => {
    if (filterMode === "last24Hours") {
      navigate("/dashboard/transactions/history");
    }
  };
  
  return (
    <Card 
      key={uniqueKey}
      className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative rounded-xl h-full"
      data-language={language}
    >
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
      <CardContent className="p-3 sm:p-4 md:p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-purple-500 rounded-sm mr-2 sm:mr-3"></span>
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              {transactionList}
            </h2>
          </div>
          {filterMode === "last24Hours" && (
            <motion.button 
              whileHover={{ x: 5 }}
              className="text-purple-400 hover:text-neon-green flex items-center text-xs sm:text-sm transition-colors"
              onClick={handleViewAllClick}
            >
              {viewAll}
              <ChevronRight className="h-4 w-4 ml-1" />
            </motion.button>
          )}
        </div>
        <p className="text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm">
          {allTransactions}
        </p>
        <TransactionTable filterMode={filterMode} />
      </CardContent>
    </Card>
  );
};

export default TransactionTableSection;
