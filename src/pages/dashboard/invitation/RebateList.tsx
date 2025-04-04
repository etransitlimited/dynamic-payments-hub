
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import RebateListCard from "./components/RebateListCard";
import { rebateRecords } from "./data/rebateData";
import { DashboardLoading } from "@/components/routing/LoadingComponents";
import { progressiveLoad } from "@/utils/progressive-loading";
import { motion } from "framer-motion";
import { useRebateTranslation } from "./hooks/useRebateTranslation";
import { Link } from "react-router-dom";
import { UserPlus, Users, Activity } from "lucide-react";

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
  const { t, language } = useRebateTranslation();
  
  // Force re-render when language changes
  const [componentKey, setComponentKey] = useState<string>(`rebate-list-${language}`);
  
  useEffect(() => {
    setComponentKey(`rebate-list-${language}-${Date.now()}`);
    console.log(`RebateList language changed to: ${language}`);
  }, [language]);
  
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

  // Related feature links
  const relatedLinks = [
    {
      title: t("inviteFriends"),
      path: "/dashboard/invitation",
      icon: <UserPlus className="h-4 w-4" />
    },
    {
      title: t("userManagement"),
      path: "/dashboard/merchant/management",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: t("rewardHistory"),
      path: "/dashboard/invitation/history",
      icon: <Activity className="h-4 w-4" />
    }
  ];

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <div className="relative min-h-screen" key={componentKey} data-language={language}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible" 
        className="container px-4 py-6 space-y-6 mx-auto max-w-7xl relative z-10"
      >
        <PageHeader title={t("title")} />
        
        {/* Related links for better navigation */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-2">
          {relatedLinks.map((link, index) => (
            <Link
              key={`related-link-${index}`}
              to={link.path}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal-light/50 hover:bg-purple-900/30 rounded-md text-xs text-purple-200 hover:text-white transition-colors border border-purple-900/20 hover:border-purple-500/40"
            >
              {link.icon}
              <span>{link.title}</span>
            </Link>
          ))}
        </motion.div>
        
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
