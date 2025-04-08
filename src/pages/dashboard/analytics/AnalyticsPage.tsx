
import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { usePerformance } from "@/hooks/use-performance";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

const AnalyticsPage = () => {
  const { language: contextLanguage } = useLanguage();
  const { t, language, refreshCounter } = useSafeTranslation();
  const { shouldReduceAnimations } = usePerformance();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [currentLang, setCurrentLang] = useState<LanguageCode>(language as LanguageCode);
  
  // Create a stable key that changes only when language or refresh counter changes
  const pageKey = useMemo(() => 
    `analytics-page-${currentLang}-${refreshCounter}`, 
    [currentLang, refreshCounter]
  );
  
  // Update language state to match current language context
  useEffect(() => {
    if (language && language !== currentLang) {
      setCurrentLang(language as LanguageCode);
      console.log(`AnalyticsPage: Language updated from ${currentLang} to ${language}`);
    }
  }, [language, currentLang]);
  
  // Get translations directly to ensure they're up to date
  const translations = useMemo(() => ({
    title: getDirectTranslation("analytics.title", currentLang, "Analytics Dashboard"),
    subtitle: getDirectTranslation("analytics.subtitle", currentLang, "Track your business performance and metrics"),
    realTimeUpdates: getDirectTranslation("analytics.realTimeUpdates", currentLang, "Real-time updates")
  }), [currentLang]);

  // Update document title when language changes
  useEffect(() => {
    document.title = `${translations.title} | Dashboard`;
  }, [translations.title]);
  
  // Mark first render complete after component mounts
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // Reduce animation complexity when needed
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceAnimations ? 0.05 : 0.1,
        when: "beforeChildren"
      }
    }
  }), [shouldReduceAnimations]);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceAnimations ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: shouldReduceAnimations ? 150 : 100, 
        damping: shouldReduceAnimations ? 20 : 15 
      }
    }
  }), [shouldReduceAnimations]);

  return (
    <div className="relative min-h-screen">
      <motion.div
        key={isFirstRender ? 'initial-render' : pageKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto p-6 relative z-10"
        data-language={currentLang}
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

export default AnalyticsPage;
