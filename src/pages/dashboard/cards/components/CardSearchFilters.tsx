
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { getDirectTranslation } from "@/utils/translationHelpers";

interface CardSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CardSearchFilters: React.FC<CardSearchFiltersProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  const { language } = useLanguage();
  
  // Get translations
  const searchPlaceholder = getDirectTranslation("cards.search.searchPlaceholder", language, "Search by card number, name or status...");
  const filterButtonText = getDirectTranslation("cards.search.filter", language, "Filter");
  const advancedSearchText = getDirectTranslation("cards.search.advancedSearch", language, "Advanced Search");
  
  return (
    <Card className="border-blue-900/30 bg-gradient-to-br from-blue-950/40 to-blue-900/20 backdrop-blur-sm overflow-hidden shadow-lg">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 items-stretch md:items-center">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-blue-950/70 border-blue-800/50 text-white w-full"
            />
          </div>
          
          {/* Filter button */}
          <Button 
            variant="outline" 
            className="bg-blue-900/50 hover:bg-blue-800/60 text-white border-blue-700/40"
          >
            <Filter className="h-4 w-4 mr-2" />
            {filterButtonText}
          </Button>
          
          {/* Advanced search button */}
          <Button 
            variant="outline" 
            className="bg-blue-900/50 hover:bg-blue-800/60 text-white border-blue-700/40"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {advancedSearchText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSearchFilters;
