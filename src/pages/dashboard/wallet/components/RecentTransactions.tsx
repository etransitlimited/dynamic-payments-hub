
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, Download } from "lucide-react";
import TransactionRow from "./table/TransactionRow";
import { Table, TableBody } from "@/components/ui/table";
import TableHeaderComponent from "./table/TableHeader";
import { Transaction } from "../FundDetails";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getFundDetailsTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";
import { Button } from "@/components/ui/button";

interface RecentTransactionsProps {
  transactions: Transaction[];
  currentLanguage: LanguageCode;
  getTranslation: (key: string) => string;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ 
  transactions,
  currentLanguage,
  getTranslation
}) => {
  const { language } = useSafeTranslation();
  const [forceUpdateKey, setForceUpdateKey] = useState(`recent-${language}-${Date.now()}`);
  
  // Update language state when it changes
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`RecentTransactions language changed from ${currentLanguage} to ${language}`);
      setForceUpdateKey(`recent-${language}-${Date.now()}`);
    }
  }, [language, currentLanguage]);
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };
  
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="w-full mb-6"
      key={forceUpdateKey}
      data-language={currentLanguage}
    >
      <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg">
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px] rounded-xl"></div>
        <CardHeader className="relative z-10 pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <span className="bg-purple-900/30 p-2 rounded-lg mr-2 text-purple-400">
              <Activity size={18} />
            </span>
            {getTranslation('recentTransactions')}
          </CardTitle>
          <Button
            variant="default"
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
            onClick={() => console.log("Export report")}
          >
            <Download className="h-4 w-4" />
            <span>{getTranslation('exportReport')}</span>
          </Button>
        </CardHeader>
        <CardContent className="relative z-10 p-3">
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableHeaderComponent 
                currentLanguage={currentLanguage}
                getTranslation={getTranslation}
              />
              <TableBody className="bg-charcoal-dark/50">
                {transactions.slice(0, 3).map((transaction) => (
                  <TransactionRow 
                    key={transaction.id} 
                    transaction={transaction}
                    currentLanguage={currentLanguage}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentTransactions;
