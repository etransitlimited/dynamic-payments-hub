
import React from "react";
import { ArrowUpRight, CreditCard, TrendingUp, Users, DollarSign, BarChart2, CreditCard as CreditCardIcon } from "lucide-react";
import StatCard from "../../components/StatCard";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";

const StatCards = () => {
  const { t } = useLanguage();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <motion.div variants={cardVariants}>
        <StatCard
          title={<TranslatedText keyName="analytics.totalRevenue" fallback="Total Revenue" />}
          value="$24,560"
          change="+12.5%"
          compareText={<TranslatedText keyName="analytics.fromLastMonth" fallback="from last month" />}
          icon={<DollarSign className="h-4 w-4 text-green-400" />}
          iconClassName="bg-green-900/30 text-green-400"
        />
      </motion.div>

      <motion.div variants={cardVariants}>
        <StatCard
          title={<TranslatedText keyName="analytics.totalUsers" fallback="Total Users" />}
          value="1,245"
          change="+5.2%"
          compareText={<TranslatedText keyName="analytics.fromLastWeek" fallback="from last week" />}
          icon={<Users className="h-4 w-4 text-blue-400" />}
          iconClassName="bg-blue-900/30 text-blue-400"
        />
      </motion.div>

      <motion.div variants={cardVariants}>
        <StatCard
          title={<TranslatedText keyName="analytics.activeCards" fallback="Active Cards" />}
          value="643"
          change="+8.1%"
          compareText={<TranslatedText keyName="analytics.fromLastMonth" fallback="from last month" />}
          icon={<CreditCardIcon className="h-4 w-4 text-purple-400" />}
          iconClassName="bg-purple-900/30 text-purple-400"
        />
      </motion.div>

      <motion.div variants={cardVariants}>
        <StatCard
          title={<TranslatedText keyName="analytics.conversionRate" fallback="Conversion Rate" />}
          value="3.6%"
          change="+0.8%"
          compareText={<TranslatedText keyName="analytics.fromLastQuarter" fallback="from last quarter" />}
          icon={<BarChart2 className="h-4 w-4 text-amber-400" />}
          iconClassName="bg-amber-900/30 text-amber-400"
        />
      </motion.div>
    </div>
  );
};

export default StatCards;
