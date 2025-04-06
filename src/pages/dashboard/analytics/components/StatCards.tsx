
import React, { useMemo } from "react";
import { ArrowUpRight, CreditCard, TrendingUp, Users, DollarSign, BarChart2, CreditCard as CreditCardIcon } from "lucide-react";
import StatCard from "../../components/StatCard";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

const StatCards = () => {
  const { language, refreshCounter } = useSafeTranslation();
  
  // Use direct translation to prevent stale translations
  const translations = useMemo(() => ({
    totalRevenue: getDirectTranslation("analytics.totalRevenue", language as LanguageCode, "Total Revenue"),
    totalUsers: getDirectTranslation("analytics.totalUsers", language as LanguageCode, "Total Users"),
    activeCards: getDirectTranslation("analytics.activeCards", language as LanguageCode, "Active Cards"),
    conversionRate: getDirectTranslation("analytics.conversionRate", language as LanguageCode, "Conversion Rate"),
    fromLastMonth: getDirectTranslation("analytics.fromLastMonth", language as LanguageCode, "from last month"),
    fromLastWeek: getDirectTranslation("analytics.fromLastWeek", language as LanguageCode, "from last week"),
    fromLastQuarter: getDirectTranslation("analytics.fromLastQuarter", language as LanguageCode, "from last quarter"),
  }), [language, refreshCounter]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };
  
  // Create a stable key for re-rendering
  const statKey = `stat-cards-${language}-${refreshCounter}`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" key={statKey} data-language={language}>
      <motion.div variants={cardVariants}>
        <StatCard
          title={translations.totalRevenue}
          value="$24,560"
          change="+12.5%"
          compareText={translations.fromLastMonth}
          icon={<DollarSign className="h-4 w-4 text-green-400" />}
          iconClassName="bg-green-900/30 text-green-400"
        />
      </motion.div>

      <motion.div variants={cardVariants}>
        <StatCard
          title={translations.totalUsers}
          value="1,245"
          change="+5.2%"
          compareText={translations.fromLastWeek}
          icon={<Users className="h-4 w-4 text-blue-400" />}
          iconClassName="bg-blue-900/30 text-blue-400"
        />
      </motion.div>

      <motion.div variants={cardVariants}>
        <StatCard
          title={translations.activeCards}
          value="643"
          change="+8.1%"
          compareText={translations.fromLastMonth}
          icon={<CreditCardIcon className="h-4 w-4 text-purple-400" />}
          iconClassName="bg-purple-900/30 text-purple-400"
        />
      </motion.div>

      <motion.div variants={cardVariants}>
        <StatCard
          title={translations.conversionRate}
          value="3.6%"
          change="+0.8%"
          compareText={translations.fromLastQuarter}
          icon={<BarChart2 className="h-4 w-4 text-amber-400" />}
          iconClassName="bg-amber-900/30 text-amber-400"
        />
      </motion.div>
    </div>
  );
};

export default StatCards;
