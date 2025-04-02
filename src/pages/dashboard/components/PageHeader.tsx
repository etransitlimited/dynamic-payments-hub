
import React from "react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  const { language } = useSafeTranslation();
  
  // Get specific translations for common titles
  const getTitleTranslation = (titleKey: string) => {
    // Common page titles in different languages
    const titleFallbacks: Record<string, Record<string, string>> = {
      "sidebar.analytics": {
        "en": "Analytics Dashboard",
        "zh-CN": "数据分析",
        "zh-TW": "數據分析",
        "fr": "Tableau de Bord Analytique",
        "es": "Panel de Análisis"
      },
      "sidebar.transactions": {
        "en": "Transactions",
        "zh-CN": "交易记录",
        "zh-TW": "交易記錄",
        "fr": "Transactions",
        "es": "Transacciones"
      },
      "sidebar.wallet.deposit": {
        "en": "Wallet Deposit",
        "zh-CN": "钱包充值",
        "zh-TW": "錢包充值",
        "fr": "Dépôt de Portefeuille",
        "es": "Depósito de Billetera"
      },
      "accountManagement.title": {
        "en": "Account Management",
        "zh-CN": "账户管理",
        "zh-TW": "帳戶管理",
        "fr": "Gestion de Compte",
        "es": "Gestión de Cuenta"
      },
      "analytics.subtitle": {
        "en": "Track your business performance and metrics",
        "zh-CN": "跟踪您的业务表现和指标",
        "zh-TW": "跟踪您的業務表現和指標",
        "fr": "Suivez les performances et les métriques de votre entreprise",
        "es": "Seguimiento del rendimiento y métricas de su negocio"
      },
      "transactions.subtitle": {
        "en": "View and manage all transactions in the platform",
        "zh-CN": "查看和管理平台上的所有交易",
        "zh-TW": "查看和管理平台上的所有交易",
        "fr": "Consultez et gérez toutes les transactions sur la plateforme",
        "es": "Ver y gestionar todas las transacciones en la plataforma"
      },
      "accountManagement.subtitle": {
        "en": "Manage accounts, roles and permissions",
        "zh-CN": "管理账户、角色和权限",
        "zh-TW": "管理帳戶、角色和權限",
        "fr": "Gérer les comptes, les rôles et les permissions",
        "es": "Gestionar cuentas, roles y permisos"
      }
    };

    return titleFallbacks[titleKey]?.[language] || titleKey;
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
        {typeof title === 'string' ? (
          <TranslatedText keyName={title} fallback={getTitleTranslation(title)} />
        ) : title}
      </h1>
      {description && (
        <p className="mt-2 text-blue-300 max-w-2xl">
          {typeof description === 'string' ? (
            <TranslatedText keyName={description} fallback={getTitleTranslation(description)} />
          ) : description}
        </p>
      )}
    </motion.div>
  );
};

export default PageHeader;
