
import React, { useState, useEffect } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import RecordCard from "./components/RecordCard";
import DepositTable from "./components/DepositTable";
import InformationBox from "./components/InformationBox";
import { motion } from "framer-motion";
import { BarChart3, Calendar, DollarSign } from "lucide-react";
import PageLayout from "@/components/dashboard/PageLayout";
import { usePageLanguage } from "@/hooks/use-page-language";
import { LanguageCode } from "@/utils/languageUtils";
// 导入模拟数据
import mockData from "@/data/depositRecords.json";

const DepositRecords = () => {
  const { t, language } = useSafeTranslation();
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  const pageLanguage = usePageLanguage('wallet.depositRecords.statistics', 'Deposit Statistics');
  
  // 使用从JSON文件导入的模拟数据
  const depositRecords = mockData.depositRecords;
  const statistics = mockData.statistics;
  
  // Update component when language changes
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
        <motion.div 
          variants={itemVariants}
          className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="relative z-10 p-6">
            <RecordCard 
              title={t("wallet.depositRecords.viewHistory")} 
              icon={<BarChart3 size={18} />}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-indigo-900/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-4 w-4 text-indigo-300 mr-2" />
                    <span className="text-indigo-300 text-sm">{t("wallet.deposit.totalDeposits")}</span>
                  </div>
                  <p className="text-2xl font-semibold text-white">${statistics.totalDeposits}</p>
                </div>
                <div className="bg-indigo-900/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 text-indigo-300 mr-2" />
                    <span className="text-indigo-300 text-sm">{t("wallet.deposit.lastDeposit")}</span>
                  </div>
                  <p className="text-2xl font-semibold text-white">${statistics.lastDeposit}</p>
                </div>
                <div className="bg-indigo-900/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <BarChart3 className="h-4 w-4 text-indigo-300 mr-2" />
                    <span className="text-indigo-300 text-sm">{t("wallet.depositRecords.averageDeposit")}</span>
                  </div>
                  <p className="text-2xl font-semibold text-white">${statistics.averageDeposit}</p>
                </div>
              </div>
            </RecordCard>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          
          <div className="relative z-10 p-6">
            <DepositTable depositRecords={depositRecords} />
          </div>
        </motion.div>
        
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
