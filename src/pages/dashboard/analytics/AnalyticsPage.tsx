
import React, { useState } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useTranslation } from "@/context/TranslationProvider";
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
import TranslatedText from "@/components/translation/TranslatedText";
import PageLayout from "@/components/dashboard/PageLayout";

const AnalyticsPage = () => {
  const { language } = useSafeTranslation();
  const { translate } = useTranslation();
  const [pageKey] = useState(`analytics-page-${Date.now()}`);
  
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
    <PageLayout
      animationKey={`analytics-page-${language}`}
      title={<TranslatedText keyName="analytics.title" fallback="Analytics Dashboard" />}
      subtitle={<TranslatedText keyName="analytics.subtitle" fallback="Track your business performance and metrics" />}
    >
      <motion.div
        key={pageKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="border-purple-900/30 backdrop-blur-md overflow-hidden shadow-lg relative group transition-all duration-300 hover:shadow-[0_0_20px_rgba(142,45,226,0.2)]">
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    <TranslatedText keyName="analytics.overview" fallback="Performance Overview" />
                  </h2>
                  <p className="text-blue-300 mt-2">
                    <TranslatedText keyName="analytics.trackMetrics" fallback="Track key performance indicators over time" />
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-neon-green mr-2"></span>
                    <TranslatedText keyName="analytics.realTimeUpdates" fallback="Real-time Updates" />
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
    </PageLayout>
  );
};

export default React.memo(AnalyticsPage);
