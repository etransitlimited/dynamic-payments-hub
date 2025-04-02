import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import RebateListCard from "./components/RebateListCard";
import { rebateRecords } from "./data/rebateData";
import { useLanguage } from "@/context/LanguageContext";
import { DashboardLoading } from "@/components/routing/LoadingComponents";
import { progressiveLoad } from "@/utils/progressive-loading";
import { motion } from "framer-motion";
import GradientOverlay from "@/components/particles/GradientOverlay";
import ParticlesLayer from "@/components/particles/ParticlesLayer";
import TranslatedText from "@/components/translation/TranslatedText";

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
    const timer = setTimeout(() => {
      const filtered = rebateRecords.filter(record => 
        record.invitee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecords(filtered);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentRecords(filteredRecords.slice(indexOfFirstItem, indexOfLastItem));
  }, [filteredRecords, currentPage]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <GradientOverlay />
        <ParticlesLayer />
        
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl"></div>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container px-4 py-6 space-y-6 mx-auto max-w-7xl relative z-10"
      >
        <PageHeader title={<TranslatedText keyName="invitation.rebateList" fallback="Rebate List" />} />
        
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        >
          <RebateStats />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="rounded-xl overflow-hidden shadow-lg"
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
    </div>
  );
};

export default RebateList;
