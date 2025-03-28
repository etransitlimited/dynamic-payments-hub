
import React from "react";
import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface TransactionSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TransactionSearch: React.FC<TransactionSearchProps> = ({ 
  searchQuery, 
  setSearchQuery 
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex space-x-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
        <Input
          type="search"
          placeholder={t("transactions.searchTransactions")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-[300px] pl-8 bg-blue-950/50 border-blue-800 text-white placeholder:text-blue-400/70"
        />
      </div>
      <Button variant="outline" size="icon" className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white">
        <Filter size={18} />
      </Button>
      <Button variant="outline" size="icon" className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white">
        <Calendar size={18} />
      </Button>
    </div>
  );
};

export default TransactionSearch;
