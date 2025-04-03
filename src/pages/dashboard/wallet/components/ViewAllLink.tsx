
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getFundDetailsTranslation } from "../i18n";

const ViewAllLink: React.FC = () => {
  const { language } = useLanguage();
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Get translation directly
  const linkText = getFundDetailsTranslation('viewAllRecords', language);
  
  // Force re-render when language changes
  useEffect(() => {
    setForceUpdateKey(Date.now());
  }, [language]);
  
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
      variants={itemVariants} 
      className="flex items-center justify-center"
      key={`view-all-link-${language}-${forceUpdateKey}`}
      data-language={language}
    >
      <a href="#" className="inline-flex items-center text-blue-300 hover:text-blue-200 text-sm group">
        {linkText}
        <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
};

export default ViewAllLink;
