
import React, { useMemo } from "react";
import { Coins, History, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import TranslatedText from "@/components/translation/TranslatedText";
import StatCard from "@/pages/dashboard/components/StatCard";

const TransactionStatCards = () => {
  const { t, language } = useSafeTranslation();
  
  // Animation variants for staggered animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Format the change percentage with the appropriate translation key and values
  const formatChangeValue = (value: string, isPositive: boolean) => {
    // Remove the + or - from the start of the value to use as a replacement value
    const numericValue = value.replace(/^[+-]/, '');
    
    // Use the appropriate translation key based on whether the change is positive or negative
    return (
      <TranslatedText 
        keyName={isPositive ? "transactions.positiveChange" : "transactions.negativeChange"} 
        values={{ value: numericValue }}
      />
    );
  };

  // Card data - memoized to avoid re-creation on renders
  const cards = useMemo(() => [
    {
      title: "transactions.totalTransactions",
      titleFallback: "Total Transactions",
      value: "1,893",
      icon: <History className="h-5 w-5 text-blue-400" />,
      change: "+12.5%",
      isPositive: true,
      color: "from-blue-900/30 to-blue-600/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-900/30",
    },
    {
      title: "transactions.monthlyTransactions",
      titleFallback: "Monthly Transactions",
      value: "438",
      icon: <Coins className="h-5 w-5 text-purple-400" />,
      change: "+8.2%",
      isPositive: true,
      color: "from-purple-900/30 to-purple-600/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-900/30",
    },
    {
      title: "transactions.systemLoad",
      titleFallback: "System Load",
      value: "42%",
      icon: <BarChart className="h-5 w-5 text-emerald-400" />,
      change: "-3.1%",
      isPositive: false,
      color: "from-emerald-900/30 to-emerald-600/10",
      borderColor: "border-emerald-500/20",
      iconBg: "bg-emerald-900/30",
    }
  ], []);

  // Format the compare text with the appropriate translation
  const compareText = useMemo(() => (
    <TranslatedText 
      keyName="transactions.comparedToLastMonth" 
      fallback="compared to last month" 
    />
  ), [language]);

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
      key={`stat-cards-${language}`}
    >
      {cards.map((card, index) => (
        <motion.div key={`${card.title}-${language}-${index}`} variants={item}>
          <StatCard
            title={
              <TranslatedText 
                keyName={card.title} 
                fallback={card.titleFallback} 
              />
            }
            value={card.value}
            change={formatChangeValue(card.change, card.isPositive)}
            isPositive={card.isPositive}
            compareText={compareText}
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
