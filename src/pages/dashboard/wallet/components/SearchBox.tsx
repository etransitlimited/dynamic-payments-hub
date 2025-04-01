
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  onDateFilter?: () => void;
  initialSearchQuery?: string;
}

const SearchBox = ({ onSearch, onDateFilter, initialSearchQuery = "" }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText keyName="wallet.fundDetails.searchTransactions" fallback="Search Transactions" />
        </h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            className="pl-10 h-10 bg-charcoal-light/40 border-blue-900/20 text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500 rounded-lg"
            placeholder="Transaction ID, amount, or note..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-purple-500/30 text-purple-200 hover:bg-purple-900/20"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4 mr-2" />
            <TranslatedText keyName="common.search" fallback="Search" />
          </Button>
          
          <Button 
            variant="outline" 
            className="border-green-500/30 text-green-200 hover:bg-green-900/20"
            onClick={onDateFilter}
          >
            <Calendar className="h-4 w-4 mr-2" />
            <TranslatedText keyName="common.dateFilter" fallback="Date Filter" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
