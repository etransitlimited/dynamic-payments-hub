
import React, { useState, useEffect, useMemo, useCallback } from "react";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionChartsSection from "./components/TransactionChartsSection";
import TransactionSearch from "./components/TransactionSearch";
import { motion, AnimatePresence } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useToast } from "@/hooks/use-toast";
import { getTransactionTranslation } from "./i18n";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, WalletCards } from "lucide-react";

const TransactionsPage = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [forceRefreshKey, setForceRefreshKey] = useState(Date.now());
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
  
  // Define staggered animation for children
  const container = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  }), []);
  
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
  
  // Update document title
  useEffect(() => {
    document.title = `${getTransactionTranslation("pageTitle", language)} | Dashboard`;
  }, [language]);
  
  // Quick links to related sections
  const relatedLinks = useMemo(() => [
    {
      title: getTransactionTranslation("analytics", language) || "Analytics",
      path: "/dashboard/analytics",
      icon: <ArrowUpRight className="h-3.5 w-3.5" />
    },
    {
      title: getTransactionTranslation("wallet", language) || "Wallet",
      path: "/dashboard/wallet/deposit",
      icon: <WalletCards className="h-3.5 w-3.5" />
    },
    {
      title: getTransactionTranslation("history", language) || "History",
      path: "/dashboard/transactions/history",
      icon: <Clock className="h-3.5 w-3.5" />
    }
  ], [language]);
  
  return (
    <div className="relative min-h-full">
      {/* Content with animation */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`transaction-page-${currentLanguage}-${forceRefreshKey}`}
          className="relative z-10 px-1 sm:px-2"
          variants={container}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
          data-language={currentLanguage}
        >
          {/* Header */}
          <TransactionPageHeader />
          
          {/* Related links - Enhanced navigation between pages */}
          <div className="flex flex-wrap gap-2 mb-5">
            {relatedLinks.map((link, index) => (
              <Link
                key={`related-link-${index}`}
                to={link.path}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-charcoal-light/50 hover:bg-purple-900/30 rounded-md text-xs text-purple-200 hover:text-white transition-colors border border-purple-900/20 hover:border-purple-500/40"
              >
                {link.icon}
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
          
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
            {/* Transaction table */}
            <div>
              <TransactionTableSection />
            </div>
            
            {/* Charts and analytics */}
            <div>
              <TransactionChartsSection />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TransactionsPage;
