
import React, { useMemo, useCallback, memo, useRef, useEffect } from "react";
import { Coins, History, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import StatCard from "@/pages/dashboard/components/StatCard";
import { getTransactionTranslation, formatTransactionTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";
import { useLanguage } from "@/context/LanguageContext";

const TransactionStatCards = () => {
  const { language } = useLanguage();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const { refreshCounter } = useSafeTranslation();
  const [animationKey, setAnimationKey] = React.useState(`stat-cards-${language}-${Date.now()}`);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const changeTextRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  
  // Force refresh when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`TransactionStatCards language updated to: ${language}`);
      languageRef.current = language as LanguageCode;
      setAnimationKey(`stat-cards-${language}-${Date.now()}-${refreshCounter}`);
      
      // Update translations directly in the DOM
      updateTranslations();
    }
  }, [language, refreshCounter]);
  
  // Direct DOM updates for translations
  const updateTranslations = () => {
    const totalTranslation = getTransactionTranslation("totalTransactions", languageRef.current);
    const monthlyTranslation = getTransactionTranslation("monthlyTransactions", languageRef.current);
    const systemLoadTranslation = getTransactionTranslation("systemLoad", languageRef.current);
    
    // Update titles
    if (titleRefs.current[0]) titleRefs.current[0].textContent = totalTranslation;
    if (titleRefs.current[1]) titleRefs.current[1].textContent = monthlyTranslation;
    if (titleRefs.current[2]) titleRefs.current[2].textContent = systemLoadTranslation;
    
    // Update change texts
    const compared = getTransactionTranslation("comparedToLastMonth", languageRef.current);
    const positiveTemplate = getTransactionTranslation("positiveChange", languageRef.current);
    const negativeTemplate = getTransactionTranslation("negativeChange", languageRef.current);
    
    // Format change texts
    const positiveChange1 = formatTransactionTranslation(positiveTemplate, { value: "12.5" });
    const positiveChange2 = formatTransactionTranslation(positiveTemplate, { value: "8.2" });
    const negativeChange = formatTransactionTranslation(negativeTemplate, { value: "3.1" });
    
    if (changeTextRefs.current[0]) changeTextRefs.current[0].textContent = `${positiveChange1} ${compared}`;
    if (changeTextRefs.current[1]) changeTextRefs.current[1].textContent = `${positiveChange2} ${compared}`;
    if (changeTextRefs.current[2]) changeTextRefs.current[2].textContent = `${negativeChange} ${compared}`;
  };

  // Set up translation event listeners
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail && e.detail.language && e.detail.language !== languageRef.current) {
        languageRef.current = e.detail.language as LanguageCode;
        setAnimationKey(`stat-cards-${e.detail.language}-${Date.now()}`);
        
        // Update translations immediately when language changes
        updateTranslations();
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    // Initialize translations
    updateTranslations();
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);
  
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
      value: "1,893",
      icon: <History className="h-5 w-5 text-blue-400" />,
      changeValue: "12.5",
      isPositive: true,
      color: "from-blue-900/30 to-blue-600/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-900/30",
      titleIndex: 0,
      changeIndex: 0
    },
    {
      value: "438",
      icon: <Coins className="h-5 w-5 text-purple-400" />,
      changeValue: "8.2",
      isPositive: true,
      color: "from-purple-900/30 to-purple-600/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-900/30",
      titleIndex: 1,
      changeIndex: 1
    },
    {
      value: "42%",
      icon: <BarChart className="h-5 w-5 text-emerald-400" />,
      changeValue: "3.1",
      isPositive: false,
      color: "from-emerald-900/30 to-emerald-600/10",
      borderColor: "border-emerald-500/20",
      iconBg: "bg-emerald-900/30",
      titleIndex: 2,
      changeIndex: 2
    }
  ], []);

  // Callback functions for title and change text refs
  const setTitleRef = useCallback((element: HTMLDivElement | null, index: number) => {
    titleRefs.current[index] = element;
    
    if (element) {
      const keys = ["totalTransactions", "monthlyTransactions", "systemLoad"];
      element.textContent = getTransactionTranslation(keys[index], languageRef.current);
    }
  }, []);
  
  const setChangeTextRef = useCallback((element: HTMLDivElement | null, index: number) => {
    changeTextRefs.current[index] = element;
    
    if (element) {
      const compared = getTransactionTranslation("comparedToLastMonth", languageRef.current);
      const values = ["12.5", "8.2", "3.1"];
      const isPositive = index < 2; // First two are positive, last one negative
      
      const template = isPositive 
        ? getTransactionTranslation("positiveChange", languageRef.current)
        : getTransactionTranslation("negativeChange", languageRef.current);
        
      const formattedChange = formatTransactionTranslation(template, { value: values[index] });
      element.textContent = `${formattedChange} ${compared}`;
    }
  }, []);

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
      key={animationKey}
      data-language={languageRef.current}
    >
      {cards.map((card, index) => (
        <motion.div 
          key={`${index}-${languageRef.current}`} 
          variants={item}
          transition={{ duration: 0.3 }}
        >
          <StatCard
            title={<div ref={(el) => setTitleRef(el, card.titleIndex)} className="title-text"></div>}
            value={card.value}
            change={<div ref={(el) => setChangeTextRef(el, card.changeIndex)} className="change-text"></div>}
            isPositive={card.isPositive}
            icon={card.icon}
            className={`bg-gradient-to-br ${card.color}`}
            iconClassName={card.iconBg}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(TransactionStatCards);
