
import React from "react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  const { t, language } = useSafeTranslation();
  
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
      },
      "common.cardManagement": {
        "en": "Card Management",
        "zh-CN": "卡片管理",
        "zh-TW": "卡片管理",
        "fr": "Gestion des Cartes",
        "es": "Gestión de Tarjetas"
      },
      "common.cardManagementDesc": {
        "en": "Manage card accounts and settings",
        "zh-CN": "管理卡片账户和设置",
        "zh-TW": "管理卡片賬戶和設置",
        "fr": "Gérer les comptes de cartes et les paramètres",
        "es": "Gestionar cuentas de tarjetas y configuraciones"
      },
      "common.walletManagement": {
        "en": "Wallet Management",
        "zh-CN": "钱包管理",
        "zh-TW": "錢包管理",
        "fr": "Gestion du Portefeuille",
        "es": "Gestión de Billetera"
      },
      "common.walletManagementDesc": {
        "en": "Manage wallet and transaction records",
        "zh-CN": "管理钱包和交易记录",
        "zh-TW": "管理錢包和交易記錄",
        "fr": "Gérer le portefeuille et les registres de transactions",
        "es": "Gestionar billetera y registros de transacciones"
      },
      "common.depositManagement": {
        "en": "Deposit Management",
        "zh-CN": "存款管理",
        "zh-TW": "存款管理",
        "fr": "Gestion des Dépôts",
        "es": "Gestión de Depósitos"
      },
      "common.roleManagement": {
        "en": "Role Management",
        "zh-CN": "角色管理",
        "zh-TW": "角色管理",
        "fr": "Gestion des Rôles",
        "es": "Gestión de Roles"
      },
      "common.roleManagementDesc": {
        "en": "Manage roles and permissions",
        "zh-CN": "管理角色和权限",
        "zh-TW": "管理角色和權限",
        "fr": "Gérer les rôles et les permissions",
        "es": "Gestionar roles y permisos"
      }
    };
    
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
