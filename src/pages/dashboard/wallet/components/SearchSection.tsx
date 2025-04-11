
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { getFundDetailsTranslation } from "../i18n";

interface SearchSectionProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ searchQuery, handleSearch }) => {
  const { language } = useLanguage();
  
  // Function to get direct translations
  const getTranslation = (key: string): string => {
    return getFundDetailsTranslation(key, language);
  };
  
  return (
    <Card className="bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/30 shadow-md">
      <CardContent className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300/70 h-4 w-4" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={getTranslation('searchTransactions')}
            className="pl-9 bg-charcoal-dark border-purple-900/40 focus:border-purple-700/70 text-white placeholder-purple-300/50 rounded-md"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchSection;
