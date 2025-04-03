
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getDirectTranslation } from "@/utils/translationHelpers";
import CardSearchHeader from "./components/CardSearchHeader";
import CardSearchFilters from "./components/CardSearchFilters";
import CardSearchResults from "./components/CardSearchResults";
import CardSearchPagination from "./components/CardSearchPagination";
import TranslatedText from "@/components/translation/TranslatedText";

const CardSearchPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [forceUpdateKey, setForceUpdateKey] = useState(`card-search-${language}-${Date.now()}`);
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`CardSearchPage detected language change to: ${language}`);
    setForceUpdateKey(`card-search-${language}-${Date.now()}`);
    
    // Update page title
    document.title = `${getDirectTranslation("cards.search.pageTitle", language, "Card Search")} | Dashboard`;
  }, [language]);

  // Get page title translation
  const pageTitle = getDirectTranslation("cards.search.pageTitle", language, "Card Search");

  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <CardSearchHeader 
        title={pageTitle}
        subtitle={getDirectTranslation("cards.search.subtitle", language, "Search and manage your cards")}
      />
      
      <CardSearchFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <CardSearchResults />
      
      <CardSearchPagination />
    </motion.div>
  );
};

export default CardSearchPage;
