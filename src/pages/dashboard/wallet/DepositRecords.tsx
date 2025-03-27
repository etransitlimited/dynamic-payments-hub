
import React, { useState } from "react";
import { TrendingUp, Wallet, Search } from "lucide-react";
import PageHeader from "../merchant/components/PageHeader";
import StatsCard from "./components/StatsCard";
import RecordCard from "./components/RecordCard";
import DepositStats from "./components/DepositStats";
import SearchBar from "./components/SearchBar";
import DepositTable from "./components/DepositTable";
import InformationBox from "./components/InformationBox";

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

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageHeader title="充值记录" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <DepositTable depositRecords={depositRecords} />
        <InformationBox />
      </RecordCard>
    </div>
  );
};

export default DepositRecords;
