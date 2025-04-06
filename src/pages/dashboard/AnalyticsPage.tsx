
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";
import { useTranslation } from "@/context/TranslationProvider";

const AnalyticsPage: React.FC = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const { currentLanguage } = useTranslation();
  const [currentLang, setCurrentLang] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState<number>(Date.now());
  
  useEffect(() => {
    if (currentLang !== language || refreshCounter > 0) {
      console.log(`AnalyticsPage language changed from ${currentLang} to ${language}`);
      setCurrentLang(language as LanguageCode);
      setForceUpdateKey(Date.now());
    }
  }, [language, currentLang, refreshCounter, currentLanguage]);
  
  // Use memo to prevent excessive re-renders on language changes
  const translations = useMemo(() => ({
    pageTitle: getDirectTranslation("analytics.title", language as LanguageCode, "Analytics Dashboard"),
    pageSubtitle: getDirectTranslation("analytics.subtitle", language as LanguageCode, "Track your business performance and metrics"),
    overviewTitle: getDirectTranslation("analytics.overview", language as LanguageCode, "Performance Overview"),
    metricsTitle: getDirectTranslation("analytics.growthMetrics", language as LanguageCode, "Growth Metrics"),
    chartsTitle: getDirectTranslation("analytics.transactionsByType", language as LanguageCode, "Transaction Types"),
    reportsTitle: getDirectTranslation("analytics.realTimeUpdates", language as LanguageCode, "Real-time Updates"),
    metricsDescription: getDirectTranslation("analytics.yearToDate", language as LanguageCode, "Year to Date Performance"),
    chartsDescription: getDirectTranslation("analytics.byCategory", language as LanguageCode, "Analytics by Category"),
    reportsDescription: getDirectTranslation("analytics.summary", language as LanguageCode, "Summary and Reports"),
  }), [language, forceUpdateKey]);
  
  // Create a stable key for animations
  const animationKey = useMemo(() => 
    `analytics-page-${language}-${forceUpdateKey}`, 
    [language, forceUpdateKey]
  );
  
  // Update document title
  useEffect(() => {
    document.title = `${translations.pageTitle} | Dashboard`;
  }, [translations.pageTitle]);
  
  return (
    <motion.div
      key={animationKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
      data-language={language}
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
