
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import RebateListCard from "./components/RebateListCard";
import { rebateRecords } from "./data/rebateData";
import { useLanguage } from "@/context/LanguageContext";
import { DashboardLoading } from "@/components/routing/LoadingComponents";
import { progressiveLoad } from "@/utils/progressive-loading";
import { motion } from "framer-motion";

// Lazy load heavy components
const RebateStats = progressiveLoad(
  () => import("./components/RebateStats"),
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="h-32 bg-charcoal-light/50 rounded-lg border border-purple-900/20 animate-pulse"></div>
    <div className="h-32 bg-charcoal-light/50 rounded-lg border border-purple-900/20 animate-pulse"></div>
    <div className="h-32 bg-charcoal-light/50 rounded-lg border border-purple-900/20 animate-pulse"></div>
  </div>,
  { delay: 100 }
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container px-4 space-y-6 mx-auto max-w-7xl"
    >
      <PageHeader title={t("invitation.rebateList")} />
      
      {/* Statistics Cards */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
      >
        <RebateStats />
      </motion.div>
      
      {/* Rebate Records */}
      <motion.div 
        variants={itemVariants}
        className="rounded-lg overflow-hidden"
      >
        <RebateListCard
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentRecords={currentRecords}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </motion.div>
    </motion.div>
  );
};

export default RebateList;
