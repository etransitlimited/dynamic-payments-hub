
import React, { useState } from "react";
import PageHeader from "../merchant/components/PageHeader";
import SearchBox from "./components/SearchBox";
import FundDetailsTable from "./components/FundDetailsTable";

const FundDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  
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
      <PageHeader title="资金明细" />
      
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
