
import React from "react";
import {
  LayoutDashboard,
  Bell,
  CreditCard,
  BarChart2,
  Users,
  Settings,
  Heart,
  UserSquare2,
  Search,
  Clock5,
  Home,
  Building,
  Wallet,
  RefreshCcw
} from "lucide-react";
import { LanguageCode } from "@/utils/languageUtils";
import { getDirectTranslation } from "@/utils/translationHelpers";

// 导航翻译数据
export const navigationTranslations = {
  sidebar: {
    wallet: {
      title: {
        en: "Wallet",
        "zh-CN": "钱包管理",
        "zh-TW": "錢包管理",
        fr: "Portefeuille",
        es: "Cartera"
      },
      deposit: {
        en: "Deposit",
        "zh-CN": "存款",
        "zh-TW": "存款",
        fr: "Dépôt",
        es: "Depósito"
      },
      depositRecords: {
        en: "Deposit Records",
        "zh-CN": "存款记录",
        "zh-TW": "存款記錄",
        fr: "Registre de dépôts",
        es: "Registros de depósito"
      },
      fundDetails: {
        en: "Fund Details",
        "zh-CN": "资金详情",
        "zh-TW": "資金詳情",
        fr: "Détails des fonds",
        es: "Detalles de fondos"
      }
    },
    cards: {
      title: {
        en: "Cards",
        "zh-CN": "卡片管理",
        "zh-TW": "卡片管理",
        fr: "Cartes",
        es: "Tarjetas"
      },
      search: {
        en: "Search Cards",
        "zh-CN": "搜索卡片",
        "zh-TW": "搜索卡片",
        fr: "Recherche de cartes",
        es: "Buscar tarjetas"
      },
      activationTasks: {
        en: "Activation Tasks",
        "zh-CN": "激活任务",
        "zh-TW": "激活任務",
        fr: "Tâches d'activation",
        es: "Tareas de activación"
      },
      apply: {
        en: "Apply Card",
        "zh-CN": "申请卡片",
        "zh-TW": "申請卡片",
        fr: "Demander une carte",
        es: "Solicitar tarjeta"
      }
    },
    merchant: {
      title: {
        en: "Merchant",
        "zh-CN": "商户管理",
        "zh-TW": "商戶管理",
        fr: "Marchand",
        es: "Comerciante"
      },
      accountManagement: {
        en: "Account Management",
        "zh-CN": "账户管理",
        "zh-TW": "賬戶管理",
        fr: "Gestion de compte",
        es: "Gestión de cuenta"
      },
      accountInfo: {
        en: "Account Info",
        "zh-CN": "账户信息",
        "zh-TW": "賬戶信息",
        fr: "Informations de compte",
        es: "Información de cuenta"
      }
    },
    invitation: {
      title: {
        en: "Invitation",
        "zh-CN": "邀请管理",
        "zh-TW": "邀請管理",
        fr: "Invitation",
        es: "Invitación"
      },
      list: {
        en: "Invitation List",
        "zh-CN": "邀请列表",
        "zh-TW": "邀請清單",
        fr: "Liste d'invitation",
        es: "Lista de invitación"
      }
    },
    quickAccess: {
      dashboard: {
        en: "Dashboard",
        "zh-CN": "控制面板",
        "zh-TW": "控制面板",
        fr: "Tableau de bord",
        es: "Panel de control"
      },
      analytics: {
        en: "Analytics",
        "zh-CN": "分析统计",
        "zh-TW": "分析統計",
        fr: "Analytique",
        es: "Análisis"
      },
      transactions: {
        en: "Transactions",
        "zh-CN": "交易管理",
        "zh-TW": "交易管理",
        fr: "Transactions",
        es: "Transacciones"
      },
      notifications: {
        en: "Notifications",
        "zh-CN": "消息通知",
        "zh-TW": "消息通知",
        fr: "Notifications",
        es: "Notificaciones"
      },
      settings: {
        en: "Settings",
        "zh-CN": "系统设置",
        "zh-TW": "系統設置",
        fr: "Paramètres",
        es: "Ajustes"
      }
    }
  }
};

