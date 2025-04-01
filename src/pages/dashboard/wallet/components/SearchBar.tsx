
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, className = "" }) => {
  const { t } = useLanguage();
  
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="flex gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
        <Input
          placeholder={t("wallet.deposit.paymentMethod")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`pl-10 bg-purple-950/70 border-purple-700/50 text-white placeholder-purple-300/70 focus:ring-purple-500/50 focus:border-purple-500/50 hover:bg-purple-900/70 transition-colors ${className}`}
        />
      </div>
      <Button 
        onClick={handleSearch}
        className="gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-500/30"
      >
        <Search className="h-4 w-4" />
        <span>{t("wallet.depositRecords.filter")}</span>
      </Button>
    </div>
  );
};

export default SearchBar;
