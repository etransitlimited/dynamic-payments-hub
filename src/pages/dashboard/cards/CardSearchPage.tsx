
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";
import CardSearchFilters from "./components/CardSearchFilters";
import CardSearchResults from "./components/CardSearchResults";
import CardSearchHeader from "./components/CardSearchHeader";
import CardSearchPagination from "./components/CardSearchPagination";

const CardSearchPage: React.FC = () => {
  const { language, forceUpdateKey } = usePageLanguage("cards.search.title", "Card Search");
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <CardSearchHeader 
        title={<TranslatedText keyName="cards.search.title" />}
        subtitle={<TranslatedText keyName="cards.search.searchCriteria" />}
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
