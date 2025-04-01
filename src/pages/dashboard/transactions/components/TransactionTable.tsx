
import React, { useState, lazy, Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { formatUSD } from "@/utils/currencyUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import TypeBadge from "./TypeBadge";
import StatusBadge from "./StatusBadge";
import TransactionSearch from "./TransactionSearch";

// Transaction data type
export interface Transaction {
  id: number;
  user: string;
  amount: number;
  type: string;
  status: string;
  date: string;
  typeDisplay?: string;
  statusDisplay?: string;
}

const TransactionTable = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  // Mock transaction data - we'll keep this in English as reference data
  const transactionsData: Transaction[] = [
    { id: 1, user: "John Smith", amount: 3500.00, type: "deposit", status: "completed", date: "2023-06-12" },
    { id: 2, user: "Sarah Lee", amount: 1200.00, type: "withdrawal", status: "pending", date: "2023-06-11" },
    { id: 3, user: "Mike Johnson", amount: 8650.00, type: "deposit", status: "completed", date: "2023-06-10" },
    { id: 4, user: "Emily Chen", amount: 2300.00, type: "withdrawal", status: "failed", date: "2023-06-09" },
    { id: 5, user: "Daniel Kim", amount: 5150.00, type: "deposit", status: "completed", date: "2023-06-08" },
  ];

  // Map data for display based on current language
  const transactions = transactionsData.map(transaction => ({
    ...transaction,
    typeDisplay: t(`transactions.${transaction.type}`),
    statusDisplay: t(`transactions.status${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}`)
  }));

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction => 
    transaction.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.typeDisplay?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.statusDisplay?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.id.toString().includes(searchQuery)
  );

  // Handle filter button click
  const handleFilterClick = () => {
    console.log("Filter clicked");
  };

  // Handle date filter button click
  const handleDateFilterClick = () => {
    console.log("Date filter clicked");
  };

  return (
    <Card className="relative overflow-hidden border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 mb-6" style={{ background: "linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))" }}>
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className={`flex ${isMobile ? 'flex-col space-y-3' : 'justify-between'} items-center`}>
          <div className="flex items-center">
            <span className="bg-purple-500/20 p-2 rounded-full mr-2">
              <ArrowDownUp className="text-purple-300" size={20} />
            </span>
            {t("transactions.transactionList")}
          </div>
          <TransactionSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onFilterClick={handleFilterClick}
            onDateFilterClick={handleDateFilterClick}
          />
        </CardTitle>
        <CardDescription className="text-purple-200/80">
          {t("transactions.allTransactions")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-800/50">
                <th className="text-left p-3 text-purple-100">{t("transactions.id")}</th>
                <th className="text-left p-3 text-purple-100">{isMobile ? '' : t("transactions.user")}</th>
                <th className="text-left p-3 text-purple-100">{t("transactions.amount")}</th>
                <th className="text-left p-3 text-purple-100">{t("transactions.type")}</th>
                <th className="text-left p-3 text-purple-100">{t("transactions.status")}</th>
                <th className="text-left p-3 text-purple-100">{isMobile ? '' : t("transactions.date")}</th>
                <th className="text-right p-3 text-purple-100">{t("transactions.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-purple-800/50 hover:bg-purple-900/20">
                  <td className="p-3 font-medium text-white">#{transaction.id.toString().padStart(6, '0')}</td>
                  <td className={`p-3 text-white ${isMobile ? 'hidden' : ''}`}>{transaction.user}</td>
                  <td className="p-3 font-semibold text-white">{formatUSD(transaction.amount)}</td>
                  <td className="p-3">
                    <TypeBadge type={transaction.type} />
                  </td>
                  <td className="p-3">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className={`p-3 text-white ${isMobile ? 'hidden' : ''}`}>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-purple-300" />
                      {transaction.date}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white hover:bg-purple-800/50">
                      {t("transactions.details")}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
