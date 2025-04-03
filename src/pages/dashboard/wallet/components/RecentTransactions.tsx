
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InformationBox from "./InformationBox";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Transaction } from "./FundDetailsTable";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const { language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  
  // Monitor language changes
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`RecentTransactions language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language);
    }
  }, [language, currentLanguage]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="border-blue-900/20 bg-gradient-to-br from-charcoal-light/70 to-charcoal-dark/70 backdrop-blur-sm shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardContent className="p-6 relative z-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="w-2 h-6 bg-[#F2FCE2]/70 rounded-full mr-3"></span>
            <TranslatedText keyName="wallet.fundDetails.recentTransactions" fallback="Recent Transactions" />
          </h2>
          
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div 
                key={`${transaction.id}-${currentLanguage}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-charcoal-dark/60 backdrop-blur-sm rounded-lg p-4 border border-purple-900/10 hover:border-purple-600/30 transition-all duration-300"
              >
                <div className="mb-2 sm:mb-0">
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium text-blue-200">
                      {transaction.id}
                    </span>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      transaction.type === "Deposit" ? "bg-green-600/20 text-green-300" :
                      transaction.type === "Expense" ? "bg-red-600/20 text-red-300" :
                      "bg-blue-600/20 text-blue-300"
                    }`}>
                      <TranslatedText 
                        keyName={`wallet.fundDetails.type${transaction.type}`} 
                        fallback={transaction.type} 
                      />
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{transaction.note}</p>
                </div>
                <div className="flex items-center justify-between sm:space-x-6">
                  <div className="text-right">
                    <p className={`font-medium text-base ${
                      transaction.amount.startsWith("+") ? "text-green-300" : "text-red-300"
                    }`}>
                      {transaction.amount}
                    </p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-200 hover:text-blue-100 hover:bg-blue-900/20">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <InformationBox />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentTransactions;