// 获取快速访问菜单项
export const getQuickAccessItems = (translateFn: Function) => {
  return [
    {
      name: translateFn("sidebar.quickAccess.dashboard") || "Dashboard",
      translationKey: "sidebar.quickAccess.dashboard",
      url: "/dashboard",
      icon: Home,
      key: "dashboard"
    },
    {
      name: translateFn("sidebar.quickAccess.analytics") || "Analytics",
      translationKey: "sidebar.quickAccess.analytics",
      url: "/dashboard/analytics",
      icon: BarChart2,
      key: "analytics"
    },
    {
      name: translateFn("sidebar.quickAccess.transactions") || "Transactions",
      translationKey: "sidebar.quickAccess.transactions",
      url: "/dashboard/transactions",
      icon: RefreshCcw,
      key: "transactions"
    },
    {
      name: translateFn("sidebar.quickAccess.notifications") || "Notifications",
      translationKey: "sidebar.quickAccess.notifications",
      url: "/dashboard/notifications",
      icon: Bell,
      key: "notifications"
    },
    {
      name: translateFn("sidebar.quickAccess.settings") || "Settings",
      translationKey: "sidebar.quickAccess.settings",
      url: "/dashboard/settings",
      icon: Settings,
      key: "settings"
    }
  ];
};

// 获取导航菜单组
export const getNavigationGroups = (translateFn: Function) => {
  return [
    {
      section: translateFn("sidebar.wallet.title") || "Wallet",
      translationKey: "sidebar.wallet.title",
      icon: Wallet,
      key: "wallet",
      items: [
        {
          name: translateFn("sidebar.wallet.deposit") || "Deposit",
          translationKey: "sidebar.wallet.deposit",
          url: "/dashboard/wallet/deposit",
          icon: CreditCard
        },
        {
          name: translateFn("sidebar.wallet.depositRecords") || "Deposit Records",
          translationKey: "sidebar.wallet.depositRecords",
          url: "/dashboard/wallet/deposit/records",
          icon: Clock5
        },
        {
          name: translateFn("sidebar.wallet.fundDetails") || "Fund Details",
          translationKey: "sidebar.wallet.fundDetails",
          url: "/dashboard/wallet/funds",
          icon: Search
        }
      ]
    },
    {
      section: translateFn("sidebar.cards.title") || "Cards",
      translationKey: "sidebar.cards.title",
      icon: CreditCard,
      key: "cards",
      items: [
        {
          name: translateFn("sidebar.cards.search") || "Search Cards",
          translationKey: "sidebar.cards.search",
          url: "/dashboard/cards/search",
          icon: Search
        },
        {
          name: translateFn("sidebar.cards.activationTasks") || "Activation Tasks",
          translationKey: "sidebar.cards.activationTasks",
          url: "/dashboard/cards/tasks",
          icon: Clock5
        },
        {
          name: translateFn("sidebar.cards.apply") || "Apply Card",
          translationKey: "sidebar.cards.apply",
          url: "/dashboard/cards/apply",
          icon: CreditCard
        }
      ]
    },
    {
      section: translateFn("sidebar.merchant.title") || "Merchant",
      translationKey: "sidebar.merchant.title",
      icon: Building,
      key: "merchant",
      items: [
        {
          name: translateFn("sidebar.merchant.accountManagement") || "Account Management",
          translationKey: "sidebar.merchant.accountManagement",
          url: "/dashboard/merchant/accounts",
          icon: UserSquare2
        },
        {
          name: translateFn("sidebar.merchant.accountInfo") || "Account Info",
          translationKey: "sidebar.merchant.accountInfo",
          url: "/dashboard/merchant/info",
          icon: UserSquare2
        }
      ]
    },
    {
      section: translateFn("sidebar.invitation.title") || "Invitation",
      translationKey: "sidebar.invitation.title",
      icon: Heart,
      key: "invitation",
      items: [
        {
          name: translateFn("sidebar.invitation.list") || "Invitation List",
          translationKey: "sidebar.invitation.list",
          url: "/dashboard/invitation/list",
          icon: Users
        }
      ]
    }
  ];
};
