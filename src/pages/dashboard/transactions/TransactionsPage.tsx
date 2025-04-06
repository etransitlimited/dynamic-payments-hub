
import React, { useState, useCallback, useMemo } from "react";
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
  const { language } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Get memoized translations to prevent re-renders
  const translations = useMemo(() => ({
    pageTitle: getTransactionTranslation("pageTitle", language),
    filter: getTransactionTranslation("filter", language),
    filterApplied: getTransactionTranslation("filterApplied", language),
    dateRange: getTransactionTranslation("dateRange", language),
    dateFilterApplied: getTransactionTranslation("dateFilterApplied", language),
  }), [language]);
  
  // Update document title when language changes
  useMemo(() => {
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
  
  // Create a more stable key for animations that changes only when language changes
  const animationKey = useMemo(() => 
    `transaction-page-${language}`,
    [language]
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
