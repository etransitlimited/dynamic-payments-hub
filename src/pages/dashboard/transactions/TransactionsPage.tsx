
import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceRefreshKey, setForceRefreshKey] = useState(Date.now());
  const { toast } = useToast();
  
  // Get memoized translations to prevent re-renders
  const translations = useMemo(() => ({
    pageTitle: getTransactionTranslation("pageTitle", language),
    filter: getTransactionTranslation("filter", language),
    filterApplied: getTransactionTranslation("filterApplied", language),
    dateRange: getTransactionTranslation("dateRange", language),
    dateFilterApplied: getTransactionTranslation("dateFilterApplied", language),
  }), [language]);
  
  // Update language state when it changes to force re-render
  useEffect(() => {
    if (language !== currentLanguage || refreshCounter > 0) {
      console.log(`Language changed from ${currentLanguage} to ${language}, triggering re-render (refresh #${refreshCounter})`);
      setCurrentLanguage(language as LanguageCode);
      
      // Don't force re-render the entire page for every small language change
      // Only update when the language actually changes
      if (language !== currentLanguage) {
        setForceRefreshKey(Date.now());
        
        // Update the document title with the new language
        document.title = `${translations.pageTitle} | Dashboard`;
      }
    }
  }, [language, currentLanguage, refreshCounter, translations.pageTitle]);
  
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
  
  // Create a more stable key for animations that doesn't change with every render
  const animationKey = useMemo(() => 
    `transaction-page-${currentLanguage}`,
    [currentLanguage]
  );
  
  return (
    <PageLayout
      animationKey={animationKey}
      headerContent={<TransactionPageHeader />}
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
};

export default TransactionsPage;
