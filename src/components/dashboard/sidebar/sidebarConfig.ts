
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
    "zh-CN": "通知",
    "zh-TW": "通知"
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
      "en": "Wallet",
      "fr": "Portefeuille",
      "es": "Cartera",
      "zh-CN": "钱包",
      "zh-TW": "錢包"
    },
    deposit: {
      "en": "Deposit",
      "fr": "Dépôt",
      "es": "Depósito",
      "zh-CN": "充值",
      "zh-TW": "充值"
    },
    depositRecords: {
      "en": "Deposit Records",
      "fr": "Registres de Dépôt",
      "es": "Registros de Depósito",
      "zh-CN": "充值记录",
      "zh-TW": "充值記錄"
    },
    fundDetails: {
      "en": "Fund Details",
      "fr": "Détails des Fonds",
      "es": "Detalles de Fondos",
      "zh-CN": "资金明细",
      "zh-TW": "資金明細"
    }
  },
  cards: {
    title: {
      "en": "Cards",
      "fr": "Cartes",
      "es": "Tarjetas",
      "zh-CN": "卡片管理",
      "zh-TW": "卡片管理"
    },
    search: {
      "en": "Card Search",
      "fr": "Recherche de Carte",
      "es": "Búsqueda de Tarjeta",
      "zh-CN": "卡片搜索",
      "zh-TW": "卡片搜索"
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
      "en": "Merchant",
      "fr": "Marchand",
      "es": "Comerciante",
      "zh-CN": "商户中心",
      "zh-TW": "商戶中心"
    },
    accountManagement: {
      "en": "Account Management",
      "fr": "Gestion de Compte",
      "es": "Gestión de Cuenta",
      "zh-CN": "账户管理",
      "zh-TW": "賬戶管理"
    },
    accountInfo: {
      "en": "Account Info",
      "fr": "Infos de Compte",
      "es": "Info de Cuenta",
      "zh-CN": "账户信息",
      "zh-TW": "賬戶信息"
    },
    accountRoles: {
      "en": "Account Roles",
      "fr": "Rôles de Compte",
      "es": "Roles de Cuenta",
      "zh-CN": "账户角色",
      "zh-TW": "賬戶角色"
    }
  },
  invitation: {
    title: {
      "en": "Invitation",
      "fr": "Invitation",
      "es": "Invitación",
      "zh-CN": "邀请管理",
      "zh-TW": "邀請管理"
    },
    list: {
      "en": "Invitation List",
      "fr": "Liste d'Invitations",
      "es": "Lista de Invitaciones",
      "zh-CN": "邀请列表",
      "zh-TW": "邀請列表"
    },
    rebateList: {
      "en": "Rebate List",
      "fr": "Liste de Remises",
      "es": "Lista de Reembolsos",
      "zh-CN": "返利列表",
      "zh-TW": "返利列表"
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
    notifications: {
      "en": "Notifications",
      "fr": "Notifications",
      "es": "Notificaciones",
      "zh-CN": "通知",
      "zh-TW": "通知"
    },
    settings: {
      "en": "Settings",
      "fr": "Paramètres",
      "es": "Configuración",
      "zh-CN": "设置",
      "zh-TW": "設置"
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
    name: "transactions.pageTitle", // Using a direct key from transactions translations
    url: "/dashboard/transactions",
    translationKey: "transactions.pageTitle", // Updated translation key
  },
  {
    icon: Bell,
    name: "dashboard.quickAccess.notifications",
    url: "/dashboard/notifications",
    translationKey: "dashboard.quickAccess.notifications",
  },
  {
    icon: Settings,
    name: "dashboard.quickAccess.settings",
    url: "/dashboard/settings",
    translationKey: "dashboard.quickAccess.settings",
  },
];

// Navigation groups for the sidebar
export const getNavigationGroups = (
  translate: (key: string, fallback?: string) => string
) => [
  {
    section: "wallet",
    icon: Wallet,
    items: [
      {
        icon: Wallet,
        name: "sidebar.wallet.title",
        url: "/dashboard/wallet",
        translationKey: "sidebar.wallet.title",
      },
      {
        icon: Wallet,
        name: "sidebar.wallet.deposit",
        url: "/dashboard/wallet/deposit",
        translationKey: "sidebar.wallet.deposit",
      },
      {
        icon: FileText,
        name: "sidebar.wallet.depositRecords",
        url: "/dashboard/wallet/deposit-records",
        translationKey: "sidebar.wallet.depositRecords",
      },
      {
        icon: BarChart,
        name: "sidebar.wallet.fundDetails",
        url: "/dashboard/wallet/fund-details",
        translationKey: "sidebar.wallet.fundDetails",
      },
    ],
  },
  {
    section: "cards",
    icon: CreditCard,
    items: [
      {
        icon: CreditCard,
        name: "sidebar.cards.title",
        url: "/dashboard/cards",
        translationKey: "sidebar.cards.title",
      },
      {
        icon: CreditCard,
        name: "sidebar.cards.search",
        url: "/dashboard/cards/search",
        translationKey: "sidebar.cards.search",
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
  {
    section: "merchant",
    icon: Users,
    items: [
      {
        icon: Users,
        name: "sidebar.merchant.title",
        url: "/dashboard/merchant",
        translationKey: "sidebar.merchant.title",
      },
      {
        icon: Users,
        name: "sidebar.merchant.accountManagement",
        url: "/dashboard/merchant/account-management",
        translationKey: "sidebar.merchant.accountManagement",
      },
      {
        icon: Users,
        name: "sidebar.merchant.accountInfo",
        url: "/dashboard/merchant/account-info",
        translationKey: "sidebar.merchant.accountInfo",
        badge: 2,
      },
      {
        icon: Users,
        name: "sidebar.merchant.accountRoles",
        url: "/dashboard/merchant/account-roles",
        translationKey: "sidebar.merchant.accountRoles",
      },
    ],
  },
  {
    section: "invitation",
    icon: UserPlus,
    items: [
      {
        icon: UserPlus,
        name: "sidebar.invitation.title",
        url: "/dashboard/invitation",
        translationKey: "sidebar.invitation.title",
      },
      {
        icon: UserPlus,
        name: "sidebar.invitation.list",
        url: "/dashboard/invitation/list",
        translationKey: "sidebar.invitation.list",
      },
      {
        icon: UserPlus,
        name: "sidebar.invitation.rebateList",
        url: "/dashboard/invitation/rebate-list",
        translationKey: "sidebar.invitation.rebateList",
      },
    ],
  },
  // Add a dedicated transactions section
  {
    section: "transactions",
    icon: FileText,
    items: [
      {
        icon: FileText,
        name: "transactions.title",
        url: "/dashboard/transactions",
        translationKey: "transactions.title",
      },
      {
        icon: FileText,
        name: "transactions.history",
        url: "/dashboard/transactions/history",
        translationKey: "transactions.history",
      },
    ],
  },
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
  
  // For other sections, use the existing logic
  const key = `sidebar.${section}.title`;
  return getDirectTranslation(key, language as any, section);
};
