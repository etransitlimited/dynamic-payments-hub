
import React, { useEffect, useState, useMemo } from "react";
import { Coins, History, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import TranslatedText from "@/components/translation/TranslatedText";
import StatCard from "@/pages/dashboard/components/StatCard";

const TransactionStatCards = () => {
  const { t, language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  
  // 监听语言变化并触发重新渲染
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`TransactionStatCards language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language);
    }
  }, [language, currentLanguage]);
  
  // 定义动画变体
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

  // 卡片数据
  const cards = useMemo(() => [
    {
      title: "transactions.totalTransactions",
      value: "1,893",
      icon: <History className="h-5 w-5 text-blue-400" />,
      changeValue: "12.5",
      isPositive: true,
      color: "from-blue-900/30 to-blue-600/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-900/30",
    },
    {
      title: "transactions.monthlyTransactions",
      value: "438",
      icon: <Coins className="h-5 w-5 text-purple-400" />,
      changeValue: "8.2",
      isPositive: true,
      color: "from-purple-900/30 to-purple-600/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-900/30",
    },
    {
      title: "transactions.systemLoad",
      value: "42%",
      icon: <BarChart className="h-5 w-5 text-emerald-400" />,
      changeValue: "3.1",
      isPositive: false,
      color: "from-emerald-900/30 to-emerald-600/10",
      borderColor: "border-emerald-500/20",
      iconBg: "bg-emerald-900/30",
    }
  ], []);

  // 添加额外调试
  if (process.env.NODE_ENV !== 'production') {
    console.log(`TransactionStatCards rendering with language: ${language}`);
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
      key={`stat-cards-${currentLanguage}`} // 确保语言变化时强制重新渲染
    >
      {cards.map((card, index) => (
        <motion.div key={`${card.title}-${currentLanguage}-${index}`} variants={item}>
          <StatCard
            title={
              <TranslatedText 
                keyName={card.title} 
              />
            }
            value={card.value}
            change={
              card.isPositive 
                ? <TranslatedText 
                    keyName="transactions.positiveChange"
                    values={{ value: card.changeValue }}
                  />
                : <TranslatedText 
                    keyName="transactions.negativeChange"
                    values={{ value: card.changeValue }}
                  />
            }
            isPositive={card.isPositive}
            compareText={
              <TranslatedText 
                keyName="transactions.comparedToLastMonth" 
              />
            }
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
