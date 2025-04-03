
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageTitle from "./components/PageTitle";
import PersonalInfoCard from "./components/PersonalInfoCard";
import CardInfoCard from "./components/CardInfoCard";
import ApplicationGuideCard from "./components/ApplicationGuideCard";

// Mock props for PersonalInfoCard
interface PersonalInfoCardProps {
  birthdate: string;
  setBirthdate: React.Dispatch<React.SetStateAction<string>>;
}

const CardApplicationPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("cards.apply.title", "Apply for a Card");
  
  // Get translations
  const pageTitle = getTranslation("cards.apply.title", "Apply for a Card");
  const pageSubtitle = getTranslation("cards.apply.subtitle", "Complete the form to apply for a new card");
  
  // Add state for the birthdate
  const [birthdate, setBirthdate] = useState<string>("");
  
  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <PageTitle 
        title={pageTitle}
        subtitle={pageSubtitle}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PersonalInfoCard 
            birthdate={birthdate}
            setBirthdate={setBirthdate}
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
