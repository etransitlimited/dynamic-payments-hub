
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DeferredLoad } from "@/utils/progressive-loading";
import PageHeader from "../components/PageHeader";
import InvitationCodeCard from "./components/InvitationCodeCard";
import RewardRulesCard from "./components/RewardRulesCard";
import InvitationRecordsCard from "./components/InvitationRecordsCard";

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
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <PageHeader title={t("invitation.title")} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 flex">
          <DeferredLoad
            placeholder={
              <div className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg animate-pulse h-auto rounded-lg min-h-[16rem] w-full"></div>
            }
          >
            <InvitationCodeCard />
          </DeferredLoad>
        </div>
        
        <div className="flex">
          <DeferredLoad
            placeholder={
              <div className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg animate-pulse h-full rounded-lg min-h-[16rem] w-full"></div>
            }
          >
            <RewardRulesCard />
          </DeferredLoad>
        </div>
      </div>
      
      <DeferredLoad
        placeholder={
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg animate-pulse h-72 rounded-lg"></div>
        }
      >
        <InvitationRecordsCard invitees={invitees} isLoading={isLoading} />
      </DeferredLoad>
    </div>
  );
};

export default InvitationList;
