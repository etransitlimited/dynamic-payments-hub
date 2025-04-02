
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTable from "./components/TransactionTable";
import TransactionCharts from "./components/TransactionCharts";
import { motion, useAnimation } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import GradientOverlay from "@/components/particles/GradientOverlay";
import ParticlesLayer from "@/components/particles/ParticlesLayer";
import { Progress } from "@/components/ui/progress";

// Define the animation keyframes as a CSS class
const pulseAnimationStyle = `
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
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes glow {
    0%, 100% {
      filter: drop-shadow(0 0 8px rgba(242, 252, 226, 0.3));
    }
    50% {
      filter: drop-shadow(0 0 15px rgba(242, 252, 226, 0.6));
    }
  }
  
  .animate-glow {
    animation: glow 4s ease-in-out infinite;
  }
`;

const TransactionsPage = () => {
  const { t, language } = useLanguage();
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
    console.log("Language changed to:", language);
    
    // Add the animation style to the document head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = pulseAnimationStyle;
    document.head.appendChild(styleElement);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [controls, language]);

  // 添加动画变体配置
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

  // Loading progress 
  const progressValue = 92;

  return (
    <div className="relative min-h-screen">
      {/* Enhanced background layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-dark"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-600/8 rounded-full blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-purple-800/8 rounded-full blur-3xl animate-pulse-subtle opacity-70"></div>
        <div className="absolute top-3/4 right-1/4 -translate-y-1/2 w-[20rem] h-[20rem] bg-blue-900/8 rounded-full blur-3xl animate-pulse-subtle opacity-50"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-neon-green/8 rounded-full blur-3xl"></div>
        
        {/* Additional visual layers */}
        <GradientOverlay />
        <ParticlesLayer />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container mx-auto p-4 md:p-6 relative z-10"
      >
        {/* Page header card with enhanced design */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative group transition-all duration-300 hover:shadow-[0_0_30px_rgba(142,45,226,0.25)] rounded-xl">
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-neon-green to-purple-600"></div>
            <CardContent className="p-4 md:p-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    <TranslatedText keyName="transactions.title" fallback="Transactions" />
                  </h1>
                  <p className="text-blue-300 mt-2">
                    <TranslatedText keyName="transactions.subtitle" fallback="View and manage all transactions on the platform" />
                  </p>
                  
                  {/* Added progress indicator */}
                  <div className="mt-4 w-full md:w-80">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">System Load</span>
                      <span className="text-neon-green">{progressValue}%</span>
                    </div>
                    <Progress value={progressValue} glowColor="rgba(242, 252, 226, 0.5)" className="h-2" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-purple-300 bg-purple-900/30 rounded-full px-3 py-1 flex items-center border border-purple-800/30">
                    <span className="inline-block w-2 h-2 rounded-full bg-neon-green mr-2 animate-pulse"></span>
                    <TranslatedText keyName="transactions.last24Hours" fallback="Last 24 hours transactions" />
                  </span>
                  <div className="h-8 w-8 rounded-full bg-neon-green/10 flex items-center justify-center transition-transform group-hover:rotate-45 duration-300 animate-glow">
                    <ArrowUpRight size={16} className="text-neon-green" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transaction stat cards */}
        <motion.div variants={itemVariants}>
          <TransactionStatCards />
        </motion.div>
        
        {/* Transaction table */}
        <motion.div variants={itemVariants} className="mt-6">
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative rounded-xl">
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
            <CardContent className="p-4 md:p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="w-2 h-8 bg-purple-500 rounded-sm mr-3"></span>
                  <h2 className="text-xl font-semibold text-white">
                    <TranslatedText keyName="transactions.transactionList" fallback="Transaction List" />
                  </h2>
                </div>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="text-purple-400 hover:text-neon-green flex items-center text-sm transition-colors"
                >
                  <TranslatedText keyName="common.viewAll" fallback="View all" />
                  <ChevronRight className="h-4 w-4 ml-1" />
                </motion.button>
              </div>
              <p className="text-gray-400 mb-6 text-sm">
                <TranslatedText keyName="transactions.allTransactions" fallback="All transactions on the platform" />
              </p>
              <TransactionTable />
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Transaction charts */}
        <motion.div variants={itemVariants} className="mt-6">
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative rounded-xl">
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
            <CardContent className="p-4 md:p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="w-2 h-8 bg-neon-green rounded-sm mr-3"></span>
                  <h2 className="text-xl font-semibold text-white">
                    <TranslatedText keyName="transactions.transactionStatistics" fallback="Transaction Statistics" />
                  </h2>
                </div>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="text-purple-400 hover:text-neon-green flex items-center text-sm transition-colors"
                >
                  <TranslatedText keyName="common.viewDetails" fallback="View details" />
                  <ChevronRight className="h-4 w-4 ml-1" />
                </motion.button>
              </div>
              <p className="text-gray-400 mb-6 text-sm">
                <TranslatedText keyName="transactions.transactionAnalytics" fallback="Transaction data analysis and trends" />
              </p>
              <TransactionCharts />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TransactionsPage;
