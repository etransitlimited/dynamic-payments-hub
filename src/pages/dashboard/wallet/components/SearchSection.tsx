
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface SearchSectionProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ searchQuery, handleSearch }) => {
  const { t } = useSafeTranslation();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(localSearch);
  };

  const clearSearch = () => {
    setLocalSearch('');
    handleSearch('');
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-800/30 p-6 rounded-xl">
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-medium text-white mb-3">
          {t("wallet.fundDetails.search")}
        </h3>
        
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={`${t("wallet.fundDetails.searchTransactions")}...`}
              className="bg-purple-950/50 border-purple-800/50 text-white placeholder:text-gray-400 pr-10"
            />
            {localSearch && (
              <button 
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <Button type="submit" className="bg-purple-700 hover:bg-purple-600 text-white">
            <Search className="mr-2 h-4 w-4" />
            {t("common.search")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchSection;
