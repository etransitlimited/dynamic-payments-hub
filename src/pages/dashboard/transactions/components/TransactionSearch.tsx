
import React, { useRef, useEffect } from "react";
import { Calendar, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTransactionTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";
import { useLanguage } from "@/context/LanguageContext";

interface TransactionSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterClick: () => void;
  onDateFilterClick: () => void;
}

const TransactionSearch: React.FC<TransactionSearchProps> = ({
  searchQuery,
  setSearchQuery,
  onFilterClick,
  onDateFilterClick
}) => {
  const { language } = useLanguage();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const [uniqueKey, setUniqueKey] = React.useState(`search-component-${language}-${Date.now()}`);
  const placeholderRef = useRef<HTMLInputElement>(null);
  const filterTextRef = useRef<HTMLSpanElement>(null);
  const dateTextRef = useRef<HTMLSpanElement>(null);
  
  // Force refresh when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`TransactionSearch language updated to: ${language}`);
      languageRef.current = language as LanguageCode;
      setUniqueKey(`search-component-${language}-${Date.now()}`);
      
      // Update translations directly
      updateTranslations();
    }
  }, [language]);
  
  // Update translations directly in the DOM
  const updateTranslations = () => {
    const searchPlaceholder = getTransactionTranslation("searchTransactions", languageRef.current);
    const filterText = getTransactionTranslation("filter", languageRef.current);
    const dateRangeText = getTransactionTranslation("dateRange", languageRef.current);
    
    if (placeholderRef.current) placeholderRef.current.placeholder = searchPlaceholder;
    if (filterTextRef.current) filterTextRef.current.textContent = filterText;
    if (dateTextRef.current) dateTextRef.current.textContent = dateRangeText;
  };
  
  // Set up translation event listeners
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail && e.detail.language && e.detail.language !== languageRef.current) {
        languageRef.current = e.detail.language as LanguageCode;
        setUniqueKey(`search-component-${e.detail.language}-${Date.now()}`);
        
        // Update translations immediately when language changes
        updateTranslations();
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    // Initialize translations
    updateTranslations();
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <div 
      key={uniqueKey}
      className="flex flex-col sm:flex-row gap-3 sm:items-center"
      data-language={languageRef.current}
    >
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          ref={placeholderRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full bg-charcoal-dark text-white border border-purple-900/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          placeholder={getTransactionTranslation("searchTransactions", languageRef.current)}
        />
      </div>
      <div className="flex gap-2 sm:w-auto w-full">
        <Button
          onClick={onFilterClick}
          variant="outline"
          className="border-purple-900/30 hover:border-purple-600 bg-charcoal-dark text-gray-300 hover:text-white flex-1 sm:flex-none"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          <span ref={filterTextRef}>
            {getTransactionTranslation("filter", languageRef.current)}
          </span>
        </Button>
        <Button
          onClick={onDateFilterClick}
          variant="outline"
          className="border-purple-900/30 hover:border-purple-600 bg-charcoal-dark text-gray-300 hover:text-white flex-1 sm:flex-none"
        >
          <Calendar className="h-4 w-4 mr-2" />
          <span ref={dateTextRef}>
            {getTransactionTranslation("dateRange", languageRef.current)}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default TransactionSearch;
