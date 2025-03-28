
import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import RebateStats from "./components/RebateStats";
import RebateListCard from "./components/RebateListCard";
import { rebateRecords } from "./data/rebateData";
import { useLanguage } from "@/context/LanguageContext";

const RebateList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { t } = useLanguage();
  
  // Filter and paginate records
  const filteredRecords = rebateRecords.filter(record => 
    record.invitee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageHeader title={t("invitation.rebateList")} />
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
