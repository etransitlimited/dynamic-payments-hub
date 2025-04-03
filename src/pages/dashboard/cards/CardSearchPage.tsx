
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getDirectTranslation } from "@/utils/translationHelpers";
import CardSearchHeader from "./components/CardSearchHeader";
import CardSearchFilters from "./components/CardSearchFilters";
import CardSearchResults from "./components/CardSearchResults";
import CardSearchPagination from "./components/CardSearchPagination";
import TranslatedText from "@/components/translation/TranslatedText";
import { useLocation } from "react-router-dom";

const CardSearchPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [forceUpdateKey, setForceUpdateKey] = useState(`card-search-${language}-${Date.now()}`);
  const location = useLocation();
  
  // Force re-render when language changes OR when navigating to this page
  useEffect(() => {
    console.log(`CardSearchPage detected language: ${language}, path: ${location.pathname}`);
    setForceUpdateKey(`card-search-${language}-${Date.now()}`);
    
    // Update page title
    document.title = `${getDirectTranslation("cards.search.title", language, "Card Search")} | Dashboard`;
  }, [language, location.pathname]);

  // Get page title translation
  const pageTitle = getDirectTranslation("cards.search.title", language, "Card Search");
  const pageSubtitle = getDirectTranslation("cards.search.subtitle", language, "Search and manage your cards");

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
        subtitle={pageSubtitle}
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
