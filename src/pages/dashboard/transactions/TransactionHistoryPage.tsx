
import React, { useState, useEffect, useCallback } from "react";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionSearch from "./components/TransactionSearch";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useToast } from "@/hooks/use-toast";
import { getTransactionTranslation } from "./i18n";
import PageLayout from "@/components/dashboard/PageLayout";

const TransactionHistoryPage = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [forceRefreshKey, setForceRefreshKey] = useState(Date.now());
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Update language state when it changes to force re-render
  useEffect(() => {
    if (language !== currentLanguage || refreshCounter > 0) {
      console.log(`Language changed from ${currentLanguage} to ${language}, triggering re-render (refresh #${refreshCounter})`);
      setCurrentLanguage(language);
      setForceRefreshKey(Date.now()); // Force re-render of the entire page
      
      // Update the document title with the new language
      document.title = `${getTransactionTranslation("history", language)} | Dashboard`;
    }
  }, [language, currentLanguage, refreshCounter]);

  const handleFilterClick = useCallback(() => {
    toast({
      title: getTransactionTranslation("filter", language),
      description: getTransactionTranslation("filterApplied", language),
      variant: "default"
    });
    console.log("Filter button clicked");
  }, [toast, language]);

  const handleDateFilterClick = useCallback(() => {
    toast({
      title: getTransactionTranslation("dateRange", language),
      description: getTransactionTranslation("dateFilterApplied", language),
      variant: "default"
    });
    console.log("Date filter button clicked");
  }, [toast, language]);

  return (
    <PageLayout
      animationKey={`transaction-history-page-${currentLanguage}-${forceRefreshKey}`}
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
