
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { Transaction } from "../FundDetails";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
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

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/30 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-purple-900/30 p-2 rounded-lg mr-2 text-purple-400">
              <Clock size={18} />
            </span>
            <TranslatedText keyName="wallet.fundDetails.recentTransactions" fallback="Recent Transactions" />
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <motion.div 
                key={`recent-${transaction.id}`}
                variants={itemVariants}
                className="bg-charcoal-dark/50 p-3 rounded-lg border border-purple-900/20 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-900/20 text-purple-400 p-2 rounded-full">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{transaction.type}</p>
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
