
import React, { useState } from "react";
import PageHeader from "../merchant/components/PageHeader";
import SearchBox from "./components/SearchBox";
import FundDetailsTable from "./components/FundDetailsTable";
import { useLanguage } from "@/context/LanguageContext";

const FundDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { t } = useLanguage();
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality
    console.log("Searching for:", query);
  };
  
  const handleDateFilter = () => {
    // Implement date filter
    console.log("Opening date filter");
  };
  
  const handleFilter = () => {
    // Implement filter
    console.log("Opening filter options");
  };
  
  const handleExport = () => {
    // Implement export
    console.log("Exporting data");
  };
  
  const handleRefresh = () => {
    // Implement refresh
    console.log("Refreshing data");
  };

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{t("wallet.fundDetails.title")}</h1>
      </div>
      
      <SearchBox 
        onSearch={handleSearch} 
        onDateFilter={handleDateFilter}
        className="bg-gradient-to-br from-indigo-900/90 to-blue-950/90 border-indigo-700/40 shadow-xl shadow-indigo-900/30 hover:shadow-[0_0_25px_rgba(99,102,241,0.3)]" 
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
