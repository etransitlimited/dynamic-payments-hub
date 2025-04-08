
import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionChartsSection from "./components/TransactionChartsSection";
import TransactionSearch from "./components/TransactionSearch";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useToast } from "@/hooks/use-toast";
import { getTransactionTranslation } from "./i18n";
import PageLayout from "@/components/dashboard/PageLayout";
import { LanguageCode } from "@/utils/languageUtils";

const TransactionsPage = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const stableLanguage = useRef(language);
  const [pageKey, setPageKey] = useState(`transactions-page-${Date.now()}`);
  
  // Store the current language in a ref to detect actual changes
  useEffect(() => {
    if (stableLanguage.current !== language) {
      console.log(`TransactionsPage: Language changed from ${stableLanguage.current} to ${language}`);
      stableLanguage.current = language;
      setPageKey(`transactions-page-${language}-${refreshCounter}-${Date.now()}`);
    }
  }, [language, refreshCounter]);
  
  // Get memoized translations to prevent re-renders
  const translations = useMemo(() => ({
    pageTitle: getTransactionTranslation("pageTitle", language as LanguageCode),
    filter: getTransactionTranslation("filter", language as LanguageCode),
    filterApplied: getTransactionTranslation("filterApplied", language as LanguageCode),
    dateRange: getTransactionTranslation("dateRange", language as LanguageCode),
    dateFilterApplied: getTransactionTranslation("dateFilterApplied", language as LanguageCode),
    viewDetails: getTransactionTranslation("viewDetails", language as LanguageCode) 
  }), [language]);
  
  // Update document title when language changes
  useEffect(() => {
    document.title = `${translations.pageTitle} | Dashboard`;
  }, [translations.pageTitle]);
  
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
  
  return (
    <PageLayout
      animationKey={pageKey}
      headerContent={<TransactionPageHeader />}
    >
      {/* Stat cards */}
      <TransactionStatCards key={`stat-cards-${language}-${refreshCounter}`} />
      
      {/* Search and filters */}
      <div className="my-5 sm:my-6">
        <TransactionSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFilterClick={handleFilterClick}
          onDateFilterClick={handleDateFilterClick}
          key={`search-${language}-${refreshCounter}`}
        />
      </div>
      
      {/* Transaction table and charts */}
      <div className="space-y-5 sm:space-y-6">
        {/* Transaction table - filtered for last 24 hours */}
        <div>
          <TransactionTableSection 
            filterMode="last24Hours" 
            key={`table-section-${language}-${refreshCounter}`}
          />
        </div>
        
        {/* Charts and analytics */}
        <div>
          <TransactionChartsSection key={`charts-section-${language}-${refreshCounter}`} />
        </div>
      </div>
    </PageLayout>
  );
};

export default TransactionsPage;
