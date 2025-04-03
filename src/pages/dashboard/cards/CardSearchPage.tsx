
import React, { useState } from "react";
import { motion } from "framer-motion";
import CardSearchHeader from "./components/CardSearchHeader";
import CardSearchFilters from "./components/CardSearchFilters";
import CardSearchResults from "./components/CardSearchResults";
import CardSearchPagination from "./components/CardSearchPagination";
import { usePageLanguage } from "@/hooks/use-page-language";

const CardSearchPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("cards.search.title", "Card Search");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get page title translation
  const pageTitle = getTranslation("cards.search.title", "Card Search");
  const pageSubtitle = getTranslation("cards.search.subtitle", "Search and manage your cards");

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
