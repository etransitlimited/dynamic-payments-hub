
import React, { useState, Suspense } from "react";
import { TrendingUp, Wallet, Filter, RefreshCw, Download } from "lucide-react";
import PageHeader from "../merchant/components/PageHeader";
import StatsCard from "./components/StatsCard";
import RecordCard from "./components/RecordCard";
import SearchBox from "./components/SearchBox";
import DepositTable from "./components/DepositTable";
import InformationBox from "./components/InformationBox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { progressiveLoad } from "@/utils/progressive-loading";

// Lazy load DepositStats
const DepositStats = progressiveLoad(
  () => import("./components/DepositStats"),
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <Skeleton key={i} className="h-24 w-full bg-blue-900/10 rounded-lg" />
    ))}
  </div>
);

const DepositRecords = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  
  const depositRecords = [
    {
      id: "TX-8973-4610",
      amount: 1200.00,
      paymentMethod: "Alipay",
      datetime: "2023-11-25 14:32",
      status: "Completed"
    },
    {
      id: "TX-7645-2198",
      amount: 500.00,
      paymentMethod: "WeChat Pay",
      datetime: "2023-11-20 09:45",
      status: "Completed"
    },
    {
      id: "TX-6329-7501",
      amount: 2000.00,
      paymentMethod: "Bank Transfer",
      datetime: "2023-11-18 10:22",
      status: "Completed"
    }
  ];

  const handleRefresh = () => {
    console.log("Refreshing deposit records");
  };

  const handleExport = () => {
    console.log("Exporting deposit records");
  };

  const handleFilter = () => {
    console.log("Filtering deposit records");
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    setSearchQuery(query);
  };

  const handleDateFilter = () => {
    console.log("Opening date filter");
  };

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{t("wallet.depositRecords.statistics")}</h1>
      </div>
      
      <div className="w-full mb-6">
        <StatsCard 
          title={t("wallet.depositRecords.statistics")} 
          icon={<TrendingUp size={18} className="text-cyan-400" />}
          className="shadow-xl shadow-blue-900/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
        >
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full bg-blue-900/10 rounded-lg" />
              ))}
            </div>
          }>
            <DepositStats />
          </Suspense>
        </StatsCard>
      </div>
      
      <RecordCard 
        title={t("wallet.depositRecords.statistics")} 
        description={t("wallet.depositRecords.viewHistory")}
        icon={<Wallet size={18} className="text-green-400" />}
        className="bg-gradient-to-br from-purple-900/90 to-indigo-950/90 border-purple-700/40 shadow-xl shadow-purple-900/30 hover:shadow-[0_0_25px_rgba(147,51,234,0.3)]"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <SearchBox 
            onSearch={handleSearch} 
            onDateFilter={handleDateFilter}
            className="flex-1"
          />
          
          <div className="flex gap-2 self-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFilter}
              className="border-purple-600/60 text-white hover:bg-purple-900/20"
            >
              <Filter className="h-4 w-4 mr-1" />
              {t("wallet.depositRecords.filter")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="border-purple-600/60 text-white hover:bg-purple-900/20"
            >
              <Download className="h-4 w-4 mr-1" />
              {t("wallet.depositRecords.export")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="border-purple-600/60 text-white hover:bg-purple-900/20"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              {t("wallet.depositRecords.refresh")}
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-indigo-500/30 text-indigo-300 hover:bg-indigo-500/40 border-none">
              {t("wallet.depositRecords.allRecords")}
            </Badge>
            <Badge className="bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 border-none">
              {t("wallet.deposit.alipay")}
            </Badge>
            <Badge className="bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 border-none">
              {t("wallet.deposit.wechatPay")}
            </Badge>
            <Badge className="bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 border-none">
              {t("wallet.deposit.bankTransfer")}
            </Badge>
          </div>
        </div>
        
        <DepositTable depositRecords={depositRecords} />
        <InformationBox className="bg-purple-900/30 border-purple-700/30 text-purple-200" />
      </RecordCard>
    </div>
  );
};

export default DepositRecords;
