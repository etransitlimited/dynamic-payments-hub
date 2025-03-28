
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface RebateSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const RebateSearch: React.FC<RebateSearchProps> = ({ searchQuery, setSearchQuery }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center mb-4 gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400/70" />
        <Input
          type="text"
          placeholder={t("invitation.search.placeholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-blue-950/50 border-blue-800/30 text-blue-100 placeholder:text-blue-400/50"
        />
      </div>
      <Button 
        variant="default" 
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {t("invitation.search.button")}
      </Button>
    </div>
  );
};

export default RebateSearch;
