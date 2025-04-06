
import React, { useState, useEffect, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getFundDetailsTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";
import { useTranslation } from "@/context/TranslationProvider";

const ViewAllLink = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const { currentLanguage } = useTranslation();
  const [forceUpdateKey, setForceUpdateKey] = useState<number>(Date.now());
  
  // Update the component when language changes
  useEffect(() => {
    console.log(`ViewAllLink language changed to ${language}`);
    setForceUpdateKey(Date.now());
  }, [language, currentLanguage, refreshCounter]);
  
  // Memoize the translation to prevent unnecessary re-renders
  const viewAllText = useMemo(() => {
    return getFundDetailsTranslation('viewAllRecords', language as LanguageCode);
  }, [language, forceUpdateKey]);
  
  return (
    <motion.div 
      className="flex justify-center mt-8 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      key={`view-all-${language}-${forceUpdateKey}`}
      data-language={language}
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
