
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useTranslation } from "@/context/TranslationProvider";
import { useLanguage } from "@/context/LanguageContext";
import StatCards from "./components/StatCards";
import RevenueChart from "./components/RevenueChart";
import TransactionTypeChart from "./components/TransactionTypeChart";
import ExpenseDistributionChart from "./components/ExpenseDistributionChart";
import GrowthMetricsChart from "./components/GrowthMetricsChart";
import ReportGenerationCard from "./components/ReportGenerationCard";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

const AnalyticsPage = () => {
  const { language: contextLanguage, lastUpdate } = useLanguage();
  const { currentLanguage } = useTranslation();
  const stableLanguageRef = useRef<LanguageCode>(currentLanguage);
  const [pageKey] = useState(`analytics-page-${Date.now()}`);
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const realtimeRef = useRef<HTMLSpanElement>(null);
  const mountedRef = useRef(true);
  
  // Ensure we track component mount state
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Force a stable reference to the current language
  useEffect(() => {
    if (stableLanguageRef.current !== currentLanguage || lastUpdate) {
      console.log(`AnalyticsPage: Language changed from ${stableLanguageRef.current} to ${currentLanguage}`);
      stableLanguageRef.current = currentLanguage;
      
      // Update DOM directly to avoid re-renders
      updateTranslations();
      
      // Update document title
      document.title = `${getDirectTranslation("analytics.title", currentLanguage, "Analytics Dashboard")} | Dashboard`;
    }
  }, [currentLanguage, lastUpdate]);
  
  // Update UI text without re-rendering
  const updateTranslations = useCallback(() => {
    if (!mountedRef.current) return;
    
    const translations = {
      title: getDirectTranslation("analytics.title", stableLanguageRef.current, "Analytics Dashboard"),
      subtitle: getDirectTranslation("analytics.subtitle", stableLanguageRef.current, "Track your business performance and metrics"),
      realTimeUpdates: getDirectTranslation("analytics.realTimeUpdates", stableLanguageRef.current, "Real-time updates")
    };
    
    // Update DOM elements directly
    if (titleRef.current) {
      titleRef.current.textContent = translations.title;
    }
    
    if (subtitleRef.current) {
      subtitleRef.current.textContent = translations.subtitle;
    }
    
    if (realtimeRef.current) {
      realtimeRef.current.textContent = translations.realTimeUpdates;
    }
    
    if (pageRef.current) {
      pageRef.current.setAttribute('data-language', stableLanguageRef.current);
    }
  }, []);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      if (!mountedRef.current) return;
      
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && stableLanguageRef.current !== newLanguage) {
        console.log(`AnalyticsPage event: Language changed to ${newLanguage}`);
        stableLanguageRef.current = newLanguage as LanguageCode;
        
        // Update translations directly
        updateTranslations();
        
        // Update document title
        document.title = `${getDirectTranslation("analytics.title", newLanguage as LanguageCode, "Analytics Dashboard")} | Dashboard`;
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [updateTranslations]);
  
  // Initial translation on mount
  useEffect(() => {
    updateTranslations();
  }, [updateTranslations]);

  // Define animation variants with reduced complexity
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 17 }
    }
  };

  // Get translations for initial render
  const initialTranslations = useMemo(() => ({
    title: getDirectTranslation("analytics.title", currentLanguage, "Analytics Dashboard"),
    subtitle: getDirectTranslation("analytics.subtitle", currentLanguage, "Track your business performance and metrics"),
    realTimeUpdates: getDirectTranslation("analytics.realTimeUpdates", currentLanguage, "Real-time Updates")
  }), [currentLanguage]);

  return (
    <div 
      className="relative min-h-screen" 
      ref={pageRef}
      data-language={stableLanguageRef.current}
    >
      <motion.div
        key={pageKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto p-6 relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="border-purple-900/30 backdrop-blur-md overflow-hidden shadow-lg relative group transition-all duration-300 hover:shadow-[0_0_20px_rgba(142,45,226,0.2)]">
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 
                    ref={titleRef}
                    className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                  >
                    {initialTranslations.title}
                  </h1>
                  <p 
                    ref={subtitleRef}
                    className="text-blue-300 mt-2"
                  >
                    {initialTranslations.subtitle}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-neon-green mr-2"></span>
                    <span ref={realtimeRef}>{initialTranslations.realTimeUpdates}</span>
                  </span>
                  <ArrowUpRight size={16} className="text-neon-green" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ComponentErrorBoundary component="Stat Cards">
            <StatCards />
          </ComponentErrorBoundary>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-6">
          <ComponentErrorBoundary component="Revenue Chart">
            <RevenueChart />
          </ComponentErrorBoundary>
          <ComponentErrorBoundary component="Transaction Type Chart">
            <TransactionTypeChart />
          </ComponentErrorBoundary>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ComponentErrorBoundary component="Expense Distribution Chart">
            <ExpenseDistributionChart />
          </ComponentErrorBoundary>
          <ComponentErrorBoundary component="Growth Metrics Chart">
            <GrowthMetricsChart />
          </ComponentErrorBoundary>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ComponentErrorBoundary component="Report Generation Card">
            <ReportGenerationCard />
          </ComponentErrorBoundary>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default React.memo(AnalyticsPage);
