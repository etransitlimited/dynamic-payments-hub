
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRebateTranslation } from "../hooks/useRebateTranslation";

interface RebateSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const RebateSearch: React.FC<RebateSearchProps> = ({ searchQuery, setSearchQuery }) => {
  const { t, language } = useRebateTranslation();
  
  // Force re-render when language changes
  const [componentKey, setComponentKey] = React.useState<string>(`rebate-search-${language}`);
  
  React.useEffect(() => {
    setComponentKey(`rebate-search-${language}-${Date.now()}`);
  }, [language]);
  
  return (
    <div className="w-full relative" key={componentKey} data-language={language}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-purple-300" />
        </div>
        <Input
          type="text"
          placeholder={t("searchHint")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-2 bg-charcoal border border-purple-900/30 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
        />
      </div>
      <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
        <span>
          {t("searchHint")}
        </span>
        <span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="text-purple-400 hover:text-neon-green transition-colors"
            >
              {t("reset")}
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default RebateSearch;
