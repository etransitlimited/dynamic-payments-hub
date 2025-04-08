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
  const { language } = useLanguage(); // Direct language access for stability
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const previousLanguage = useRef(currentLanguage);
  const renderCount = useRef(0);
  const stableLanguage = useRef(language as LanguageCode);
  
  // Keep track of renders for debugging
  renderCount.current += 1;
  console.log(`TransactionsPage render #${renderCount.current}, language: ${language}`);
  
  // Only update stable language reference when needed (prevents cascading updates)
  useEffect(() => {
    if (language !== stableLanguage.current) {
      stableLanguage.current = language as LanguageCode;
    }
  }, [language]);
  
  // Get memoized translations to prevent re-renders - using stable language ref
  const translations = useMemo(() => ({
    pageTitle: getTransactionTranslation("pageTitle", stableLanguage.current),
    filter: getTransactionTranslation("filter", stableLanguage.current),
    filterApplied: getTransactionTranslation("filterApplied", stableLanguage.current),
    dateRange: getTransactionTranslation("dateRange", stableLanguage.current),
    dateFilterApplied: getTransactionTranslation("dateFilterApplied", stableLanguage.current),
    viewDetails: getTransactionTranslation("viewDetails", stableLanguage.current) 
  }), [stableLanguage.current]);
  
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
  
  // Create a stable layout component that doesn't re-render with language changes
  const PageContent = useMemo(() => {
    return (
      <PageLayout
        headerContent={<TransactionPageHeader />}
        data-language={stableLanguage.current}
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
  }, [searchQuery, handleFilterClick, handleDateFilterClick]);
  
  return PageContent;
});

TransactionsPage.displayName = 'TransactionsPage';

export default TransactionsPage;
