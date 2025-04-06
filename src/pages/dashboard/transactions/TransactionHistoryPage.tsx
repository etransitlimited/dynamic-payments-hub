
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
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceRefreshKey, setForceRefreshKey] = useState(Date.now());
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Get memoized translations to prevent re-renders
  const translations = useMemo(() => ({
    pageTitle: getTransactionTranslation("history", language),
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
    `transaction-history-${currentLanguage}`,
    [currentLanguage]
  );

  return (
    <PageLayout
      animationKey={animationKey}
      headerContent={<TransactionPageHeader />}
    >
      {/* Search and filters */}
      <div className="mb-5 sm:mb-6">
        <TransactionSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFilterClick={handleFilterClick}
          onDateFilterClick={handleDateFilterClick}
        />
      </div>
      
      {/* Transaction table */}
      <div className="space-y-5 sm:space-y-6">
        <TransactionTableSection filterMode="allTransactions" />
      </div>
    </PageLayout>
  );
};

export default TransactionHistoryPage;
