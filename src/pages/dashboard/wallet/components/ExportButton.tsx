
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getFundDetailsTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";

const ExportButton = () => {
  const { language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState(`export-${language}-${Date.now()}`);
  
  // Update language state when it changes
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`ExportButton language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language as LanguageCode);
      setForceUpdateKey(`export-${language}-${Date.now()}`);
    }
  }, [language, currentLanguage]);
  
  const getTranslation = (key: string): string => {
    return getFundDetailsTranslation(key, currentLanguage);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
      className="flex justify-end mb-6"
      key={forceUpdateKey}
      data-language={currentLanguage}
    >
      <Button
        variant="default"
        className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
        onClick={() => console.log("Export report")}
      >
        <Download className="h-4 w-4" />
        <span>{getTranslation('exportReport')}</span>
      </Button>
    </motion.div>
  );
};

export default ExportButton;
