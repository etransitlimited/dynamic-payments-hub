
import React, { useState, useEffect } from "react";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";
import CardSearchFilters from "./components/CardSearchFilters";
import CardSearchResults from "./components/CardSearchResults";
import CardSearchHeader from "./components/CardSearchHeader";
import CardSearchPagination from "./components/CardSearchPagination";
import PageLayout from "@/components/dashboard/PageLayout";

const CardSearchPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("cards.search.title", "Card Search");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <PageLayout
      animationKey={forceUpdateKey}
      title={<TranslatedText keyName="cards.search.title" />}
      subtitle={<TranslatedText keyName="cards.search.searchCriteria" />}
    >
      <CardSearchFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <CardSearchResults />
      
      <CardSearchPagination />
    </PageLayout>
  );
};

export default CardSearchPage;
