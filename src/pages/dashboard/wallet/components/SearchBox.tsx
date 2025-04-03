
import React, { useState, useEffect } from "react";
import { Search, CalendarRange, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import TranslatedText from "@/components/translation/TranslatedText";

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
  const { t, language } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  
  // 监听语言变化
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`SearchBox language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language);
    }
  }, [language, currentLanguage]);
  
  // 同步外部传入的查询
  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full" key={`search-box-${currentLanguage}`}>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 w-full">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("wallet.fundDetails.searchTransactions", "Search transactions")}
            className="w-full pl-10 pr-10 py-2.5 bg-charcoal-dark/40 border border-purple-500/20 shadow-inner 
                      text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 
                      focus:border-transparent transition duration-200"
            key={`search-input-${currentLanguage}`}
          />
          
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex space-x-2">
          {onDateFilter && (
            <Button
              variant="outline"
              onClick={onDateFilter}
              className="bg-charcoal-dark/40 border-purple-500/20 text-purple-200 hover:bg-purple-900/40 transition-all"
            >
              <CalendarRange className="mr-2 h-4 w-4" />
              <TranslatedText keyName="common.selectDate" fallback="Select Date" key={`select-date-${currentLanguage}`} />
            </Button>
          )}
          
          <Button 
            onClick={handleSearch}
            className="bg-purple-600 hover:bg-purple-700 text-white transition-all"
          >
            <Search className="mr-2 h-4 w-4" />
            <TranslatedText keyName="common.search" fallback="Search" key={`search-btn-${currentLanguage}`} />
          </Button>
        </div>
      </div>
      
      {searchQuery && (
        <div className="text-sm text-purple-300 animate-fade-in flex items-center">
          <TranslatedText keyName="common.searchingFor" fallback="Searching for:" key={`searching-for-${currentLanguage}`} /> 
          <span className="ml-1 font-medium">{searchQuery}</span>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
