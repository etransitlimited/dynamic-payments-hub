
import React, { useState, Suspense } from "react";
import { TrendingUp, Wallet, Filter, RefreshCw, Download } from "lucide-react";
import PageHeader from "../merchant/components/PageHeader";
import StatsCard from "./components/StatsCard";
import RecordCard from "./components/RecordCard";
import SearchBar from "./components/SearchBar";
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

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageHeader title={t("wallet.depositRecords.statistics")} />
      
      <div className="w-full mb-6">
        <StatsCard 
          title={t("wallet.depositRecords.statistics")} 
          icon={<TrendingUp size={18} className="text-blue-400" />}
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
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          <div className="flex gap-2 self-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFilter}
              className="border-blue-600/60 text-white hover:bg-blue-900/20"
            >
              <Filter className="h-4 w-4 mr-1" />
              {t("wallet.depositRecords.filter")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="border-blue-600/60 text-white hover:bg-blue-900/20"
            >
              <Download className="h-4 w-4 mr-1" />
              {t("wallet.depositRecords.export")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="border-blue-600/60 text-white hover:bg-blue-900/20"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              {t("wallet.depositRecords.refresh")}
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-none">
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
        <InformationBox />
      </RecordCard>
    </div>
  );
};

export default DepositRecords;
