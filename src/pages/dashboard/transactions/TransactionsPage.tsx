
import React, { useState, useEffect, useCallback } from "react";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionChartsSection from "./components/TransactionChartsSection";
import TransactionSearch from "./components/TransactionSearch";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useToast } from "@/hooks/use-toast";
import { getTransactionTranslation } from "./i18n";
import PageLayout from "@/components/dashboard/PageLayout";

const TransactionsPage = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [forceRefreshKey, setForceRefreshKey] = useState(Date.now());
  const [isLast24Hours, setIsLast24Hours] = useState(true);
  const { toast } = useToast();
  
  // Update language state when it changes to force re-render
  useEffect(() => {
    if (language !== currentLanguage || refreshCounter > 0) {
      console.log(`Language changed from ${currentLanguage} to ${language}, triggering re-render (refresh #${refreshCounter})`);
      setCurrentLanguage(language);
      setForceRefreshKey(Date.now()); // Force re-render of the entire page
      
      // Update the document title with the new language
      document.title = `${getTransactionTranslation("pageTitle", language)} | Dashboard`;
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
      animationKey={`transaction-page-${currentLanguage}-${forceRefreshKey}`}
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
