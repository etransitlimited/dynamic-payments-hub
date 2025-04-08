
import React, { useState, useEffect, useMemo, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";
import { useTranslation } from "@/context/TranslationProvider";

const AnalyticsPage: React.FC = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const { currentLanguage } = useTranslation();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const pageRef = useRef<HTMLDivElement>(null);
  const isInitialMountRef = useRef(true);
  const animationKey = useRef(`analytics-page-${Math.random().toString(36).substring(2, 9)}`);
  
  // Force rerender only when language changes, not on first mount
  useEffect(() => {
    if (!isInitialMountRef.current && language !== languageRef.current) {
      animationKey.current = `analytics-page-${language}-${Date.now()}`;
      languageRef.current = language as LanguageCode;
      
      if (pageRef.current) {
        pageRef.current.setAttribute('data-language', languageRef.current);
      }
    }
    isInitialMountRef.current = false;
  }, [language, refreshCounter]);
  
  // Use memo to prevent excessive re-renders on language changes
  // Directly use languageRef.current to ensure we have the latest value
  const translations = useMemo(() => ({
    pageTitle: getDirectTranslation("analytics.title", languageRef.current, "Analytics Dashboard"),
    pageSubtitle: getDirectTranslation("analytics.subtitle", languageRef.current, "Track your business performance and metrics"),
    overviewTitle: getDirectTranslation("analytics.overview", languageRef.current, "Performance Overview"),
    metricsTitle: getDirectTranslation("analytics.growthMetrics", languageRef.current, "Growth Metrics"),
    chartsTitle: getDirectTranslation("analytics.transactionsByType", languageRef.current, "Transaction Types"),
    reportsTitle: getDirectTranslation("analytics.realTimeUpdates", languageRef.current, "Real-time Updates"),
    metricsDescription: getDirectTranslation("analytics.yearToDate", languageRef.current, "Year to Date Performance"),
    chartsDescription: getDirectTranslation("analytics.byCategory", languageRef.current, "Analytics by Category"),
    reportsDescription: getDirectTranslation("analytics.summary", languageRef.current, "Summary and Reports"),
  }), [languageRef.current, refreshCounter]);
  
  // Update document title
  useEffect(() => {
    document.title = `${translations.pageTitle} | Dashboard`;
  }, [translations.pageTitle]);
  
  // Handle direct language changes via event
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      const { language: newLanguage } = e.detail;
      if (newLanguage && newLanguage !== languageRef.current) {
        languageRef.current = newLanguage as LanguageCode;
        animationKey.current = `analytics-page-${newLanguage}-${Date.now()}`;
        
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
  
  return (
    <motion.div
      key={animationKey.current}
      ref={pageRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 analytics-page"
      data-language={languageRef.current}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">{translations.pageTitle}</h1>
        <p className="text-gray-400">{translations.pageSubtitle}</p>
      </div>
      
      <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          {translations.overviewTitle}
        </h2>
        <p className="text-gray-400">
          {translations.metricsDescription}
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          {translations.chartsTitle}
        </h2>
        <p className="text-gray-400">
          {translations.chartsDescription}
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          {translations.reportsTitle}
        </h2>
        <p className="text-gray-400">
          {translations.reportsDescription}
        </p>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
