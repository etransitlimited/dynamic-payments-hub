
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useAnimation } from "framer-motion";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionPageBackground from "./components/TransactionPageBackground";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionChartsSection from "./components/TransactionChartsSection";
import { containerVariants, itemVariants, setupAnimations } from "./utils/animationUtils";

const TransactionsPage: React.FC = () => {
  const { language } = useLanguage();
  const controls = useAnimation();

  useEffect(() => {
    // Start animations when component mounts
    controls.start("visible");
    console.log("TransactionsPage rendered with language:", language);
    
    // Set up animations and return cleanup function
    const cleanupAnimations = setupAnimations();
    
    return cleanupAnimations;
  }, [controls, language]);

  return (
    <div className="relative min-h-screen">
      {/* Background layers */}
      <TransactionPageBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container mx-auto p-4 md:p-6 relative z-10"
      >
        {/* Page header */}
        <TransactionPageHeader />

        {/* Transaction stat cards */}
        <motion.div variants={itemVariants}>
          <TransactionStatCards />
        </motion.div>
        
        {/* Transaction table */}
        <motion.div variants={itemVariants} className="mt-6">
          <TransactionTableSection />
        </motion.div>
        
        {/* Transaction charts */}
        <motion.div variants={itemVariants} className="mt-6">
          <TransactionChartsSection />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TransactionsPage;
