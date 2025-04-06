
import React, { memo, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getFundDetailsTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";

const ViewAllLink = () => {
  const { language, refreshCounter } = useSafeTranslation();
  
  // Memoize the translation to prevent unnecessary re-renders
  const viewAllText = useMemo(() => {
    console.log(`Refreshing viewAllText translation with language: ${language}, counter: ${refreshCounter}`);
    return getFundDetailsTranslation('viewAllRecords', language as LanguageCode);
  }, [language, refreshCounter]);
  
  // Create a stable key for animations that changes only when language changes
  const animationKey = useMemo(() => 
    `view-all-${language}-${refreshCounter}`, 
    [language, refreshCounter]
  );
  
  return (
    <motion.div 
      className="flex justify-center mt-8 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      key={animationKey}
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

export default memo(ViewAllLink);
