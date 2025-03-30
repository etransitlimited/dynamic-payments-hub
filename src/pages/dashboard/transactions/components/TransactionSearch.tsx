
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
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
        <Input
          type="search"
          placeholder={t("transactions.searchTransactions")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${isMobile ? 'w-full' : 'w-full md:w-[300px]'} pl-8 bg-blue-950/50 border-blue-800 text-white placeholder:text-blue-400/70`}
        />
      </div>
      {isMobile ? (
        <div className="flex space-x-2 justify-end w-full">
          <Button 
            variant="outline" 
            size="icon" 
            className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white"
            onClick={onFilterClick}
          >
            <Filter size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white"
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
            className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white"
            onClick={onFilterClick}
          >
            <Filter size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white"
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
