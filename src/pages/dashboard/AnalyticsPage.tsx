
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";
import { useTranslation } from "@/context/TranslationProvider";

const AnalyticsPage: React.FC = () => {
  const { language, updateCounter, refreshCounter } = useSafeTranslation();
  const { currentLanguage } = useTranslation();
  const [currentLang, setCurrentLang] = useState<LanguageCode>(language as LanguageCode);
  
  useEffect(() => {
    if (currentLang !== language || updateCounter > 0) {
      console.log(`AnalyticsPage language changed from ${currentLang} to ${language}`);
      setCurrentLang(language as LanguageCode);
    }
  }, [language, currentLang, updateCounter, refreshCounter, currentLanguage]);
  
  // Use memo to prevent excessive re-renders on language changes
  // Directly use currentLang instead of language to ensure we have the latest value
  const translations = useMemo(() => ({
    pageTitle: getDirectTranslation("analytics.title", currentLang, "Analytics Dashboard"),
    pageSubtitle: getDirectTranslation("analytics.subtitle", currentLang, "Track your business performance and metrics"),
    overviewTitle: getDirectTranslation("analytics.overview", currentLang, "Performance Overview"),
    metricsTitle: getDirectTranslation("analytics.growthMetrics", currentLang, "Growth Metrics"),
    chartsTitle: getDirectTranslation("analytics.transactionsByType", currentLang, "Transaction Types"),
    reportsTitle: getDirectTranslation("analytics.realTimeUpdates", currentLang, "Real-time Updates"),
    metricsDescription: getDirectTranslation("analytics.yearToDate", currentLang, "Year to Date Performance"),
    chartsDescription: getDirectTranslation("analytics.byCategory", currentLang, "Analytics by Category"),
    reportsDescription: getDirectTranslation("analytics.summary", currentLang, "Summary and Reports"),
  }), [currentLang]);
  
  // Create a stable key for animations
  const animationKey = useMemo(() => 
    `analytics-page-${currentLang}-${refreshCounter}`, 
    [currentLang, refreshCounter]
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
      data-language={currentLang}
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
