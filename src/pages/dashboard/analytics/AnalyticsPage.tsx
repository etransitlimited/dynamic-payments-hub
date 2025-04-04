
import React from "react";
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
import TranslatedText from "@/components/translation/TranslatedText";
import GradientOverlay from "@/components/particles/GradientOverlay";
import ParticlesLayer from "@/components/particles/ParticlesLayer";
import { Card, CardContent } from "@/components/ui/card";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { usePerformance } from "@/hooks/use-performance";
import WorldMapCanvas from "@/components/particles/WorldMapCanvas";

const AnalyticsPage = () => {
  const { language } = useLanguage();
  const { t: safeT } = useSafeTranslation();
  const { particleCount, shouldReduceAnimations } = usePerformance();
  
  console.log("Analytics page loaded with language:", language);
  console.log("Using safe translation function:", !!safeT);

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
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-dark"></div>
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        {!shouldReduceAnimations && (
          <>
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-600/8 rounded-full blur-3xl animate-pulse-subtle"></div>
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-purple-800/8 rounded-full blur-3xl animate-pulse-subtle opacity-70"></div>
            <div className="absolute top-3/4 right-1/4 -translate-y-1/2 w-[20rem] h-[20rem] bg-blue-900/8 rounded-full blur-3xl animate-pulse-subtle opacity-50"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-neon-green/8 rounded-full blur-3xl"></div>
          </>
        )}
        <GradientOverlay />
        {particleCount > 0 && <ParticlesLayer />}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto p-6 relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative group transition-all duration-300 hover:shadow-[0_0_20px_rgba(142,45,226,0.2)]">
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    <TranslatedText keyName="analytics.title" fallback="Analytics Dashboard" />
                  </h1>
                  <p className="text-blue-300 mt-2">
                    <TranslatedText keyName="analytics.subtitle" fallback="Track your business performance and metrics" />
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-purple-300 bg-purple-900/30 rounded-full px-3 py-1 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-neon-green mr-2 animate-pulse"></span>
                    <TranslatedText keyName="analytics.realTimeUpdates" fallback="Real-time updates" />
                  </span>
                  <ArrowUpRight size={16} className="text-neon-green" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants}>
          <ComponentErrorBoundary component="Stat Cards">
            <StatCards />
          </ComponentErrorBoundary>
        </motion.div>

        {/* Charts Row 1 */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-6">
          <ComponentErrorBoundary component="Revenue Chart">
            <RevenueChart />
          </ComponentErrorBoundary>
          <ComponentErrorBoundary component="Transaction Type Chart">
            <TransactionTypeChart />
          </ComponentErrorBoundary>
        </motion.div>

        {/* Charts Row 2 */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ComponentErrorBoundary component="Expense Distribution Chart">
            <ExpenseDistributionChart />
          </ComponentErrorBoundary>
          <ComponentErrorBoundary component="Growth Metrics Chart">
            <GrowthMetricsChart />
          </ComponentErrorBoundary>
        </motion.div>

        {/* Report Generation Card */}
        <motion.div variants={itemVariants}>
          <ComponentErrorBoundary component="Report Generation Card">
            <ReportGenerationCard />
          </ComponentErrorBoundary>
        </motion.div>
      </motion.div>
      
      <style>
        {`
        @keyframes pulse-subtle {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
        `}
      </style>
    </div>
  );
};

export default AnalyticsPage;
