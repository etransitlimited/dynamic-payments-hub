import React, { useState, useEffect } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import InformationBox from "./components/InformationBox";
import { motion } from "framer-motion";
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
  
  // 真实 API 调用示例（已注释）
  /* 
  const fetchDepositRecords = async () => {
    try {
      setLoading(true);
      // 实际 API 端点，需要替换为真实地址
      const response = await get('/api/wallet/deposit-records', {
        params: {
          page: 1,
          pageSize: 10,
          // 可能需要的其他查询参数
        }
      });
      
      // 假设 API 返回的数据结构类似
      const { records, totalStats } = response.data;
      
      setDepositRecords(records);
      setStatistics({
        totalDeposits: totalStats.total,
        lastDeposit: totalStats.lastAmount,
        averageDeposit: totalStats.average
      });
    } catch (error) {
      console.error('获取充值记录失败:', error);
      // 可以添加错误处理逻辑，比如显示错误通知
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时或需要刷新时调用
  useEffect(() => {
    // fetchDepositRecords();
  }, []); 
  */

  useEffect(() => {
    console.log(`DepositRecords language updated: ${language}`);
    
    // Force component to re-render with new language
    setForceUpdateKey(Date.now());
    
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
  }, [language]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible" 
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
    </PageLayout>
  );
};

export default DepositRecords;
