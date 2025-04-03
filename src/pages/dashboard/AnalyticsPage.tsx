
import React from "react";
import { motion } from "framer-motion";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsCharts from "../components/analytics/AnalyticsCharts";
import AnalyticsMetrics from "../components/analytics/AnalyticsMetrics";
import ReportGeneration from "../components/analytics/ReportGeneration";
import { usePageLanguage } from "@/hooks/use-page-language";

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
      <AnalyticsHeader 
        title={pageTitle}
        subtitle={pageSubtitle}
      />
      
      <AnalyticsMetrics />
      
      <AnalyticsCharts />
      
      <ReportGeneration />
    </motion.div>
  );
};

export default AnalyticsPage;
