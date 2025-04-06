
import React, { useMemo, useState, useEffect } from "react";
import { Coins, History, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import StatCard from "@/pages/dashboard/components/StatCard";
import { getTransactionTranslation, formatTransactionTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";

const TransactionStatCards = () => {
  const { language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState(`stat-cards-${language}-${Date.now()}`);
  
  // Update language state when it changes to force controlled re-render
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`TransactionStatCards language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language as LanguageCode);
      setForceUpdateKey(`stat-cards-${language}-${Date.now()}`);
    }
  }, [language, currentLanguage]);
  
  // Define animation variants - memoized to prevent recreation
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

  // Translations - memoized to prevent recreation
  const translations = useMemo(() => {
    return {
      totalTransactions: getTransactionTranslation("totalTransactions", currentLanguage),
      monthlyTransactions: getTransactionTranslation("monthlyTransactions", currentLanguage),
      systemLoad: getTransactionTranslation("systemLoad", currentLanguage),
      comparedToLastMonth: getTransactionTranslation("comparedToLastMonth", currentLanguage),
      positiveChange: getTransactionTranslation("positiveChange", currentLanguage),
      negativeChange: getTransactionTranslation("negativeChange", currentLanguage)
    };
  }, [currentLanguage]);

  // Card data - memoized to prevent recreation
  const cards = useMemo(() => [
    {
      title: translations.totalTransactions,
      value: "1,893",
      icon: <History className="h-5 w-5 text-blue-400" />,
      changeValue: "12.5",
      isPositive: true,
      color: "from-blue-900/30 to-blue-600/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-900/30",
    },
    {
      title: translations.monthlyTransactions,
      value: "438",
      icon: <Coins className="h-5 w-5 text-purple-400" />,
      changeValue: "8.2",
      isPositive: true,
      color: "from-purple-900/30 to-purple-600/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-900/30",
    },
    {
      title: translations.systemLoad,
      value: "42%",
      icon: <BarChart className="h-5 w-5 text-emerald-400" />,
      changeValue: "3.1",
      isPositive: false,
      color: "from-emerald-900/30 to-emerald-600/10",
      borderColor: "border-emerald-500/20",
      iconBg: "bg-emerald-900/30",
    }
  ], [translations]);

  // Format change text with proper value replacement
  const formatChangeText = useMemo(() => {
    return (value: string, isPositive: boolean) => {
      const template = isPositive 
        ? translations.positiveChange
        : translations.negativeChange;
        
      return formatTransactionTranslation(template, { value });
    };
  }, [translations]);

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
      key={forceUpdateKey}
      data-language={currentLanguage}
    >
      {cards.map((card, index) => (
        <motion.div 
          key={`${index}-${currentLanguage}-${card.title}`} 
          variants={item}
        >
          <StatCard
            title={card.title}
            value={card.value}
            change={formatChangeText(card.changeValue, card.isPositive)}
            isPositive={card.isPositive}
            compareText={translations.comparedToLastMonth}
            icon={card.icon}
            className={`bg-gradient-to-br ${card.color}`}
            iconClassName={card.iconBg}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default React.memo(TransactionStatCards);
