
import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getFundDetailsTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";

const ViewAllLink = () => {
  const { language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState(`view-all-${language}-${Date.now()}`);
  
  // Force re-render when language changes
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`ViewAllLink language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language as LanguageCode);
      setForceUpdateKey(`view-all-${language}-${Date.now()}`);
    }
  }, [language, currentLanguage]);
  
  // Use a memo to cache the translation and reduce renders
  const viewAllText = React.useMemo(() => {
    return getFundDetailsTranslation('viewAllRecords', currentLanguage);
  }, [currentLanguage]);
  
  return (
    <motion.div 
      className="flex justify-center mt-8 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      key={forceUpdateKey}
      data-language={currentLanguage}
    >
      <a
        href="#"
        className="flex items-center text-purple-400 hover:text-purple-300 transition-colors group"
      >
        <span>{viewAllText}</span>
        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
};

export default ViewAllLink;
