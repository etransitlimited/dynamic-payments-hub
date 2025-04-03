
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, DollarSign, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getFundDetailsTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";
import { formatUSD } from "@/utils/currencyUtils";

interface FundDetailsStatsProps {
  totalTransactions: number;
  totalAmount: number;
  averageAmount: number;
  isLoading?: boolean;
}

const FundDetailsStats: React.FC<FundDetailsStatsProps> = ({
  totalTransactions,
  totalAmount,
  averageAmount,
  isLoading = false
}) => {
  const { language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState(`stats-${language}-${Date.now()}`);
  
  // Force re-render when language changes
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`FundDetailsStats language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language as LanguageCode);
      setForceUpdateKey(`stats-${language}-${Date.now()}`);
    }
  }, [language, currentLanguage]);
  
  const getTranslation = (key: string): string => {
    return getFundDetailsTranslation(key, currentLanguage);
  };
  
  // Skeleton loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-pulse">
        {[1, 2, 3].map((index) => (
          <div key={index} className="h-28 bg-charcoal-dark/50 rounded-xl"></div>
        ))}
      </div>
    );
  }
  
  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const statCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };
  
  return (
    <motion.div
      variants={statsVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
      key={forceUpdateKey}
      data-language={currentLanguage}
    >
      {/* Total Transactions */}
      <motion.div variants={statCardVariants}>
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow overflow-hidden">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-purple-900/40 rounded-lg">
              <Activity className="h-5 w-5 text-purple-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-purple-200/80">{getTranslation('totalTransactions')}</p>
              <p className="text-xl font-semibold text-white">{totalTransactions}</p>
              <Progress value={totalTransactions > 0 ? 100 : 0} className="h-1 mt-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Total Amount */}
      <motion.div variants={statCardVariants}>
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-purple-900/40 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-purple-200/80">{getTranslation('totalAmount')}</p>
              <p className="text-xl font-semibold text-white">{formatUSD(totalAmount)}</p>
              <Progress value={totalAmount > 0 ? Math.min(totalAmount / 1000 * 10, 100) : 0} className="h-1 mt-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Average Amount */}
      <motion.div variants={statCardVariants}>
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-purple-900/40 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-purple-200/80">{getTranslation('averageAmount')}</p>
              <p className="text-xl font-semibold text-white">{formatUSD(averageAmount)}</p>
              <Progress value={averageAmount > 0 ? Math.min(averageAmount / 500 * 10, 100) : 0} className="h-1 mt-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default FundDetailsStats;
