
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { motion } from "framer-motion";
import { getFundDetailsTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";

interface SearchSectionProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ searchQuery, handleSearch }) => {
  const { language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState(`search-${language}-${Date.now()}`);
  
  // Force re-render when language changes
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`SearchSection language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language as LanguageCode);
      setForceUpdateKey(`search-${language}-${Date.now()}`);
    }
  }, [language, currentLanguage]);
  
  const getTranslation = (key: string): string => {
    return getFundDetailsTranslation(key, currentLanguage);
  };
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };
  
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="w-full mb-6"
      key={forceUpdateKey}
      data-language={currentLanguage}
    >
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" 
          size={18} 
        />
        <Input
          type="text"
          placeholder={getTranslation('searchTransactions')}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 bg-charcoal-dark/50 border-purple-900/30 text-white placeholder:text-purple-300/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
      </div>
    </motion.div>
  );
};

export default SearchSection;
