
import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionSearch from "./components/TransactionSearch";
import { useToast } from "@/hooks/use-toast";
import { getTransactionTranslation, clearTranslationCache } from "./i18n";
import PageLayout from "@/components/dashboard/PageLayout";
import { LanguageCode } from "@/utils/languageUtils";
import { useLanguage } from "@/context/LanguageContext";
import { lazy, Suspense } from "react";
import TranslationWrapper from "@/components/translation/TranslationWrapper";

// Use lazy loading for heavier components
const LazyTransactionChartsSection = lazy(() => 
  import("./components/TransactionChartsSection").then(module => ({
    default: module.default
  }))
);

const TransactionsPage = React.memo(() => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const stableLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const pageRef = useRef<HTMLDivElement>(null);
  const pageKey = useRef(`transactions-page-${Math.random().toString(36).substring(2, 9)}`);
  const contentKey = useRef(`${pageKey.current}-content`);
  const isInitialMountRef = useRef(true);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Update language ref and document title
  useEffect(() => {
    if (language !== stableLanguageRef.current) {
      console.log(`TransactionsPage: Language changed from ${stableLanguageRef.current} to ${language}`);
      stableLanguageRef.current = language as LanguageCode;
      
      // Clear translation cache to force fresh translations
      clearTranslationCache();
      
      document.title = `${getTransactionTranslation("pageTitle", stableLanguageRef.current)} | Dashboard`;
      
      // Update DOM attributes directly
      if (pageRef.current) {
        pageRef.current.setAttribute('data-language', stableLanguageRef.current);
      }
      
      // Force refresh when language changes
      setRefreshKey(prev => prev + 1);
      
      // Only force rerender when language changes, not on initial mount
      if (!isInitialMountRef.current) {
        contentKey.current = `${pageKey.current}-content-${Date.now()}`;
      }
    }
    isInitialMountRef.current = false;
  }, [language]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.language && customEvent.detail.language !== stableLanguageRef.current) {
        const newLanguage = customEvent.detail.language as LanguageCode;
        stableLanguageRef.current = newLanguage;
        
        // Clear translation cache when language changes through events
        clearTranslationCache();
        
        document.title = `${getTransactionTranslation("pageTitle", newLanguage)} | Dashboard`;
        
        // Update DOM attributes directly
        if (pageRef.current) {
          pageRef.current.setAttribute('data-language', newLanguage);
        }
        
        // Force refresh when language changes via event
        setRefreshKey(prev => prev + 1);
        
        // Generate new content key to force controlled rerender
        contentKey.current = `${pageKey.current}-content-${Date.now()}`;
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
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
  }), [refreshKey, stableLanguageRef.current]);
  
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
    <TranslationWrapper>
      <div 
        ref={pageRef} 
        data-language={stableLanguageRef.current} 
        data-refresh-key={refreshKey}
        className="transactions-page"
      >
        <PageLayout
          headerContent={<TransactionPageHeader key={`header-${refreshKey}`} />}
          data-language={stableLanguageRef.current}
          key={contentKey.current}
        >
          <TransactionStatCards key={`stats-${refreshKey}`} />
          
          <div className="my-5 sm:my-6">
            <TransactionSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onFilterClick={handleFilterClick}
              onDateFilterClick={handleDateFilterClick}
              key={`search-${refreshKey}`}
            />
          </div>
          
          <div className="space-y-5 sm:space-y-6">
            <div>
              <TransactionTableSection filterMode="last24Hours" key={`table-${refreshKey}`} />
            </div>
            
            <div>
              <Suspense fallback={
                <div className="h-64 flex items-center justify-center bg-charcoal-light/30 rounded-lg">
                  <div className="h-6 w-6 border-2 border-t-transparent border-neon-green rounded-full animate-spin"></div>
                </div>
              }>
                <LazyTransactionChartsSection key={`charts-${refreshKey}`} />
              </Suspense>
            </div>
          </div>
        </PageLayout>
      </div>
    </TranslationWrapper>
  );
});

TransactionsPage.displayName = 'TransactionsPage';

export default TransactionsPage;
