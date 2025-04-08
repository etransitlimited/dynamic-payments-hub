
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
  const stableLanguage = useRef<LanguageCode>(currentLanguage);
  const [pageKey, setPageKey] = useState(`analytics-page-${Date.now()}`);
  
  // Force re-render when language changes
  useEffect(() => {
    if (stableLanguage.current !== currentLanguage || lastUpdate) {
      console.log(`AnalyticsPage: Language changed from ${stableLanguage.current} to ${currentLanguage}`);
      stableLanguage.current = currentLanguage;
      // Generate a new key to force re-render
      setPageKey(`analytics-page-${currentLanguage}-${Date.now()}`);
    }
  }, [currentLanguage, lastUpdate]);
  
  // Get translations directly to ensure they're up to date
  const translations = useMemo(() => ({
    title: getDirectTranslation("analytics.title", currentLanguage, "Analytics Dashboard"),
    subtitle: getDirectTranslation("analytics.subtitle", currentLanguage, "Track your business performance and metrics"),
    realTimeUpdates: getDirectTranslation("analytics.realTimeUpdates", currentLanguage, "Real-time updates")
  }), [currentLanguage]);

  // Update document title when language changes
  useEffect(() => {
    document.title = `${translations.title} | Dashboard`;
  }, [translations.title]);

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

  return (
    <div className="relative min-h-screen">
      <motion.div
        key={pageKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto p-6 relative z-10"
        data-language={currentLanguage}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="border-purple-900/30 backdrop-blur-md overflow-hidden shadow-lg relative group transition-all duration-300 hover:shadow-[0_0_20px_rgba(142,45,226,0.2)]">
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    {translations.title}
                  </h1>
                  <p className="text-blue-300 mt-2">
                    {translations.subtitle}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-neon-green mr-2 animate-pulse"></span>
                    {translations.realTimeUpdates}
                  </span>
                  <ArrowUpRight size={16} className="text-neon-green" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ComponentErrorBoundary component="Stat Cards">
            <StatCards key={`stats-${currentLanguage}-${pageKey}`} />
          </ComponentErrorBoundary>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-6">
          <ComponentErrorBoundary component="Revenue Chart">
            <RevenueChart key={`revenue-${currentLanguage}-${pageKey}`} />
          </ComponentErrorBoundary>
          <ComponentErrorBoundary component="Transaction Type Chart">
            <TransactionTypeChart key={`transactions-${currentLanguage}-${pageKey}`} />
          </ComponentErrorBoundary>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ComponentErrorBoundary component="Expense Distribution Chart">
            <ExpenseDistributionChart key={`expense-${currentLanguage}-${pageKey}`} />
          </ComponentErrorBoundary>
          <ComponentErrorBoundary component="Growth Metrics Chart">
            <GrowthMetricsChart key={`growth-${currentLanguage}-${pageKey}`} />
          </ComponentErrorBoundary>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ComponentErrorBoundary component="Report Generation Card">
            <ReportGenerationCard key={`report-${currentLanguage}-${pageKey}`} />
          </ComponentErrorBoundary>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;
