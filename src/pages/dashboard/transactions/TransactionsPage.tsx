
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

const TransactionsPage = React.memo(() => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const stableLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const pageRef = useRef<HTMLDivElement>(null);
  const pageKey = useRef(`transactions-page-${Math.random().toString(36).substring(2, 9)}`);
  
  // Update language ref and document title
  useEffect(() => {
    if (language !== stableLanguageRef.current) {
      stableLanguageRef.current = language as LanguageCode;
      
      document.title = `${getTransactionTranslation("pageTitle", stableLanguageRef.current)} | Dashboard`;
      
      // Update DOM attributes directly
      if (pageRef.current) {
        pageRef.current.setAttribute('data-language', stableLanguageRef.current);
      }
    }
  }, [language, refreshCounter]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      const { language: newLanguage } = e.detail;
      if (newLanguage !== stableLanguageRef.current) {
        stableLanguageRef.current = newLanguage as LanguageCode;
        
        document.title = `${getTransactionTranslation("pageTitle", newLanguage as LanguageCode)} | Dashboard`;
        
        // Update DOM attributes directly
        if (pageRef.current) {
          pageRef.current.setAttribute('data-language', newLanguage as LanguageCode);
          pageRef.current.setAttribute('data-refresh', Date.now().toString());
        }
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
  }), [refreshCounter]);
  
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
  
  // Use a stable key for page content to prevent remounting while allowing controlled updates
  const contentKey = useRef(`${pageKey.current}-content-${refreshCounter}`);
  
  const PageContent = useMemo(() => (
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
          <TransactionChartsSection />
        </div>
      </div>
    </PageLayout>
  ), [searchQuery, handleFilterClick, handleDateFilterClick, refreshCounter]);
  
  return (
    <div 
      ref={pageRef} 
      data-language={stableLanguageRef.current} 
      key={`${pageKey.current}-${refreshCounter}`}
    >
      {PageContent}
    </div>
  );
});

TransactionsPage.displayName = 'TransactionsPage';

export default TransactionsPage;
