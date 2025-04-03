
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";

// Mock components since the originals have issues
const CardSearchHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-white">{title}</h1>
    <p className="text-gray-400">{subtitle}</p>
  </div>
);

const CardSearchFilters = ({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<string>> }) => (
  <div className="bg-charcoal-light rounded-lg p-4">
    <input 
      type="text" 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search cards..."
      className="w-full p-2 rounded bg-charcoal border border-gray-700 text-white"
    />
  </div>
);

const CardSearchResults = () => (
  <div className="bg-charcoal-light rounded-lg p-6">
    <h2 className="text-xl font-semibold text-white mb-4">
      <TranslatedText keyName="cards.search.results" fallback="Search Results" />
    </h2>
    <p className="text-gray-400">
      <TranslatedText keyName="cards.search.noResults" fallback="No cards found matching your criteria." />
    </p>
  </div>
);

const CardSearchPagination = () => (
  <div className="flex justify-center">
    <button className="px-4 py-2 bg-blue-600 rounded text-white">
      <TranslatedText keyName="pagination.loadMore" fallback="Load More" />
    </button>
  </div>
);

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
