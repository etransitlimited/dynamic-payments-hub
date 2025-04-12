
import React, { useState, useEffect } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import InformationBox from "./components/InformationBox";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/dashboard/PageLayout";
import { usePageLanguage } from "@/hooks/use-page-language";
import { LanguageCode } from "@/utils/languageUtils";
// 导入模拟数据
import mockData from "@/data/depositRecords.json";
// 导入 API 调用工具
import { get } from '@/core/api/httpClient';
// 导入新创建的组件
import DepositStatsSection from "./components/DepositStatsSection";
import DepositTableSection from "./components/DepositTableSection";

const DepositRecords = () => {
  const { t, language } = useSafeTranslation();
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  const pageLanguage = usePageLanguage('wallet.depositRecords.statistics', 'Deposit Statistics');
  
  // 使用从JSON文件导入的模拟数据
  const [depositRecords, setDepositRecords] = useState(mockData.depositRecords);
  const [statistics, setStatistics] = useState(mockData.statistics);
  const [loading, setLoading] = useState(false);
  
  // 添加新的状态用于平滑过渡
  const [isVisible, setIsVisible] = useState(true);

  // 页面加载和语言变化时的效果
  useEffect(() => {
    console.log(`DepositRecords language updated: ${language}`);
    
    // 触发过渡动画
    setIsVisible(false);
    
    // 短暂延迟后重新显示内容，创造平滑过渡
    const timer = setTimeout(() => {
      setForceUpdateKey(Date.now());
      setIsVisible(true);
    }, 50);
    
    // Update document title with translated title for better accessibility
    const recordsTranslations: Record<LanguageCode, string> = {
      'en': 'Deposit Records',
      'es': 'Registros de Depósito',
      'fr': 'Registres de Dépôt',
      'zh-CN': '充值记录',
      'zh-TW': '充值記錄'
    };
    
    document.title = recordsTranslations[language as LanguageCode] || 'Deposit Records';
    
    // Dispatch an event to update sidebar navigation highlighting
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('depositrecords:pageload', {
        detail: { language, path: '/dashboard/wallet/deposit-records' }
      });
      document.dispatchEvent(event);
    }
    
    return () => clearTimeout(timer);
  }, [language]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    exit: { opacity: 0, y: -10 }
  };
  
  // Setup breadcrumbs for navigation with updated path
  const breadcrumbs = [
    {
      label: t("sidebar.dashboard"),
      href: "/dashboard"
    },
    {
      label: t("wallet.walletManagement"),
      href: "/dashboard/wallet"
    },
    {
      label: t("wallet.depositRecords.statistics")
    }
  ];
  
  return (
    <PageLayout
      title={t("wallet.depositRecords.statistics")}
      subtitle={t("wallet.depositRecords.viewHistory")}
      breadcrumbs={breadcrumbs}
      animationKey={`deposit-records-${language}-${forceUpdateKey}`}
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
            key={`records-container-${forceUpdateKey}`}
            data-language={language}
          >
            <DepositStatsSection statistics={statistics} />
            
            <DepositTableSection depositRecords={depositRecords} />
            
            <motion.div variants={itemVariants}>
              <InformationBox 
                title={t("wallet.depositRecords.infoTitle")}
                items={[{ text: t("wallet.depositRecords.infoDescription") }]}
                currentLanguage={language}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default DepositRecords;
