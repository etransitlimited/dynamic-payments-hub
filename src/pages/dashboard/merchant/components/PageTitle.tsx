
import React from "react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface PageTitleProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  const { language } = useSafeTranslation();
  
  // Common translations for account management pages
  const getTitleTranslation = (titleKey: string): string => {
    if (titleKey === "accountManagement.title") {
      switch (language) {
        case "zh-CN": return "账户管理";
        case "zh-TW": return "帳戶管理";
        case "fr": return "Gestion de Compte";
        case "es": return "Gestión de Cuenta";
        default: return "Account Management";
      }
    }
    
    if (titleKey === "accountInfo.title") {
      switch (language) {
        case "zh-CN": return "账户信息";
        case "zh-TW": return "帳戶信息";
        case "fr": return "Informations du Compte";
        case "es": return "Información de Cuenta";
        default: return "Account Information";
      }
    }
    
    if (titleKey === "accountRoles.title") {
      switch (language) {
        case "zh-CN": return "账户角色";
        case "zh-TW": return "帳戶角色";
        case "fr": return "Rôles du Compte";
        case "es": return "Roles de Cuenta";
        default: return "Account Roles";
      }
    }
    
    // Add fallback for subtitle
    if (titleKey === "accountInfo.dataMetrics") {
      switch (language) {
        case "zh-CN": return "数据指标";
        case "zh-TW": return "數據指標";
        case "fr": return "Métriques de Données";
        case "es": return "Métricas de Datos";
        default: return "Data Metrics";
      }
    }
    
    return titleKey;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        {typeof title === "string" ? (
          <TranslatedText keyName={title} fallback={getTitleTranslation(title)} />
        ) : (
          title
        )}
      </h1>
      {subtitle && (
        <p className="mt-2 text-purple-200 text-sm md:text-base">
          {typeof subtitle === "string" ? (
            <TranslatedText keyName={subtitle} fallback={getTitleTranslation(subtitle)} />
          ) : (
            subtitle
          )}
        </p>
      )}
    </motion.div>
  );
};

export default PageTitle;
