
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DeferredLoad } from "@/utils/progressive-loading";
import PageHeader from "../components/PageHeader";
import InvitationCodeCard from "./components/InvitationCodeCard";
import RewardRulesCard from "./components/RewardRulesCard";
import InvitationRecordsCard from "./components/InvitationRecordsCard";
import { Progress } from "@/components/ui/progress";
import { Users, PiggyBank, TrendingUp } from "lucide-react";

// Stats Component
const InvitationStats = () => {
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(78), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="stats-card flex flex-col animate-float">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300">{t("invitation.stats.invited")}</h3>
            <p className="text-2xl font-bold text-white mt-1">24</p>
          </div>
          <div className="p-2 bg-purple-900/30 rounded-lg">
            <Users size={20} className="text-purple-400" />
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">{t("invitation.monthlyTarget")}</span>
            <span className="text-neon-green">78%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
      
      <div className="stats-card flex flex-col animate-float">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300">{t("invitation.stats.totalRebate")}</h3>
            <p className="text-2xl font-bold text-white mt-1">$1,245.88</p>
          </div>
          <div className="p-2 bg-purple-900/30 rounded-lg">
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
      
      <div className="stats-card flex flex-col animate-float">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300">{t("invitation.conversionRate")}</h3>
            <p className="text-2xl font-bold text-white mt-1">65.4%</p>
          </div>
          <div className="p-2 bg-purple-900/30 rounded-lg">
            <TrendingUp size={20} className="text-purple-400" />
          </div>
        </div>
        <div className="mt-auto">
          <div className="radial-chart grid grid-cols-5 gap-1 mt-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full ${i < 7 ? 'bg-purple-500' : 'bg-charcoal-dark'}`}
              ></div>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-2">{t("invitation.activationRatio")}</div>
        </div>
      </div>
    </div>
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
      <PageHeader 
        title={t("invitation.title")} 
        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300" 
      />
      
      {/* Stats Section */}
      <InvitationStats />
      
      {/* Top cards section with refined grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 h-full flex">
          <div className="w-full">
            <DeferredLoad
              placeholder={
                <div className="bg-charcoal-light animate-pulse rounded-xl min-h-[16rem] w-full border border-purple-900/20"></div>
              }
            >
              <InvitationCodeCard />
            </DeferredLoad>
          </div>
        </div>
        
        <div className="h-full flex">
          <div className="w-full">
            <DeferredLoad
              placeholder={
                <div className="bg-charcoal-light animate-pulse rounded-xl min-h-[16rem] w-full border border-purple-900/20"></div>
              }
            >
              <RewardRulesCard />
            </DeferredLoad>
          </div>
        </div>
      </div>
      
      {/* Records section with improved spacing */}
      <div className="w-full">
        <DeferredLoad
          placeholder={
            <div className="bg-charcoal-light animate-pulse h-72 rounded-xl w-full border border-purple-900/20"></div>
          }
        >
          <InvitationRecordsCard invitees={invitees} isLoading={isLoading} />
        </DeferredLoad>
      </div>
    </div>
  );
};

export default InvitationList;
