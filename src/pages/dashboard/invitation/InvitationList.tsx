
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DeferredLoad } from "@/utils/progressive-loading";
import PageHeader from "../components/PageHeader";
import InvitationCodeCard from "./components/InvitationCodeCard";
import RewardRulesCard from "./components/RewardRulesCard";
import InvitationRecordsCard from "./components/InvitationRecordsCard";
import { Progress } from "@/components/ui/progress";
import { Users, PiggyBank, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";

// Enhanced Stats Component with animations and improved visuals
const InvitationStats = () => {
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(78), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        className="stats-card flex flex-col relative overflow-hidden group"
        variants={itemVariants}
      >
        {/* Purple gradient glow effect */}
        <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-75"></div>
        
        <div className="relative bg-gradient-to-br from-charcoal-light to-charcoal-dark rounded-xl border border-purple-900/30 p-5 h-full z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300">{t("invitation.stats.invited")}</h3>
              <p className="text-2xl font-bold text-white mt-1 flex items-center">
                24
                <span className="text-xs font-medium px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full ml-2">
                  +3 this week
                </span>
              </p>
            </div>
            <div className="p-2 bg-purple-900/30 rounded-lg shadow-inner">
              <Users size={20} className="text-purple-400" />
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">{t("invitation.monthlyTarget")}</span>
              <span className="text-neon-green">78%</span>
            </div>
            <Progress value={progress} className="h-2 bg-charcoal-dark" />
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="stats-card flex flex-col relative overflow-hidden group"
        variants={itemVariants}
      >
        {/* Purple gradient glow effect */}
        <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-75"></div>
        
        <div className="relative bg-gradient-to-br from-charcoal-light to-charcoal-dark rounded-xl border border-purple-900/30 p-5 h-full z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300">{t("invitation.stats.totalRebate")}</h3>
              <p className="text-2xl font-bold text-white mt-1">$1,245.88</p>
            </div>
            <div className="p-2 bg-purple-900/30 rounded-lg shadow-inner">
              <PiggyBank size={20} className="text-purple-400" />
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">{t("invitation.comparedToLastMonth")}</span>
              <span className="text-xs font-medium px-2 py-1 bg-neon-green/10 text-neon-green rounded-full">+24.3%</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="stats-card flex flex-col relative overflow-hidden group"
        variants={itemVariants}
      >
        {/* Purple gradient glow effect */}
        <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-75"></div>
        
        <div className="relative bg-gradient-to-br from-charcoal-light to-charcoal-dark rounded-xl border border-purple-900/30 p-5 h-full z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300">{t("invitation.conversionRate")}</h3>
              <p className="text-2xl font-bold text-white mt-1">65.4%</p>
            </div>
            <div className="p-2 bg-purple-900/30 rounded-lg shadow-inner">
              <TrendingUp size={20} className="text-purple-400" />
            </div>
          </div>
          <div className="mt-auto">
            <div className="radial-chart grid grid-cols-10 gap-1 mt-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full ${i < 7 ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-charcoal-dark'}`}
                ></div>
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-2">{t("invitation.activationRatio")}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Info Card Component with visual design improvements
const InvitationPromotionCard = () => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 mb-6 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="relative z-10 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-900/40 rounded-xl border border-purple-500/20">
            <Award size={28} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{t("invitation.shareCodeToFriends")}</h3>
            <p className="text-gray-400 text-sm mt-1">{t("invitation.rewardRules")}</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-300"
        >
          {t("invitation.generate")}
        </motion.button>
      </div>
    </motion.div>
  );
};

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

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <PageHeader title={t("invitation.title")} />
      
      {/* New Promotional Card */}
      <InvitationPromotionCard />
      
      {/* Stats Section with improved visuals */}
      <InvitationStats />
      
      {/* Top cards section with refined grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 h-full flex">
          <div className="w-full">
            <DeferredLoad
              placeholder={
                <div className="bg-charcoal-light/50 animate-pulse rounded-xl min-h-[16rem] w-full border border-purple-900/20"></div>
              }
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <InvitationCodeCard />
              </motion.div>
            </DeferredLoad>
          </div>
        </div>
        
        <div className="h-full flex">
          <div className="w-full">
            <DeferredLoad
              placeholder={
                <div className="bg-charcoal-light/50 animate-pulse rounded-xl min-h-[16rem] w-full border border-purple-900/20"></div>
              }
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <RewardRulesCard />
              </motion.div>
            </DeferredLoad>
          </div>
        </div>
      </div>
      
      {/* Records section with improved spacing */}
      <div className="w-full">
        <DeferredLoad
          placeholder={
            <div className="bg-charcoal-light/50 animate-pulse h-72 rounded-xl w-full border border-purple-900/20"></div>
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <InvitationRecordsCard invitees={invitees} isLoading={isLoading} />
          </motion.div>
        </DeferredLoad>
      </div>
    </div>
  );
};

export default InvitationList;
