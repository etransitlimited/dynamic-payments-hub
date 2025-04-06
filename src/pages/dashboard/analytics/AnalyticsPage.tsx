
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import StatCards from "./components/StatCards";
import RevenueChart from "./components/RevenueChart";
import TransactionTypeChart from "./components/TransactionTypeChart";
import ExpenseDistributionChart from "./components/ExpenseDistributionChart";
import GrowthMetricsChart from "./components/GrowthMetricsChart";
import ReportGenerationCard from "./components/ReportGenerationCard";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { Card, CardContent } from "@/components/ui/card";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { usePerformance } from "@/hooks/use-performance";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

const AnalyticsPage = () => {
  const { language: contextLanguage, lastUpdate } = useLanguage();
  const { t, language, refreshCounter } = useSafeTranslation();
  const { shouldReduceAnimations } = usePerformance();
  const [animationKey, setAnimationKey] = useState(`analytics-${language}-${Date.now()}`);
  
  // Create a more stable key for animations that changes only when language changes
  useEffect(() => {
    setAnimationKey(`analytics-${language}-${Date.now()}-${refreshCounter}`);
    console.log(`Analytics page language updated to: ${language}, refreshCounter: ${refreshCounter}`);
  }, [language, lastUpdate, refreshCounter]);
  
  // Get translations with direct access to ensure they're updated
  const translations = useMemo(() => ({
    title: getDirectTranslation("analytics.title", language as LanguageCode, "Analytics Dashboard"),
    subtitle: getDirectTranslation("analytics.subtitle", language as LanguageCode, "Track your business performance and metrics"),
    realTimeUpdates: getDirectTranslation("analytics.realTimeUpdates", language as LanguageCode, "Real-time updates")
  }), [language, refreshCounter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="container mx-auto p-6 relative z-10"
          data-language={language}
          data-refresh-counter={refreshCounter}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative group transition-all duration-300 hover:shadow-[0_0_20px_rgba(142,45,226,0.2)]">
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
                    <span className="text-xs text-purple-300 bg-purple-900/30 rounded-full px-3 py-1 flex items-center">
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
              <StatCards key={`stat-cards-${language}-${refreshCounter}`} />
            </ComponentErrorBoundary>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-6">
            <ComponentErrorBoundary component="Revenue Chart">
              <RevenueChart key={`revenue-chart-${language}-${refreshCounter}`} />
            </ComponentErrorBoundary>
            <ComponentErrorBoundary component="Transaction Type Chart">
              <TransactionTypeChart key={`transaction-chart-${language}-${refreshCounter}`} />
            </ComponentErrorBoundary>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ComponentErrorBoundary component="Expense Distribution Chart">
              <ExpenseDistributionChart key={`expense-chart-${language}-${refreshCounter}`} />
            </ComponentErrorBoundary>
            <ComponentErrorBoundary component="Growth Metrics Chart">
              <GrowthMetricsChart key={`growth-chart-${language}-${refreshCounter}`} />
            </ComponentErrorBoundary>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ComponentErrorBoundary component="Report Generation Card">
              <ReportGenerationCard key={`report-card-${language}-${refreshCounter}`} />
            </ComponentErrorBoundary>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnalyticsPage;
