
import React, { useState, useCallback, useMemo } from "react";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionSearch from "./components/TransactionSearch";
import { useToast } from "@/hooks/use-toast";
import { getTransactionTranslation } from "./i18n";
import PageLayout from "@/components/dashboard/PageLayout";
import { useLanguage } from "@/context/LanguageContext";
import { lazy, Suspense } from "react";
import PageTranslationWrapper from "@/components/translation/PageTranslationWrapper";

// Use lazy loading for heavier components
const LazyTransactionChartsSection = lazy(() => 
  import("./components/TransactionChartsSection").then(module => ({
    default: module.default
  }))
);

const TransactionsPage = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Stable translations with memoization
  const translations = useMemo(() => ({
    pageTitle: getTransactionTranslation("pageTitle", language),
    filter: getTransactionTranslation("filter", language),
    filterApplied: getTransactionTranslation("filterApplied", language),
    dateRange: getTransactionTranslation("dateRange", language),
    dateFilterApplied: getTransactionTranslation("dateFilterApplied", language),
    viewDetails: getTransactionTranslation("viewDetails", language) 
  }), [language]);
  
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
    <PageTranslationWrapper pageKey="transactions-page" pageName="Transactions">
      <PageLayout headerContent={<TransactionPageHeader />}>
        <TransactionStatCards />
        
        <div className="my-5 sm:my-6">
          <TransactionSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onFilterClick={handleFilterClick}
            onDateFilterClick={handleDateFilterClick}
          />
        </div>
        
        <div className="space-y-5 sm:space-y-6">
          <div>
            <TransactionTableSection filterMode="last24Hours" />
          </div>
          
          <div>
            <Suspense fallback={
              <div className="h-64 flex items-center justify-center bg-charcoal-light/30 rounded-lg">
                <div className="h-6 w-6 border-2 border-t-transparent border-neon-green rounded-full animate-spin"></div>
              </div>
            }>
              <LazyTransactionChartsSection />
            </Suspense>
          </div>
        </div>
      </PageLayout>
    </PageTranslationWrapper>
  );
};

export default React.memo(TransactionsPage);
