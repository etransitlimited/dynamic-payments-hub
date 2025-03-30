import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from '@/pages/dashboard/transactions/components/TransactionTable';
import { useLanguage } from "@/context/LanguageContext";
import FundDetailsTable from './components/FundDetailsTable';

interface FundDetailsProps {
  transactions: Transaction[];
}

const FundDetails = () => {
  const { t } = useLanguage();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div className="container mx-auto p-6 text-white">
      <Card 
        className="relative overflow-hidden border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 mb-6" 
        style={{ background: "linear-gradient(to right, rgb(83, 105, 118), rgb(41, 46, 73))" }}
      >
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center">
            {t("fundDetails.pageTitle")}
          </CardTitle>
          <CardDescription className="text-purple-200/80">
            {t("fundDetails.pageDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <FundDetailsTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default FundDetails;
