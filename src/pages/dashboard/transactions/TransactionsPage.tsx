
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
import { useLanguage } from "@/context/LanguageContext";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { lazy, Suspense } from "react";

// Use lazy loading for heavier components
const LazyTransactionChartsSection = lazy(() => 
  import("./components/TransactionChartsSection").then(module => ({
    default: module.default
  }))
);

const TransactionsPage = React.memo(() => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const stableLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const pageRef = useRef<HTMLDivElement>(null);
  const pageKey = useRef(`transactions-page-${Math.random().toString(36).substring(2, 9)}`);
  const contentKey = useRef(`${pageKey.current}-content`);
  const isInitialMountRef = useRef(true);
  
  // Update language ref and document title
  useEffect(() => {
    if (language !== stableLanguageRef.current) {
      stableLanguageRef.current = language as LanguageCode;
      document.title = `${getTransactionTranslation("pageTitle", stableLanguageRef.current)} | Dashboard`;
      
      // Update DOM attributes directly
      if (pageRef.current) {
        pageRef.current.setAttribute('data-language', stableLanguageRef.current);
      }
      
      // Only force rerender when language changes, not on initial mount
      if (!isInitialMountRef.current) {
        contentKey.current = `${pageKey.current}-content-${Date.now()}`;
      }
    }
    isInitialMountRef.current = false;
  }, [language]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      const { language: newLanguage } = e.detail;
      if (newLanguage && newLanguage !== stableLanguageRef.current) {
        stableLanguageRef.current = newLanguage as LanguageCode;
        document.title = `${getTransactionTranslation("pageTitle", newLanguage as LanguageCode)} | Dashboard`;
        
        // Update DOM attributes directly
        if (pageRef.current) {
          pageRef.current.setAttribute('data-language', newLanguage as LanguageCode);
          pageRef.current.setAttribute('data-refresh', Date.now().toString());
        }
        
        // Generate new content key to force controlled rerender
        contentKey.current = `${pageKey.current}-content-${Date.now()}`;
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);
  
  // Stable translations with memoization
  const translations = useMemo(() => ({
    pageTitle: getTransactionTranslation("pageTitle", stableLanguageRef.current),
    filter: getTransactionTranslation("filter", stableLanguageRef.current),
    filterApplied: getTransactionTranslation("filterApplied", stableLanguageRef.current),
    dateRange: getTransactionTranslation("dateRange", stableLanguageRef.current),
    dateFilterApplied: getTransactionTranslation("dateFilterApplied", stableLanguageRef.current),
    viewDetails: getTransactionTranslation("viewDetails", stableLanguageRef.current) 
  }), [refreshCounter, stableLanguageRef.current]);
  
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
    <div 
      ref={pageRef} 
      data-language={stableLanguageRef.current} 
      className="transactions-page"
    >
      <PageLayout
        headerContent={<TransactionPageHeader />}
        data-language={stableLanguageRef.current}
        key={contentKey.current}
      >
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
    </div>
  );
});

TransactionsPage.displayName = 'TransactionsPage';

export default TransactionsPage;
