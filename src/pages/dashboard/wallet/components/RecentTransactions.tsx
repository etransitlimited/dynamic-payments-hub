
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowDownRight, ArrowUpRight, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { Transaction } from "../../wallet/FundDetails";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getFundDetailsTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const { language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Function to get direct translations from translation files
  const getTranslation = useCallback((key: string): string => {
    return getFundDetailsTranslation(key, currentLanguage);
  }, [currentLanguage]);
  
  // Monitor language changes
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`RecentTransactions language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language as LanguageCode);
      setForceUpdateKey(Date.now());
    }
  }, [language, currentLanguage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  // Function to get the appropriate icon for transaction type
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "Deposit":
        return <ArrowUpRight size={16} />;
      case "Expense":
      case "Withdrawal":
        return <ArrowDownRight size={16} />;
      case "Transfer":
        return <RefreshCw size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      key={`recent-transactions-${currentLanguage}-${forceUpdateKey}`}
      data-language={currentLanguage}
    >
      <Card className="bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/30 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-purple-900/30 p-2 rounded-lg mr-2 text-purple-400">
              <Clock size={18} />
            </span>
            <span>{getTranslation('recentTransactions')}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <motion.div 
                key={`recent-${transaction.id}-${currentLanguage}-${forceUpdateKey}`}
                variants={itemVariants}
                className="bg-charcoal-dark/50 p-3 rounded-lg border border-purple-900/20 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-900/20 text-purple-400 p-2 rounded-full">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {getTranslation(`transactionTypes.${transaction.type.toLowerCase()}`)}
                      </p>
                      <p className="text-xs text-blue-300/70">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-mono font-medium ${transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.amount}
                    </p>
                    <p className="text-xs text-blue-300/70">{transaction.note}</p>
                  </div>
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
