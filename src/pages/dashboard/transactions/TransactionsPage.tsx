import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Filter, ArrowDownUp, DollarSign, BarChart3, Clock, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const TransactionsPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock transaction data - we'll keep this in English as reference data
  const transactionsData = [
    { id: 1, user: "John Smith", amount: "3,500.00", type: "deposit", status: "completed", date: "2023-06-12" },
    { id: 2, user: "Sarah Lee", amount: "1,200.00", type: "withdrawal", status: "pending", date: "2023-06-11" },
    { id: 3, user: "Mike Johnson", amount: "8,650.00", type: "deposit", status: "completed", date: "2023-06-10" },
    { id: 4, user: "Emily Chen", amount: "2,300.00", type: "withdrawal", status: "failed", date: "2023-06-09" },
    { id: 5, user: "Daniel Kim", amount: "5,150.00", type: "deposit", status: "completed", date: "2023-06-08" },
  ];

  // Map data for display based on current language
  const transactions = transactionsData.map(transaction => ({
    ...transaction,
    typeDisplay: t(`transactions.${transaction.type}`),
    statusDisplay: t(`transactions.status${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}`)
  }));

  // Function to render status badge with proper translation
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-900/60 text-green-200">
            {t("transactions.statusCompleted")}
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/60 text-yellow-200">
            {t("transactions.statusPending")}
          </span>
        );
      case "failed":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-red-900/60 text-red-200">
            {t("transactions.statusFailed")}
          </span>
        );
      default:
        return null;
    }
  };

  // Function to render type badge with proper translation
  const renderTypeBadge = (type: string) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${
        type === "deposit" ? "bg-green-900/60 text-green-200" : "bg-blue-900/60 text-blue-200"
      }`}>
        {t(`transactions.${type}`)}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t("transactions.title")}</h1>
        <p className="text-blue-300">{t("transactions.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <DollarSign className="text-blue-400" size={20} />
              </span>
              {t("transactions.totalTransactions")}
            </CardTitle>
            <CardDescription className="text-blue-300">
              {t("transactions.allTransactions")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold">￥2,458,630</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <BarChart3 className="text-blue-400" size={20} />
              </span>
              {t("transactions.monthlyTransactions")}
            </CardTitle>
            <CardDescription className="text-blue-300">
              {t("transactions.monthlyTransactions")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold">￥356,720</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <Clock className="text-blue-400" size={20} />
              </span>
              {t("transactions.recentTransactions")}
            </CardTitle>
            <CardDescription className="text-blue-300">
              {t("transactions.last24Hours")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold">68</div>
          </CardContent>
        </Card>
      </div>

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
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                <Input
                  type="search"
                  placeholder={t("transactions.searchTransactions")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-[300px] pl-8 bg-blue-950/50 border-blue-800 text-white placeholder:text-blue-400/70"
                />
              </div>
              <Button variant="outline" size="icon" className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white">
                <Filter size={18} />
              </Button>
              <Button variant="outline" size="icon" className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white">
                <Calendar size={18} />
              </Button>
            </div>
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
                    <td className="p-3 font-semibold">￥{transaction.amount}</td>
                    <td className="p-3">
                      {renderTypeBadge(transaction.type)}
                    </td>
                    <td className="p-3">
                      {renderStatusBadge(transaction.status)}
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

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <BarChart3 className="text-blue-400" size={20} />
            </span>
            {t("transactions.transactionStatistics")}
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            {t("transactions.transactionAnalytics")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 h-60 flex items-center justify-center">
          <div className="text-center text-blue-400">
            <BarChart3 size={50} className="mx-auto mb-4 opacity-40" />
            <p>{t("transactions.transactionAnalytics")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
