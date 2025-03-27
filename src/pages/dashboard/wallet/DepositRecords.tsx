
import React, { useState } from "react";
import { TrendingUp, Wallet, Search, Filter, RefreshCw, Download } from "lucide-react";
import PageHeader from "../merchant/components/PageHeader";
import StatsCard from "./components/StatsCard";
import RecordCard from "./components/RecordCard";
import DepositStats from "./components/DepositStats";
import SearchBar from "./components/SearchBar";
import DepositTable from "./components/DepositTable";
import InformationBox from "./components/InformationBox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DepositRecords = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const depositRecords = [
    {
      id: "TX-8973-4610",
      amount: 1200.00,
      paymentMethod: "支付宝",
      datetime: "2023-11-25 14:32",
      status: "已完成"
    },
    {
      id: "TX-7645-2198",
      amount: 500.00,
      paymentMethod: "微信支付",
      datetime: "2023-11-20 09:45",
      status: "已完成"
    },
    {
      id: "TX-6329-7501",
      amount: 2000.00,
      paymentMethod: "银行转账",
      datetime: "2023-11-18 10:22",
      status: "已完成"
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
      <PageHeader title="充值记录" />
      
      <div className="w-full mb-6">
        <StatsCard 
          title="充值统计" 
          icon={<TrendingUp size={18} className="text-blue-400" />}
        >
          <DepositStats />
        </StatsCard>
      </div>
      
      <RecordCard 
        title="充值记录" 
        description="查询您的账户充值记录"
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
              筛选
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="border-blue-600/60 text-white hover:bg-blue-900/20"
            >
              <Download className="h-4 w-4 mr-1" />
              导出
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="border-blue-600/60 text-white hover:bg-blue-900/20"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              刷新
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-none">
              全部记录
            </Badge>
            <Badge className="bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 border-none">
              支付宝
            </Badge>
            <Badge className="bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 border-none">
              微信支付
            </Badge>
            <Badge className="bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 border-none">
              银行转账
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
