
import React from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";

const AnalyticsPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("analytics.title", "Analytics Dashboard");
  
  // Get translations
  const pageTitle = getTranslation("analytics.title", "Analytics Dashboard");
  const pageSubtitle = getTranslation("analytics.subtitle", "Track your business performance and metrics");
  
  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">{pageTitle}</h1>
        <p className="text-gray-400">{pageSubtitle}</p>
      </div>
      
      {/* Original components were not found, replacing with placeholder content */}
      <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          <TranslatedText keyName="analytics.metrics" fallback="Analytics Metrics" />
        </h2>
        <p className="text-gray-400">
          <TranslatedText keyName="analytics.metricsDescription" fallback="Your key analytics metrics will appear here." />
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          <TranslatedText keyName="analytics.charts" fallback="Analytics Charts" />
        </h2>
        <p className="text-gray-400">
          <TranslatedText keyName="analytics.chartsDescription" fallback="Your analytics charts will appear here." />
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          <TranslatedText keyName="analytics.reports" fallback="Report Generation" />
        </h2>
        <p className="text-gray-400">
          <TranslatedText keyName="analytics.reportsDescription" fallback="Generate reports and export data." />
        </p>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
