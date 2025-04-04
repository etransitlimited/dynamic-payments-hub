
import React, { useState, useEffect } from "react";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";
import CardSearchFilters from "./components/CardSearchFilters";
import CardSearchResults from "./components/CardSearchResults";
import CardSearchHeader from "./components/CardSearchHeader";
import CardSearchPagination from "./components/CardSearchPagination";
import { CreditCard } from "lucide-react";
import PageLayout from "@/components/dashboard/PageLayout";
import PageNavigation from "@/components/dashboard/PageNavigation";

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
  
  // Define navigation items for cards section
  const navigationItems = [
    {
      path: "/dashboard/cards/search",
      title: getTranslation("cards.search.title", "Card Search"),
      subtitle: getTranslation("cards.search.cardList", "Current card list"),
      icon: <CreditCard className="h-4 w-4 mr-2 text-purple-400" />,
      isActive: true
    },
    {
      path: "/dashboard/cards/apply",
      title: getTranslation("cards.apply.title", "Apply for Card"),
      subtitle: getTranslation("cards.apply.subtitle", "Apply for a new card"),
      icon: <CreditCard className="h-4 w-4 mr-2 text-blue-400" />,
      isActive: false
    },
    {
      path: "/dashboard/cards/activation",
      title: getTranslation("cards.activationTasks.title", "Activation Tasks"),
      subtitle: getTranslation("cards.activationTasks.manageCardTasks", "Manage activation tasks"),
      icon: <CreditCard className="h-4 w-4 mr-2 text-green-400" />,
      isActive: false
    }
  ];
  
  return (
    <PageLayout
      animationKey={forceUpdateKey}
      title={<TranslatedText keyName="cards.search.title" />}
      subtitle={<TranslatedText keyName="cards.search.searchCriteria" />}
      headerContent={<PageNavigation items={navigationItems} />}
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
