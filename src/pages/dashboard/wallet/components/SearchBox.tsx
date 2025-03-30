
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SearchBoxProps {
  onSearch: (searchQuery: string) => void;
  onDateFilter?: () => void;
  className?: string;
  initialSearchQuery?: string;
}

const SearchBox = ({ 
  onSearch, 
  onDateFilter, 
  className = "",
  initialSearchQuery = ""
}: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // If search query is cleared, immediately trigger search with empty string
    if (value === "") {
      onSearch("");
    }
  };
  
  return (
    <Card className="border-gradient backdrop-blur-sm overflow-hidden" style={{ background: "linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))" }}>
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardContent className="relative z-10 p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-purple-200/80" />
            <Input 
              placeholder={t("wallet.fundDetails.search")}
              className="pl-10 border-purple-400/40 text-white placeholder-white/60 focus:ring-purple-300/60 focus:border-purple-300/50 hover:bg-purple-900/60 shadow-[inset_0_1px_5px_rgba(0,0,0,0.2)] transition-colors w-full"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
          
          {onDateFilter && (
            <Button 
              type="button"
              variant="outline" 
              onClick={onDateFilter}
              className="gap-2 min-w-[140px] sm:min-w-0"
            >
              <Calendar className="h-4 w-4" />
              <span className="sm:inline">{t("wallet.fundDetails.transactionTime")}</span>
            </Button>
          )}
          
          <Button 
            type="submit"
            className="gap-2 bg-purple-600/80 hover:bg-purple-500/80 text-white shadow-md shadow-purple-900/30 border border-purple-400/40 min-w-[140px] sm:min-w-0"
          >
            <Search className="h-4 w-4" />
            <span>{t("common.search")}</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchBox;
