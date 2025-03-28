import React, { useState } from "react";
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

  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 mb-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="bg-purple-500/20 p-2 rounded-full mr-2">
              <ArrowDownUp className="text-purple-400" size={20} />
            </span>
            {t("transactions.transactionList")}
          </div>
          <TransactionSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          {t("transactions.allTransactions")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-800">
                <th className="text-left p-3">{t("transactions.id")}</th>
                <th className="text-left p-3">{t("transactions.user")}</th>
                <th className="text-left p-3">{t("transactions.amount")}</th>
                <th className="text-left p-3">{t("transactions.type")}</th>
                <th className="text-left p-3">{t("transactions.status")}</th>
                <th className="text-left p-3">{t("transactions.date")}</th>
                <th className="text-right p-3">{t("transactions.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-blue-800/50 hover:bg-blue-900/20">
                  <td className="p-3 font-medium">#{transaction.id.toString().padStart(6, '0')}</td>
                  <td className="p-3">{transaction.user}</td>
                  <td className="p-3 font-semibold">{formatUSD(transaction.amount)}</td>
                  <td className="p-3">
                    <TypeBadge type={transaction.type} />
                  </td>
                  <td className="p-3">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-blue-400" />
                      {transaction.date}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-white hover:bg-blue-800">
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
