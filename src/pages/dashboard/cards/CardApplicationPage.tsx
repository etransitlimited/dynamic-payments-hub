
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageTitle from "./components/PageTitle";
import PersonalInfoCard from "./components/PersonalInfoCard";
import CardInfoCard from "./components/CardInfoCard";
import ApplicationGuideCard from "./components/ApplicationGuideCard";
import TranslatedText from "@/components/translation/TranslatedText";

const CardApplicationPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("cards.apply.title", "Apply for a Card");
  
  const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setBirthdate(date);
    } else {
      setBirthdate(undefined);
    }
  };
  
  // Log language changes for debugging
  useEffect(() => {
    console.log(`CardApplicationPage language: ${language}, forceUpdateKey: ${forceUpdateKey}`);
  }, [language, forceUpdateKey]);
  
  return (
    <motion.div
      key={`application-${language}-${forceUpdateKey}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <PageTitle>
        <TranslatedText 
          keyName="cards.apply.title" 
          fallback={getTranslation("cards.apply.title", "Apply for Card")} 
        />
        <p className="text-sm text-gray-400 mt-1">
          <TranslatedText 
            keyName="cards.apply.subtitle" 
            fallback={getTranslation("cards.apply.subtitle", "Complete the form to apply for a new card")} 
          />
        </p>
      </PageTitle>
      
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
