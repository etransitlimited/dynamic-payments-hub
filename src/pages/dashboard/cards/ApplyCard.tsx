
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "./components/PageTitle";
import PersonalInfoCard from "./components/PersonalInfoCard";
import ApplicationGuideCard from "./components/ApplicationGuideCard";
import CardInfoCard from "./components/CardInfoCard";

const ApplyCard = () => {
  const { t } = useLanguage();
  const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
  
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageTitle title={t("cards.apply.title")} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PersonalInfoCard 
          birthdate={birthdate} 
          setBirthdate={setBirthdate} 
        />
        <ApplicationGuideCard />
      </div>
      
      <CardInfoCard />
    </div>
  );
};

export default ApplyCard;
