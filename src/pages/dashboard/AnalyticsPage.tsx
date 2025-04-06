
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

const AnalyticsPage: React.FC = () => {
  const { language, t } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState(`analytics-${language}-${Date.now()}`);
  
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`AnalyticsPage language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language as LanguageCode);
      setForceUpdateKey(`analytics-${language}-${Date.now()}`);
    }
  }, [language, currentLanguage]);
  
  // Get translations directly to ensure they update with language changes
  const pageTitle = getDirectTranslation("analytics.title", currentLanguage, "Analytics Dashboard");
  const pageSubtitle = getDirectTranslation("analytics.subtitle", currentLanguage, "Track your business performance and metrics");
  const overviewTitle = getDirectTranslation("analytics.overview", currentLanguage, "Performance Overview");
  const metricsTitle = getDirectTranslation("analytics.growthMetrics", currentLanguage, "Growth Metrics");
  const chartsTitle = getDirectTranslation("analytics.transactionsByType", currentLanguage, "Transaction Types");
  const reportsTitle = getDirectTranslation("analytics.realTimeUpdates", currentLanguage, "Real-time Updates");
  const metricsDescription = getDirectTranslation("analytics.yearToDate", currentLanguage, "Year to Date Performance");
  const chartsDescription = getDirectTranslation("analytics.byCategory", currentLanguage, "Analytics by Category");
  const reportsDescription = getDirectTranslation("analytics.summary", currentLanguage, "Summary and Reports");
  
  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
      data-language={currentLanguage}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">{pageTitle}</h1>
        <p className="text-gray-400">{pageSubtitle}</p>
      </div>
      
      <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          {overviewTitle}
        </h2>
        <p className="text-gray-400">
          {metricsDescription}
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          {chartsTitle}
        </h2>
        <p className="text-gray-400">
          {chartsDescription}
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          {reportsTitle}
        </h2>
        <p className="text-gray-400">
          {reportsDescription}
        </p>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
