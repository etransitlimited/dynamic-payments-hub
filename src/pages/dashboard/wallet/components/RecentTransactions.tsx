
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import TransactionTypeBadge from "./table/TransactionTypeBadge";
import { Transaction } from "./FundDetailsTable";
import { useLanguage } from "@/context/LanguageContext";
import { getFundDetailsTranslation } from "../i18n";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const { language } = useLanguage();
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Get translations directly
  const title = getFundDetailsTranslation('recentTransactions', language);
  
  // Force re-render when language changes
  useEffect(() => {
    setForceUpdateKey(Date.now());
  }, [language]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants} 
      className="grid grid-cols-1 gap-4"
      key={`recent-transactions-${language}-${forceUpdateKey}`}
      data-language={language}
    >
      <Card className="bg-gradient-to-br from-indigo-900/20 to-indigo-900/40 border-indigo-500/30 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white flex items-center">
            <span className="bg-indigo-900/30 p-2 rounded-lg mr-2 text-indigo-400">
              <CreditCard size={18} />
            </span>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <motion.div 
                key={`transaction-${transaction.id}-${language}`} 
                variants={itemVariants}
                className="flex items-center justify-between py-2 border-b border-indigo-800/30 last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <TransactionTypeBadge 
                    type={transaction.type} 
                    currentLanguage={language}
                    getTranslation={(key) => getFundDetailsTranslation(key, language)}
                  />
                  <div className="text-indigo-200 text-sm font-medium">
                    {transaction.id}
                  </div>
                </div>
                <div className={`font-medium ${transaction.amount.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                  {transaction.amount}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentTransactions;
