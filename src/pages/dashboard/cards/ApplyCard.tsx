
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "./components/PageTitle";
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
      className="container px-4 mx-auto py-6 space-y-6"
    >
      <div className="w-full">
        <PageTitle title={t("cards.apply.title")} />
      </div>
      
      <motion.div 
        variants={itemVariants}
        className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PersonalInfoCard 
                birthdate={birthdate} 
                setBirthdate={setBirthdate} 
              />
            </div>
            <div>
              <ApplicationGuideCard />
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 p-6">
          <CardInfoCard />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ApplyCard;
