
import React, { useState, useEffect, useCallback, useMemo } from "react";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionSearch from "./components/TransactionSearch";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useToast } from "@/hooks/use-toast";
import { getTransactionTranslation } from "./i18n";
import PageLayout from "@/components/dashboard/PageLayout";
import { LanguageCode } from "@/utils/languageUtils";

const TransactionHistoryPage = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [pageKey, setPageKey] = useState(`transaction-history-${Date.now()}`);
  
  // Update component key when language changes to force clean re-render
  useEffect(() => {
    setPageKey(`transaction-history-${language}-${refreshCounter}-${Date.now()}`);
  }, [language, refreshCounter]);
  
  // Get memoized translations to prevent re-renders
  const translations = useMemo(() => ({
    pageTitle: getTransactionTranslation("history", language as LanguageCode),
    filter: getTransactionTranslation("filter", language as LanguageCode),
    filterApplied: getTransactionTranslation("filterApplied", language as LanguageCode),
    dateRange: getTransactionTranslation("dateRange", language as LanguageCode),
    dateFilterApplied: getTransactionTranslation("dateFilterApplied", language as LanguageCode),
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
    console.log("Filter button clicked");
  }, [toast, translations]);

  const handleDateFilterClick = useCallback(() => {
    toast({
      title: translations.dateRange,
      description: translations.dateFilterApplied,
      variant: "default"
    });
    console.log("Date filter button clicked");
  }, [toast, translations]);

  return (
    <PageLayout
      animationKey={pageKey}
      headerContent={<TransactionPageHeader />}
    >
      {/* Search and filters */}
      <div className="mb-5 sm:mb-6">
        <TransactionSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFilterClick={handleFilterClick}
          onDateFilterClick={handleDateFilterClick}
          key={`search-${language}-${refreshCounter}`}
        />
      </div>
      
      {/* Transaction table */}
      <div className="space-y-5 sm:space-y-6">
        <TransactionTableSection 
          filterMode="allTransactions" 
          key={`table-section-${language}-${refreshCounter}`}
        />
      </div>
    </PageLayout>
  );
};

export default TransactionHistoryPage;
