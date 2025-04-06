
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Coins, History, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import StatCard from "@/pages/dashboard/components/StatCard";
import { getTransactionTranslation, formatTransactionTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";
import { useTranslation } from "@/context/TranslationProvider";

const TransactionStatCards = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const { currentLanguage } = useTranslation();
  const [currentLang, setCurrentLang] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState<number>(Date.now());
  
  // Update language state when it changes to force controlled re-render
  useEffect(() => {
    if (currentLang !== language || refreshCounter > 0) {
      console.log(`TransactionStatCards language changed from ${currentLang} to ${language}`);
      setCurrentLang(language as LanguageCode);
      // Only force a full re-render when the language actually changes
      if (currentLang !== language) {
        setForceUpdateKey(Date.now());
      }
    }
  }, [language, currentLang, refreshCounter, currentLanguage]);
  
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

  // Get translations directly using callback to ensure fresh values
  const getTranslation = useCallback((key: string): string => {
    return getTransactionTranslation(key, language as LanguageCode);
  }, [language, forceUpdateKey]);

  // Translations - memoized with dependencies on language and force update key
  const translations = useMemo(() => {
    return {
      totalTransactions: getTranslation("totalTransactions"),
      monthlyTransactions: getTranslation("monthlyTransactions"),
      systemLoad: getTranslation("systemLoad"),
      comparedToLastMonth: getTranslation("comparedToLastMonth"),
      positiveChange: getTranslation("positiveChange"),
      negativeChange: getTranslation("negativeChange")
    };
  }, [getTranslation, language, forceUpdateKey]);

  // Card data - derived from translations
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
  const formatChangeText = useCallback((value: string, isPositive: boolean) => {
    const template = isPositive 
      ? translations.positiveChange
      : translations.negativeChange;
      
    return formatTransactionTranslation(template, { value });
  }, [translations]);

  // Create a stable key that changes only when language or force update changes
  const animationKey = useMemo(() => 
    `stat-cards-${language}-${forceUpdateKey}`, 
    [language, forceUpdateKey]
  );

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
      key={animationKey}
      data-language={language}
    >
      {cards.map((card, index) => (
        <motion.div 
          key={`${index}-${language}-${forceUpdateKey}-${card.title}`} 
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
