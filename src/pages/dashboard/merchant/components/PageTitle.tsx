
import React from "react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  const { t } = useSafeTranslation();
  
  // Check if translations exists for the provided keys
  const hasTranslation = (key: string): boolean => {
    const translation = t(key);
    return translation !== key;
  };

  // Get specific translations for common titles that may be missing
  const getTitleTranslation = (titleKey: string) => {
    // Common page titles in different languages
    const titleFallbacks: Record<string, Record<string, string>> = {
      "common.accountManagement": {
        "en": "Account Management",
        "zh-CN": "账户管理",
        "zh-TW": "帳戶管理",
        "fr": "Gestion de Compte",
        "es": "Gestión de Cuenta"
      },
      "common.userManagement": {
        "en": "User Management",
        "zh-CN": "用户管理",
        "zh-TW": "用戶管理",
        "fr": "Gestion des Utilisateurs",
        "es": "Gestión de Usuarios"
      },
      "common.userManagementDesc": {
        "en": "Manage user accounts and access levels",
        "zh-CN": "管理用户账户和访问级别",
        "zh-TW": "管理用戶帳戶和訪問級別",
        "fr": "Gérer les comptes utilisateurs et les niveaux d'accès",
        "es": "Gestionar cuentas de usuario y niveles de acceso"
      }
    };
    
    const { language } = useSafeTranslation();
    return titleFallbacks[titleKey]?.[language] || null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        <TranslatedText 
          keyName={title} 
          fallback={getTitleTranslation(title) || (hasTranslation(title) ? undefined : title)} 
        />
      </h1>
      {subtitle && (
        <p className="mt-2 text-purple-200 text-sm md:text-base">
          <TranslatedText 
            keyName={subtitle} 
            fallback={getTitleTranslation(subtitle) || (hasTranslation(subtitle) ? undefined : subtitle)} 
          />
        </p>
      )}
    </motion.div>
  );
};

export default PageTitle;
