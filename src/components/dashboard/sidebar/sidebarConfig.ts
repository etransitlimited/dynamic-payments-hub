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
export const getNavigationGroups = (t: (key: string) => string) => [
  {
    section: "sidebar.wallet.title",
    icon: Wallet,
    items: [
      {
        name: "sidebar.wallet.deposit",
        path: "/dashboard/wallet/deposit",
        icon: PlusCircle
      },
      {
        name: "sidebar.wallet.depositRecords",
        path: "/dashboard/wallet/deposit-records",
        icon: History
      },
      {
        name: "sidebar.wallet.fundDetails",
        path: "/dashboard/wallet/funds",
        icon: Layers
      }
    ]
  },
  {
    section: "sidebar.cards.title",
    icon: CreditCard,
    items: [
      {
        name: "sidebar.cards.search",
        path: "/dashboard/cards/search",
        icon: Search
      },
      {
        name: "sidebar.cards.activationTasks",
        path: "/dashboard/cards/activation-tasks",
        icon: Clock
      },
      {
        name: "sidebar.cards.apply",
        path: "/dashboard/cards/apply",
        icon: CreditCard
      }
    ]
  },
  {
    section: "sidebar.merchant.title",
    icon: Store,
    items: [
      {
        name: "sidebar.merchant.accountManagement",
        path: "/dashboard/merchant/account",
        icon: Settings
      },
      {
        name: "sidebar.merchant.accountInfo",
        path: "/dashboard/merchant/account-info",
        icon: Users
      },
      {
        name: "sidebar.merchant.accountRoles",
        path: "/dashboard/merchant/roles",
        icon: Users
      }
    ]
  },
  {
    section: "sidebar.invitation.title",
    icon: Gift,
    items: [
      {
        name: "sidebar.invitation.list",
        path: "/dashboard/invitation/list",
        icon: Users
      },
      {
        name: "sidebar.invitation.rebateList",
        path: "/dashboard/invitation/rebate-list",
        icon: Gift
      }
    ]
  }
];

// Get quick access items for the sidebar that are language-aware
export const getQuickAccessItems = (t: (key: string) => string): NavItem[] => [
  {
    name: "sidebar.dashboard",
    path: "/dashboard",
    icon: Home
  },
  {
    name: "sidebar.analytics",
    path: "/dashboard/analytics",
    icon: BarChart3
  },
  {
    name: "sidebar.transactions",
    path: "/dashboard/transactions",
    icon: LineChart
  }
];
