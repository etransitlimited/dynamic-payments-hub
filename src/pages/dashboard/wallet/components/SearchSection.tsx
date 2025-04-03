
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getFundDetailsTranslation } from "../i18n";
import { useLanguage } from "@/context/LanguageContext";

interface SearchSectionProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ searchQuery, handleSearch }) => {
  const { language } = useLanguage();
  
  // Get translation directly
  const placeholderText = getFundDetailsTranslation('searchTransactions', language);
  
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
      className="relative"
      key={`search-section-${language}-${Date.now()}`}
      data-language={language}
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
      <Input
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholderText}
        className="pl-10 bg-purple-900/20 border-purple-500/30 text-white placeholder-purple-400 w-full focus:border-purple-500/50 focus:ring-purple-500/30"
      />
    </motion.div>
  );
};

export default SearchSection;
