
import React, { useState, useEffect, useMemo } from "react";
import TransactionPageBackground from "./components/TransactionPageBackground";
import TransactionPageHeader from "./components/TransactionPageHeader";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTableSection from "./components/TransactionTableSection";
import TransactionChartsSection from "./components/TransactionChartsSection";
import TransactionSearch from "./components/TransactionSearch";
import { motion, AnimatePresence } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useToast } from "@/hooks/use-toast";

const TransactionsPage = () => {
  const { t, language } = useSafeTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState(language); // 跟踪语言以进行重新渲染
  const { toast } = useToast();
  
  // 调试日志当前语言
  useEffect(() => {
    console.log(`TransactionsPage current language: ${language}, state: ${currentLanguage}`);
  }, [language, currentLanguage]);
  
  // 在语言更改时更新以强制重新渲染
  useEffect(() => {
    if (language !== currentLanguage) {
      console.log(`Language changed from ${currentLanguage} to ${language}, triggering re-render`);
      setCurrentLanguage(language);
    }
  }, [language, currentLanguage]);
  
  // 为子元素定义交错动画，优化时间
  const container = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  }), []);
  
  const handleFilterClick = () => {
    toast({
      title: t("transactions.filterApplied"),
      description: t("transactions.filterDescription"),
      variant: "default"
    });
    console.log("Filter button clicked");
  };

  const handleDateFilterClick = () => {
    toast({
      title: t("transactions.dateFilterApplied"),
      description: t("transactions.dateRangeSelected"),
      variant: "default"
    });
    console.log("Date filter button clicked");
  };
  
  // 更新文档标题
  useEffect(() => {
    document.title = `${t("transactions.title")} | ${t("dashboard.dashboard")}`;
  }, [t, currentLanguage]);
  
  return (
    <div className="relative min-h-full">
      {/* 背景元素 */}
      <TransactionPageBackground />
      
      {/* 内容与动画 */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`transaction-page-${currentLanguage}`} // 在语言更改时强制重新渲染
          className="relative z-10 px-1 sm:px-2"
          variants={container}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
        >
          {/* 标题 */}
          <TransactionPageHeader />
          
          {/* 统计卡片 */}
          <TransactionStatCards />
          
          {/* 搜索和过滤器 */}
          <div className="my-5 sm:my-6">
            <TransactionSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onFilterClick={handleFilterClick}
              onDateFilterClick={handleDateFilterClick}
            />
          </div>
          
          {/* 交易表和图表 */}
          <div className="space-y-5 sm:space-y-6">
            {/* 交易表 */}
            <div>
              <TransactionTableSection />
            </div>
            
            {/* 图表和分析 */}
            <div>
              <TransactionChartsSection />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TransactionsPage;
