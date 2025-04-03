
import React, { useMemo } from "react";
import { Coins, History, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import StatCard from "@/pages/dashboard/components/StatCard";
import { getTransactionTranslation, formatTransactionTranslation } from "../i18n";

const TransactionStatCards = () => {
  const { language } = useSafeTranslation();
  
  // Define animation variants
  const container = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }), []);
  
  const item = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }), []);

  // Card data
  const cards = useMemo(() => [
    {
      titleKey: "totalTransactions",
      value: "1,893",
      icon: <History className="h-5 w-5 text-blue-400" />,
      changeValue: "12.5",
      isPositive: true,
      color: "from-blue-900/30 to-blue-600/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-900/30",
    },
    {
      titleKey: "monthlyTransactions",
      value: "438",
      icon: <Coins className="h-5 w-5 text-purple-400" />,
      changeValue: "8.2",
      isPositive: true,
      color: "from-purple-900/30 to-purple-600/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-900/30",
    },
    {
      titleKey: "systemLoad",
      value: "42%",
      icon: <BarChart className="h-5 w-5 text-emerald-400" />,
      changeValue: "3.1",
      isPositive: false,
      color: "from-emerald-900/30 to-emerald-600/10",
      borderColor: "border-emerald-500/20",
      iconBg: "bg-emerald-900/30",
    }
  ], []);

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
      key={`stat-cards-${language}`}
    >
      {cards.map((card, index) => (
        <motion.div key={`${card.titleKey}-${language}-${index}`} variants={item}>
          <StatCard
            title={getTransactionTranslation(card.titleKey, language)}
            value={card.value}
            change={
              card.isPositive 
                ? formatTransactionTranslation(
                    getTransactionTranslation("positiveChange", language),
                    { value: card.changeValue }
                  )
                : formatTransactionTranslation(
                    getTransactionTranslation("negativeChange", language),
                    { value: card.changeValue }
                  )
            }
            isPositive={card.isPositive}
            compareText={getTransactionTranslation("comparedToLastMonth", language)}
            icon={card.icon}
            className={`bg-gradient-to-br ${card.color}`}
            iconClassName={card.iconBg}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TransactionStatCards;
