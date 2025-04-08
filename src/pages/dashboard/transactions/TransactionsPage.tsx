import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionChartsSection from "./components/TransactionChartsSection";
import TransactionSearch from "./components/TransactionSearch";
import { useToast } from "@/hooks/use-toast";
import { getTransactionTranslation } from "./i18n";
import PageLayout from "@/components/dashboard/PageLayout";
import { LanguageCode } from "@/utils/languageUtils";
import { useTranslation } from "@/context/TranslationProvider";
import { useLanguage } from "@/context/LanguageContext";

// Use React.memo to prevent unnecessary re-renders
const TransactionsPage = React.memo(() => {
  const { currentLanguage } = useTranslation();
  const { lastUpdate } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const previousLanguage = useRef(currentLanguage);
  const renderCount = useRef(0);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUpdating = useRef(false);
  
  // Keep track of renders for debugging
  renderCount.current += 1;
  console.log(`TransactionsPage render #${renderCount.current}, language: ${currentLanguage}`);
  
  // Get memoized translations to prevent re-renders
  const translations = useMemo(() => ({
    pageTitle: getTransactionTranslation("pageTitle", currentLanguage as LanguageCode),
    filter: getTransactionTranslation("filter", currentLanguage as LanguageCode),
    filterApplied: getTransactionTranslation("filterApplied", currentLanguage as LanguageCode),
    dateRange: getTransactionTranslation("dateRange", currentLanguage as LanguageCode),
    dateFilterApplied: getTransactionTranslation("dateFilterApplied", currentLanguage as LanguageCode),
    viewDetails: getTransactionTranslation("viewDetails", currentLanguage as LanguageCode) 
  }), [currentLanguage]);
  
  // Update document title when language changes
  useEffect(() => {
    document.title = `${translations.pageTitle} | Dashboard`;
  }, [translations.pageTitle]);
  
  // Handle global language change events with debouncing
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      // Skip if already processing an update
      if (isUpdating.current) return;
      
      // Clear any pending update
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      
      isUpdating.current = true;
      
      // Debounce update
      updateTimeoutRef.current = setTimeout(() => {
        if (previousLanguage.current !== currentLanguage) {
          console.log(`TransactionsPage language changed from ${previousLanguage.current} to ${currentLanguage}`);
          previousLanguage.current = currentLanguage;
        }
        isUpdating.current = false;
      }, 300);
    };

    // Listen for the language change custom event
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      document.removeEventListener('languageChanged', handleLanguageChange);
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [currentLanguage]);
  
  const handleFilterClick = useCallback(() => {
    toast({
      title: translations.filter,
      description: translations.filterApplied,
      variant: "default"
    });
  }, [toast, translations]);

  const handleDateFilterClick = useCallback(() => {
    toast({
      title: translations.dateRange,
      description: translations.dateFilterApplied,
      variant: "default"
    });
  }, [toast, translations]);
  
  // Create a stable layout component that doesn't re-render with language changes
  const PageContent = useMemo(() => {
    return (
      <PageLayout
        headerContent={<TransactionPageHeader />}
        data-language={currentLanguage}
      >
        {/* Stat cards */}
        <TransactionStatCards />
        
        {/* Search and filters */}
        <div className="my-5 sm:my-6">
          <TransactionSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onFilterClick={handleFilterClick}
            onDateFilterClick={handleDateFilterClick}
          />
        </div>
        
        {/* Transaction table and charts */}
        <div className="space-y-5 sm:space-y-6">
          {/* Transaction table - filtered for last 24 hours */}
          <div>
            <TransactionTableSection filterMode="last24Hours" />
          </div>
          
          {/* Charts and analytics */}
          <div>
            <TransactionChartsSection />
          </div>
        </div>
      </PageLayout>
    );
  }, [searchQuery, handleFilterClick, handleDateFilterClick, currentLanguage]);
  
  return PageContent;
});

TransactionsPage.displayName = 'TransactionsPage';

export default TransactionsPage;
