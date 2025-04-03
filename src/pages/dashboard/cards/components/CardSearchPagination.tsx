
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getDirectTranslation } from "@/utils/translationHelpers";

const CardSearchPagination: React.FC = () => {
  const { language } = useLanguage();
  
  // Get translations
  const prevText = getDirectTranslation("pagination.previous", language, "Previous");
  const nextText = getDirectTranslation("pagination.next", language, "Next");
  const showingText = getDirectTranslation("pagination.showing", language, "Showing");
  const ofText = getDirectTranslation("pagination.of", language, "of");
  const entriesText = getDirectTranslation("pagination.entries", language, "entries");
  
  return (
    <div className="flex items-center justify-between" data-language={language}>
      <p className="text-sm text-gray-400">
        {showingText} 1-3 {ofText} 3 {entriesText}
      </p>
      
      <div className="flex space-x-2">
        <button className="px-3 py-1 bg-blue-900/30 hover:bg-blue-800/40 text-blue-300 text-sm rounded-md border border-blue-800/30 flex items-center">
          <ChevronLeft className="h-3 w-3 mr-1" />
          {prevText}
        </button>
        
        <button className="px-3 py-1 bg-blue-900/30 hover:bg-blue-800/40 text-blue-300 text-sm rounded-md border border-blue-800/30 flex items-center">
          {nextText}
          <ChevronRight className="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default CardSearchPagination;
