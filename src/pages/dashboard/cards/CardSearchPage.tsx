
import React, { useState, useEffect } from "react";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";
import CardSearchFilters from "./components/CardSearchFilters";
import CardSearchResults from "./components/CardSearchResults";
import CardSearchPagination from "./components/CardSearchPagination";
import PageLayout from "@/components/dashboard/PageLayout";
import { AnimatePresence, motion } from "framer-motion";

const CardSearchPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("cards.search.title", "Card Search");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Reduce loading time to minimize flickering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };
  
  return (
    <PageLayout
      animationKey={`card-search-${language}`}
      title={<TranslatedText keyName="cards.search.title" />}
      subtitle={<TranslatedText keyName="cards.search.searchCriteria" />}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`card-search-content-${language}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="space-y-6"
        >
          <CardSearchFilters 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          
          <CardSearchResults />
          
          <CardSearchPagination />
        </motion.div>
      </AnimatePresence>
    </PageLayout>
  );
};

export default CardSearchPage;
