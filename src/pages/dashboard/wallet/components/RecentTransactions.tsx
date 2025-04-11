
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import TransactionRow from "./table/TransactionRow";
import { Table, TableBody } from "@/components/ui/table";
import TableHeaderComponent from "./table/TableHeader";
import { Transaction } from "../FundDetails";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getFundDetailsTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";

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
  const [languageKey, setLanguageKey] = useState<string>(`recent-trans-${currentLanguage}`);
  
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`RecentTransactions language changed from ${currentLanguage} to ${language}`);
      setLanguageKey(`recent-trans-${language}-${Date.now()}`);
    }
  }, [language, currentLanguage]);
  
  return (
    <Card 
      className="bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/30 shadow-md overflow-hidden"
      key={languageKey}
      data-language={currentLanguage}
    >
      <CardHeader className="pb-3 relative">
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px] rounded-xl"></div>
        <CardTitle className="text-white flex items-center relative z-10">
          <span className="bg-purple-900/30 p-2 rounded-lg mr-2 text-purple-400">
            <Activity size={18} />
          </span>
          <span>{getTranslation('recentTransactions')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="overflow-auto">
          <Table className="w-full">
            <TableHeaderComponent currentLanguage={currentLanguage} />
            <TableBody>
              {transactions.map((transaction) => (
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
  );
};

export default RecentTransactions;
