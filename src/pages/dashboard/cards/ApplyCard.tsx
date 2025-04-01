
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "../components/PageHeader";
import PersonalInfoCard from "./components/PersonalInfoCard";
import ApplicationGuideCard from "./components/ApplicationGuideCard";
import CardInfoCard from "./components/CardInfoCard";
import { motion } from "framer-motion";

const ApplyCard = () => {
  const { t } = useLanguage();
  const [birthdate, setBirthdate] = useState<Date | undefined>(undefined);
  
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
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 container px-4 py-6 mx-auto"
    >
      <PageHeader title={t("cards.apply.title")} />
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PersonalInfoCard 
          birthdate={birthdate} 
          setBirthdate={setBirthdate} 
        />
        <ApplicationGuideCard />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <CardInfoCard />
      </motion.div>
    </motion.div>
  );
};

export default ApplyCard;
