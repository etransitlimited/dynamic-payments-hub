
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { getFundDetailsTranslation } from "../i18n";

const ExportButton: React.FC = () => {
  const { language } = useLanguage();
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Get translation directly
  const buttonText = getFundDetailsTranslation('exportReport', language);
  
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
      className="flex justify-end"
      key={`export-button-${language}-${forceUpdateKey}`}
      data-language={language}
    >
      <Button 
        variant="outline" 
        className="bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all duration-300"
      >
        <Download size={16} className="mr-2" />
        {buttonText}
      </Button>
    </motion.div>
  );
};

export default ExportButton;
