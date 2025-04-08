
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

const TransactionsPage = () => {
  const { currentLanguage } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const previousLanguage = useRef(currentLanguage);
  const [pageKey, setPageKey] = useState(`transactions-page-${Date.now()}`);
  
  // Update page key when language changes to force re-render
  useEffect(() => {
    if (previousLanguage.current !== currentLanguage) {
      console.log(`TransactionsPage: Language changed from ${previousLanguage.current} to ${currentLanguage}`);
      previousLanguage.current = currentLanguage;
      setPageKey(`transactions-page-${currentLanguage}-${Date.now()}`);
    }
  }, [currentLanguage]);
  
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
      headerContent={<TransactionPageHeader key={`header-${currentLanguage}`} />}
    >
      {/* Stat cards */}
      <TransactionStatCards key={`stat-cards-${currentLanguage}`} />
      
      {/* Search and filters */}
      <div className="my-5 sm:my-6">
        <TransactionSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFilterClick={handleFilterClick}
          onDateFilterClick={handleDateFilterClick}
          key={`search-${currentLanguage}`}
        />
      </div>
      
      {/* Transaction table and charts */}
      <div className="space-y-5 sm:space-y-6">
        {/* Transaction table - filtered for last 24 hours */}
        <div>
          <TransactionTableSection 
            filterMode="last24Hours" 
            key={`table-section-${currentLanguage}`}
          />
        </div>
        
        {/* Charts and analytics */}
        <div>
          <TransactionChartsSection key={`charts-section-${currentLanguage}`} />
        </div>
      </div>
    </PageLayout>
  );
};

export default TransactionsPage;
