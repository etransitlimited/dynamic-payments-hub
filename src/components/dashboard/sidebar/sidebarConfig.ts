
import { 
  BarChart3, 
  CreditCard, 
  Layers, 
  Store, 
  Users, 
  Home, 
  LineChart, 
  Clock, 
  Wallet, 
  Gift, 
  History, 
  PlusCircle, 
  Search, 
  Bell, 
  Settings 
} from "lucide-react";
import { LanguageCode } from "@/utils/languageUtils";
import type { NavItem } from "@/components/dashboard/sidebar/SidebarNavItem";

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

// Get navigation groups for the sidebar that are language-aware
export const getNavigationGroups = (t: (key: string) => string) => {
  // Get current language from the t function
  const languageKey = t("language") || "en";
  const currentLanguage = languageKey as LanguageCode;
  
  return [
    {
      section: "wallet",
      icon: Wallet,
      items: [
        {
          name: "sidebar.wallet.deposit",
          translationKey: "sidebar.wallet.deposit",
          url: "/dashboard/wallet/deposit",
          icon: PlusCircle,
        },
        {
          name: "sidebar.wallet.depositRecords",
          translationKey: "sidebar.wallet.depositRecords",
          url: "/dashboard/wallet/deposit-records",
          icon: History,
        },
        {
          name: "sidebar.wallet.fundDetails",
          translationKey: "sidebar.wallet.fundDetails",
          url: "/dashboard/wallet/funds",
          icon: Layers,
        }
      ]
    },
    {
      section: "cards",
      icon: CreditCard,
      items: [
        {
          name: "sidebar.cards.search",
          translationKey: "sidebar.cards.search",
          url: "/dashboard/cards/search",
          icon: Search,
        },
        {
          name: "sidebar.cards.activationTasks",
          translationKey: "sidebar.cards.activationTasks",
          url: "/dashboard/cards/activation-tasks",
          icon: Clock,
        },
        {
          name: "sidebar.cards.apply",
          translationKey: "sidebar.cards.apply",
          url: "/dashboard/cards/apply",
          icon: CreditCard,
        }
      ]
    },
    {
      section: "merchant",
      icon: Store,
      items: [
        {
          name: "sidebar.merchant.accountManagement",
          translationKey: "sidebar.merchant.accountManagement",
          url: "/dashboard/merchant/account",
          icon: Settings,
        },
        {
          name: "sidebar.merchant.accountInfo",
          translationKey: "sidebar.merchant.accountInfo",
          url: "/dashboard/merchant/account-info",
          icon: Users,
        },
        {
          name: "sidebar.merchant.accountRoles",
          translationKey: "sidebar.merchant.accountRoles",
          url: "/dashboard/merchant/roles",
          icon: Users,
        }
      ]
    },
    {
      section: "invitation",
      icon: Gift,
      items: [
        {
          name: "sidebar.invitation.list",
          translationKey: "sidebar.invitation.list",
          url: "/dashboard/invitation/list",
          icon: Users,
        },
        {
          name: "sidebar.invitation.rebateList",
          translationKey: "sidebar.invitation.rebateList",
          url: "/dashboard/invitation/rebate-list",
          icon: Gift,
        }
      ]
    }
  ];
};

// Get quick access items for the sidebar that are language-aware
export const getQuickAccessItems = (t: (key: string) => string): NavItem[] => {
  // Get current language from the t function
  const languageKey = t("language") || "en";
  const currentLanguage = languageKey as LanguageCode;
  
  return [
    {
      name: "sidebar.quickAccess.dashboard",
      translationKey: "sidebar.quickAccess.dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      name: "sidebar.quickAccess.analytics",
      translationKey: "sidebar.quickAccess.analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      name: "sidebar.quickAccess.transactions",
      translationKey: "sidebar.quickAccess.transactions",
      url: "/dashboard/transactions",
      icon: LineChart,
    }
  ];
};

// Function to get specific section translations
export const getSectionTranslation = (section: string, language: LanguageCode): string => {
  // Check if the section exists in navigationTranslations
  if (!section) return section;
  
  // Handle special cases for each section type
  if (section === "wallet" && navigationTranslations.wallet?.title) {
    return navigationTranslations.wallet.title[language] || section;
  }
  
  if (section === "cards" && navigationTranslations.cards?.title) {
    return navigationTranslations.cards.title[language] || section;
  }
  
  if (section === "merchant" && navigationTranslations.merchant?.title) {
    return navigationTranslations.merchant.title[language] || section;
  }
  
  if (section === "invitation" && navigationTranslations.invitation?.title) {
    return navigationTranslations.invitation.title[language] || section;
  }
  
  // Direct translation fallback
  if (navigationTranslations[section as keyof typeof navigationTranslations]) {
    const sectionData = navigationTranslations[section as keyof typeof navigationTranslations];
    
    // If it's a direct language mapping, use it
    if (typeof sectionData === 'object' && language in sectionData) {
      return (sectionData as any)[language] || section;
    }
    
    // If it has a title object
    if (typeof sectionData === 'object' && 'title' in sectionData) {
      const titleObj = (sectionData as any).title;
      if (titleObj && typeof titleObj === 'object' && language in titleObj) {
        return titleObj[language] || section;
      }
    }
  }
  
  // Return the original section name if no translation found
  return section;
};
