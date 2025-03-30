
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DeferredLoad } from "@/utils/progressive-loading";
import PageHeader from "../components/PageHeader";
import InvitationCodeCard from "./components/InvitationCodeCard";
import RewardRulesCard from "./components/RewardRulesCard";
import InvitationRecordsCard from "./components/InvitationRecordsCard";
import { motion } from "framer-motion";

const InvitationList = () => {
  const [invitees, setInvitees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  
  useEffect(() => {
    const loadInvitees = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      setInvitees([
        {
          name: t("invitation.userNames.user1"),
          registerDate: "2023-11-15",
          status: "active",
          rebateAmount: 132.5,
          totalTransaction: 2650,
        },
        {
          name: t("invitation.userNames.user2"),
          registerDate: "2023-11-02",
          status: "pending",
          rebateAmount: 0,
          totalTransaction: 0,
        },
        {
          name: t("invitation.userNames.user3"),
          registerDate: "2023-10-28",
          status: "active",
          rebateAmount: 210.75,
          totalTransaction: 4215,
        },
      ]);
      setIsLoading(false);
    };
    
    loadInvitees();
  }, [t]);

  // Animation variants for staggered animations
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PageHeader title={t("invitation.title")} />
      </motion.div>
      
      {/* Top cards section with refined grid layout and animations */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="lg:col-span-2 h-full flex" variants={itemVariants}>
          <div className="w-full">
            <DeferredLoad
              placeholder={
                <div className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg animate-pulse rounded-lg min-h-[16rem] w-full"></div>
              }
            >
              <InvitationCodeCard />
            </DeferredLoad>
          </div>
        </motion.div>
        
        <motion.div className="h-full flex" variants={itemVariants}>
          <div className="w-full">
            <DeferredLoad
              placeholder={
                <div className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg animate-pulse rounded-lg min-h-[16rem] w-full"></div>
              }
            >
              <RewardRulesCard />
            </DeferredLoad>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Records section with improved spacing and animation */}
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 0.3, 
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
      >
        <DeferredLoad
          placeholder={
            <div className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg animate-pulse h-72 rounded-lg w-full"></div>
          }
        >
          <InvitationRecordsCard invitees={invitees} isLoading={isLoading} />
        </DeferredLoad>
      </motion.div>
    </div>
  );
};

export default InvitationList;
