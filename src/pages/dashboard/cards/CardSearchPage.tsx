
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";
import CardSearchFilters from "./components/CardSearchFilters";
import CardSearchResults from "./components/CardSearchResults";
import CardSearchHeader from "./components/CardSearchHeader";
import CardSearchPagination from "./components/CardSearchPagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CardSearchPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("cards.search.title", "Card Search");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
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
      
      {/* Card Management Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <Card className="border-blue-800/40 bg-blue-950/30 hover:bg-blue-900/30 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-blue-100">
              <CreditCard className="h-4 w-4 mr-2 text-blue-400" />
              {getTranslation("cards.search.title", "Card Search")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-2 flex items-center">
            <span className="text-xs text-blue-300">{getTranslation("cards.search.cardList", "Current card list")}</span>
          </CardContent>
        </Card>
        
        <Card className="border-purple-800/40 bg-purple-950/30 hover:bg-purple-900/30 transition-colors cursor-pointer"
              onClick={() => navigate('/dashboard/cards/apply')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-purple-100">
              <CreditCard className="h-4 w-4 mr-2 text-purple-400" />
              {getTranslation("cards.apply.title", "Apply for Card")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-2 flex justify-between items-center">
            <span className="text-xs text-purple-300">{getTranslation("cards.apply.subtitle", "Apply for a new card")}</span>
            <ArrowRightCircle className="h-4 w-4 text-purple-400" />
          </CardContent>
        </Card>
        
        <Card className="border-green-800/40 bg-green-950/30 hover:bg-green-900/30 transition-colors cursor-pointer"
              onClick={() => navigate('/dashboard/cards/activation')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center text-green-100">
              <CreditCard className="h-4 w-4 mr-2 text-green-400" />
              {getTranslation("cards.activationTasks.title", "Activation Tasks")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-2 flex justify-between items-center">
            <span className="text-xs text-green-300">{getTranslation("cards.activationTasks.manageCardTasks", "Manage activation tasks")}</span>
            <ArrowRightCircle className="h-4 w-4 text-green-400" />
          </CardContent>
        </Card>
      </div>
      
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
