
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageTitle from "./components/PageTitle";
import PersonalInfoCard from "./components/PersonalInfoCard";
import CardInfoCard from "./components/CardInfoCard";
import ApplicationGuideCard from "./components/ApplicationGuideCard";

const CardApplicationPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("cards.apply.title", "Apply for a Card");
  
  // Get translations
  const pageTitle = getTranslation("cards.apply.title", "Apply for a Card");
  const pageSubtitle = getTranslation("cards.apply.subtitle", "Complete the form to apply for a new card");
  
  // Add state for the birthdate - using string for compatibility
  const [birthdate, setBirthdate] = useState<string>("");
  
  // Date change handler that works with the PersonalInfoCard component
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      // Convert to ISO string for storage
      setBirthdate(date.toISOString().split('T')[0]);
    } else {
      setBirthdate("");
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
        title={pageTitle}
        subtitle={pageSubtitle}
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
