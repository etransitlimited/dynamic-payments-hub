
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

interface RebateSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const RebateSearch: React.FC<RebateSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-purple-300" />
        </div>
        <Input
          type="text"
          placeholder="Search rebate records..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-2 bg-charcoal border border-purple-900/30 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
        />
      </div>
      <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
        <span>
          <TranslatedText 
            keyName="invitation.rebate.searchHint" 
            fallback="Search by ID or invitee name"
          />
        </span>
        <span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="text-purple-400 hover:text-neon-green transition-colors"
            >
              <TranslatedText keyName="common.reset" fallback="Reset" />
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default RebateSearch;
