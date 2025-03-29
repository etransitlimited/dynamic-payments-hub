
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import RebateListCard from "./components/RebateListCard";
import { rebateRecords } from "./data/rebateData";
import { useLanguage } from "@/context/LanguageContext";
import { DashboardLoading } from "@/components/routing/LoadingComponents";
import { progressiveLoad } from "@/utils/progressive-loading";

// Lazy load heavy components
const RebateStats = progressiveLoad(
  () => import("./components/RebateStats"),
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="h-32 bg-blue-900/10 rounded-lg animate-pulse"></div>
    <div className="h-32 bg-blue-900/10 rounded-lg animate-pulse"></div>
    <div className="h-32 bg-blue-900/10 rounded-lg animate-pulse"></div>
  </div>,
  { delay: 100 }
);

const RebateList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const itemsPerPage = 5;
  const { t } = useLanguage();
  
  useEffect(() => {
    // Simulate backend loading with a small delay
    const timer = setTimeout(() => {
      // Filter records based on search query
      const filtered = rebateRecords.filter(record => 
        record.invitee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecords(filtered);
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  useEffect(() => {
    // Paginate filtered records
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentRecords(filteredRecords.slice(indexOfFirstItem, indexOfLastItem));
  }, [filteredRecords, currentPage]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader title={t("invitation.rebateList")} />
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RebateStats />
      </div>
      
      {/* Rebate Records */}
      <RebateListCard
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentRecords={currentRecords}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default RebateList;
