
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
}

const SearchBox = ({ onSearch, onDateFilter, className = "" }: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  return (
    <Card className={`backdrop-blur-sm overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardContent className="relative z-10 p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-indigo-400" />
            <Input 
              placeholder={t("wallet.fundDetails.search")}
              className="pl-10 bg-indigo-950/70 border-indigo-700/50 text-white placeholder-indigo-300/60 focus:ring-indigo-500/50 focus:border-indigo-500/50 hover:bg-indigo-900/70 transition-colors w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {onDateFilter && (
            <Button 
              type="button"
              variant="outline" 
              onClick={onDateFilter}
              className="gap-2 border-indigo-600/60 text-white hover:bg-indigo-800/50 min-w-[140px] sm:min-w-0"
            >
              <Calendar className="h-4 w-4" />
              <span className="sm:inline">{t("wallet.fundDetails.transactionTime")}</span>
            </Button>
          )}
          
          <Button 
            type="submit"
            className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-500/30 min-w-[140px] sm:min-w-0"
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
