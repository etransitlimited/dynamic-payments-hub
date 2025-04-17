import React from "react";
import { Wallet, CreditCard, Users, UserPlus, LayoutDashboard, BarChart, FileText, Bell, Settings } from "lucide-react";
import { NavItem } from "./SidebarNavItem";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

// Direct translations for navigation items to avoid context re-renders
export const navigationTranslations = {
  dashboard: {
    "en": "Dashboard",
    "fr": "Tableau de Bord",
    "es": "Panel de Control",
    "zh-CN": "仪表板",
    "zh-TW": "儀表板"
  },
  analytics: {
    "en": "Analytics",
    "fr": "Analyses",
    "es": "Analíticas",
    "zh-CN": "数据分析",
    "zh-TW": "數據分析"
  },
  transactions: {
    "en": "Transactions",
    "fr": "Transactions",
    "es": "Transacciones",
    "zh-CN": "交易记录",
    "zh-TW": "交易記錄"
  },
  notifications: {
    "en": "Notifications",
    "fr": "Notifications",
    "es": "Notificaciones",
    "zh-CN": "消息通知",
    "zh-TW": "消息通知"
  },
  settings: {
    "en": "Settings",
    "fr": "Paramètres",
    "es": "Configuración",
    "zh-CN": "设置",
    "zh-TW": "設置"
  },
  wallet: {
    title: {
      "en": "Wallet Center",
      "fr": "Centre de Portefeuille",
      "es": "Centro de Cartera",
      "zh-CN": "钱包中心",
      "zh-TW": "錢包中心"
    },
    management: {
      "en": "Wallet Management",
      "fr": "Gestion de Portefeuille",
      "es": "Gestión de Cartera",
      "zh-CN": "钱包管理",
      "zh-TW": "錢包管理"
    },
    fundDetails: {
      "en": "Fund Details",
      "fr": "Détails des Fonds",
      "es": "Detalles de Fondos",
      "zh-CN": "资金明细",
      "zh-TW": "資金明細"
    },
    depositRecords: {
      "en": "Deposit Records",
      "fr": "Registres de Dépôt",
      "es": "Registros de Depósito",
      "zh-CN": "充值记录",
      "zh-TW": "充值記錄"
    }
  },
  cards: {
    title: {
      "en": "Cards Center",
      "fr": "Centre des Cartes",
      "es": "Centro de Tarjetas",
      "zh-CN": "卡片中心",
      "zh-TW": "卡片中心"
    },
    management: {
      "en": "Card Management",
      "fr": "Gestion de Carte",
      "es": "Gestión de Tarjeta",
      "zh-CN": "卡片管理",
      "zh-TW": "卡片管理"
    },
    activationTasks: {
      "en": "Activation Tasks",
      "fr": "Tâches d'activation",
      "es": "Tareas de Activación",
      "zh-CN": "激活任务",
      "zh-TW": "激活任務"
    },
    apply: {
      "en": "Apply Card",
      "fr": "Demander une Carte",
      "es": "Solicitar Tarjeta",
      "zh-CN": "申请卡片",
      "zh-TW": "申請卡片"
    }
  },
  merchant: {
    title: {
      "en": "Merchant Center",
      "fr": "Centre Marchand",
      "es": "Centro de Comerciante",
      "zh-CN": "商户中心",
      "zh-TW": "商戶中心"
    },
    accountSettings: {
      "en": "Account Settings",
      "fr": "Paramètres de Compte",
      "es": "Configuración de Cuenta",
      "zh-CN": "账户设置",
      "zh-TW": "賬戶設置"
    },
    accountInfo: {
      "en": "Account Info",
      "fr": "Infos de Compte",
      "es": "Info de Cuenta",
      "zh-CN": "账户信息",
      "zh-TW": "賬戶信息"
    },
    accountRoles: {
      "en": "Role Permissions",
      "fr": "Permissions de Rôle",
      "es": "Permisos de Rol",
      "zh-CN": "角色权限",
      "zh-TW": "角色權限"
    }
  },
  invitation: {
    title: {
      "en": "Invitation Center",
      "fr": "Centre d'Invitation",
      "es": "Centro de Invitación",
      "zh-CN": "邀请中心",
      "zh-TW": "邀請中心"
    },
    management: {
      "en": "Invitation Management",
      "fr": "Gestion d'Invitation",
      "es": "Gestión de Invitación",
      "zh-CN": "邀请管理",
      "zh-TW": "邀請管理"
    },
    rebateManagement: {
      "en": "Rebate Management",
      "fr": "Gestion de Remise",
      "es": "Gestión de Reembolso",
      "zh-CN": "返利管理",
      "zh-TW": "返利管理"
    }
  },
  quickAccess: {
    dashboard: {
      "en": "Dashboard",
      "fr": "Tableau de Bord",
      "es": "Panel de Control",
      "zh-CN": "仪表板",
      "zh-TW": "儀表板"
    },
    analytics: {
      "en": "Analytics",
      "fr": "Analyses",
      "es": "Analíticas",
      "zh-CN": "数据分析",
      "zh-TW": "數據分析"
    },
    transactions: {
      "en": "Transactions",
      "fr": "Transactions",
      "es": "Transacciones",
      "zh-CN": "交易记录",
      "zh-TW": "交易記錄"
    }
  }
};

