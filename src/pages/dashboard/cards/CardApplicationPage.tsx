
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageTitle from "./components/PageTitle";
import PersonalInfoCard from "./components/PersonalInfoCard";
import CardInfoCard from "./components/CardInfoCard";
import ApplicationGuideCard from "./components/ApplicationGuideCard";
import TranslatedText from "@/components/translation/TranslatedText";

const CardApplicationPage: React.FC = () => {
  const { language, forceUpdateKey } = usePageLanguage("cards.apply.title", "Apply for a Card");
  
  // Add state for the birthdate
  const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
  
  // Date change handler that works with the PersonalInfoCard component
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setBirthdate(date);
    } else {
      setBirthdate(undefined);
    }
  };
  
  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <PageTitle 
        title={<TranslatedText keyName="cards.apply.title" />}
        subtitle={<TranslatedText keyName="cards.apply.subtitle" />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PersonalInfoCard 
            birthdate={birthdate}
            setBirthdate={handleDateChange}
          />
          <CardInfoCard />
        </div>
        <div className="lg:col-span-1">
          <ApplicationGuideCard />
        </div>
      </div>
    </motion.div>
  );
};

export default CardApplicationPage;
