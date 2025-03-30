
import React from "react";
import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface TransactionSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterClick?: () => void;
  onDateFilterClick?: () => void;
}

const TransactionSearch: React.FC<TransactionSearchProps> = ({ 
  searchQuery, 
  setSearchQuery,
  onFilterClick,
  onDateFilterClick
}) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-2 w-full' : 'space-x-2'}`}>
      <div className={`relative ${isMobile ? 'w-full' : ''}`}>
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-purple-300" />
        <Input
          type="search"
          placeholder={t("transactions.searchTransactions")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${isMobile ? 'w-full' : 'w-full md:w-[300px]'} pl-8 bg-purple-950/80 border-purple-400/60 text-white placeholder:text-purple-300/70`}
        />
      </div>
      {isMobile ? (
        <div className="flex space-x-2 justify-end w-full">
          <Button 
            variant="outline" 
            size="icon" 
            className="border-purple-400/60 bg-purple-900/80 text-purple-300 hover:bg-purple-800/70 hover:text-white"
            onClick={onFilterClick}
          >
            <Filter size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-purple-400/60 bg-purple-900/80 text-purple-300 hover:bg-purple-800/70 hover:text-white"
            onClick={onDateFilterClick}
          >
            <Calendar size={18} />
          </Button>
        </div>
      ) : (
        <>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-purple-400/60 bg-purple-900/80 text-purple-300 hover:bg-purple-800/70 hover:text-white"
            onClick={onFilterClick}
          >
            <Filter size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-purple-400/60 bg-purple-900/80 text-purple-300 hover:bg-purple-800/70 hover:text-white"
            onClick={onDateFilterClick}
          >
            <Calendar size={18} />
          </Button>
        </>
      )}
    </div>
  );
};

export default TransactionSearch;