// Function to get quick access items with proper translations
export const getQuickAccessItems = (
  translate: (key: string, fallback?: string) => string
): NavItem[] => [
  {
    icon: LayoutDashboard,
    name: "dashboard.quickAccess.dashboard",
    url: "/dashboard",
    translationKey: "dashboard.quickAccess.dashboard",
  },
  {
    icon: BarChart,
    name: "dashboard.quickAccess.analytics",
    url: "/dashboard/analytics",
    translationKey: "dashboard.quickAccess.analytics",
  },
  {
    icon: FileText,
    name: "dashboard.quickAccess.transactions",
    url: "/dashboard/transactions",
    translationKey: "dashboard.quickAccess.transactions",
  },
];

// Navigation groups for the sidebar - structured exactly according to user requirements
export const getNavigationGroups = (
  translate: (key: string, fallback?: string) => string
) => [
  // Wallet center section
  {
    section: "wallet",
    icon: Wallet,
    items: [
      {
        icon: Wallet,
        name: "sidebar.wallet.management",
        url: "/dashboard/wallet/management",
        translationKey: "sidebar.wallet.management",
      },
      {
        icon: FileText,
        name: "sidebar.wallet.fundDetails",
        url: "/dashboard/wallet/fund-details",
        translationKey: "sidebar.wallet.fundDetails",
      },
      {
        icon: FileText,
        name: "sidebar.wallet.depositRecords",
        url: "/dashboard/wallet/deposit-records",
        translationKey: "sidebar.wallet.depositRecords",
      },
    ],
  },
  
  // Cards center section
  {
    section: "cards",
    icon: CreditCard,
    items: [
      {
        icon: CreditCard,
        name: "sidebar.cards.management",
        url: "/dashboard/cards/management",
        translationKey: "sidebar.cards.management",
      },
      {
        icon: CreditCard,
        name: "sidebar.cards.activationTasks",
        url: "/dashboard/cards/activation-tasks",
        translationKey: "sidebar.cards.activationTasks",
      },
      {
        icon: CreditCard,
        name: "sidebar.cards.apply",
        url: "/dashboard/cards/apply",
        translationKey: "sidebar.cards.apply",
      },
    ],
  },
  
  // Merchant center section
  {
    section: "merchant",
    icon: Users,
    items: [
      {
        icon: Users,
        name: "sidebar.merchant.accountSettings",
        url: "/dashboard/merchant/account-settings",
        translationKey: "sidebar.merchant.accountSettings",
      },
      {
        icon: Users,
        name: "sidebar.merchant.accountInfo",
        url: "/dashboard/merchant/account-info",
        translationKey: "sidebar.merchant.accountInfo",
      },
      {
        icon: Users,
        name: "sidebar.merchant.accountRoles",
        url: "/dashboard/merchant/account-roles",
        translationKey: "sidebar.merchant.accountRoles",
      },
    ],
  },
  
  // Invitation center section
  {
    section: "invitation",
    icon: UserPlus,
    items: [
      {
        icon: UserPlus,
        name: "sidebar.invitation.management",
        url: "/dashboard/invitation/management",
        translationKey: "sidebar.invitation.management",
      },
      {
        icon: UserPlus,
        name: "sidebar.invitation.rebateManagement",
        url: "/dashboard/invitation/rebate-management",
        translationKey: "sidebar.invitation.rebateManagement",
      },
    ],
  },
  
  // Notifications section
  {
    section: "notifications",
    icon: Bell,
    items: [
      {
        icon: Bell,
        name: "sidebar.notifications",
        url: "/dashboard/notifications",
        translationKey: "sidebar.notifications",
      }
    ]
  }
];

// Function to get specific section translations
export const getSectionTranslation = (section: string, language: string): string => {
  // Special handling for the transactions section
  if (section === "transactions") {
    // Look up in the navigationTranslations object first
    const translations = {
      "en": "Transactions",
      "fr": "Transactions",
      "es": "Transacciones",
      "zh-CN": "交易记录",
      "zh-TW": "交易記錄"
    };
    
    return translations[language as keyof typeof translations] || section;
  }
  
  // Special handling for specific sections with correct Chinese translations
  if (section === "wallet") {
    const translations = {
      "en": "Wallet Center", 
      "fr": "Centre de Portefeuille",
      "es": "Centro de Cartera",
      "zh-CN": "钱包中心", 
      "zh-TW": "錢包中心"
    };
    return translations[language as keyof typeof translations] || section;
  }
  
  if (section === "cards") {
    const translations = {
      "en": "Cards Center",
      "fr": "Centre des Cartes",
      "es": "Centro de Tarjetas",
      "zh-CN": "卡片中心",
      "zh-TW": "卡片中心"
    };
    return translations[language as keyof typeof translations] || section;
  }
  
  if (section === "merchant") {
    const translations = {
      "en": "Merchant Center",
      "fr": "Centre Marchand", 
      "es": "Centro de Comerciante",
      "zh-CN": "商户中心",
      "zh-TW": "商戶中心"
    };
    return translations[language as keyof typeof translations] || section;
  }
  
  if (section === "invitation") {
    const translations = {
      "en": "Invitation Center",
      "fr": "Centre d'Invitation",
      "es": "Centro de Invitación",
      "zh-CN": "邀请中心",
      "zh-TW": "邀請中心"
    };
    return translations[language as keyof typeof translations] || section;
  }
  
  // For other sections, use the existing logic
  const key = `sidebar.${section}.title`;
  return getDirectTranslation(key, language as any, section);
};
