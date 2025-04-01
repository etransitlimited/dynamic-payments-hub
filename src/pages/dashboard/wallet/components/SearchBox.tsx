
import React, { useState } from "react";
import { Search, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  onDateFilter?: () => void;
  initialSearchQuery?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  onSearch, 
  onDateFilter,
  initialSearchQuery = "" 
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const { t } = useLanguage();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  return (
    <form onSubmit={handleSearchSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-9 bg-charcoal-dark border-purple-900/20 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/30"
            placeholder={t("wallet.fundDetails.searchPlaceholder")}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex space-x-2 self-end">
          <Button
            type="button"
            variant="outline"
            className="gap-2 border-purple-900/20 hover:bg-purple-900/30 hover:text-white"
            onClick={onDateFilter}
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">{t("wallet.fundDetails.dateFilter")}</span>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="gap-2 border-purple-900/20 hover:bg-purple-900/30 hover:text-white"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">{t("common.filter")}</span>
          </Button>
          
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700"
          >
            {t("common.search")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBox;
