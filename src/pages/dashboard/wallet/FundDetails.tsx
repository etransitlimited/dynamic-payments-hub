
import React, { useState } from "react";
import PageHeader from "../merchant/components/PageHeader";
import SearchBox from "./components/SearchBox";
import FundDetailsTable from "./components/FundDetailsTable";
import { Wallet } from "lucide-react";
import DepositStats from "./components/DepositStats";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

const FundDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
    console.log("Searching for:", query);
    toast.info("正在搜索: " + query, {
      description: "检索相关交易记录中...",
    });
  };
  
  const handleDateFilter = () => {
    // Implement date filter
    console.log("Opening date filter");
    toast.info("日期筛选", {
      description: "日期筛选功能即将上线",
    });
  };
  
  const handleFilter = () => {
    // Implement filter
    console.log("Opening filter options");
    toast.info("筛选选项", {
      description: "正在加载筛选选项...",
    });
  };
  
  const handleExport = () => {
    // Implement export
    console.log("Exporting data");
    toast.success("导出成功", {
      description: "数据已成功导出到您的下载文件夹",
    });
  };
  
  const handleRefresh = () => {
    // Implement refresh
    console.log("Refreshing data");
    toast.info("刷新中", {
      description: "正在获取最新数据...",
    });
  };

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageHeader 
        title="资金明细" 
        description="查看和管理所有账户资金交易记录"
      >
        <Wallet className="text-blue-400" />
      </PageHeader>
      
      <Alert className="bg-blue-900/20 border-blue-800/50 text-blue-300">
        <AlertDescription>
          系统每天凌晨1点自动同步交易数据，最近24小时内的交易可能存在延迟。如有紧急查询，请联系客服。
        </AlertDescription>
      </Alert>
      
      <DepositStats />
      
      <SearchBox 
        onSearch={handleSearch} 
        onDateFilter={handleDateFilter} 
      />
      
      <FundDetailsTable 
        onFilter={handleFilter}
        onExport={handleExport}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default FundDetails;
