
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
  const [currentLang, setCurrentLang] = useState<LanguageCode>(language as LanguageCode);
  
  // Update the component when language changes
  useEffect(() => {
    if (currentLang !== language) {
      console.log(`ViewAllLink language changed from ${currentLang} to ${language}`);
      setCurrentLang(language as LanguageCode);
    }
  }, [language, currentLanguage, refreshCounter, currentLang]);
  
  // Memoize the translation to prevent unnecessary re-renders
  // Using currentLang as dependency to ensure fresh translations
  const viewAllText = useMemo(() => {
    return getFundDetailsTranslation('viewAllRecords', currentLang);
  }, [currentLang]);
  
  return (
    <motion.div 
      className="flex justify-center mt-8 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      key={`view-all-${currentLang}`}
      data-language={currentLang}
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
