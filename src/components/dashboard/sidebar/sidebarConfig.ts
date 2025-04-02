import { 
  Wallet, 
  CreditCard, 
  Store, 
  UserPlus, 
  LayoutDashboard,
  PieChart,
  Landmark,
  ChevronRight,
  LucideIcon
} from "lucide-react";
import { NavItem } from "./SidebarNavGroup";

export interface NavGroup {
  section: string;
  icon: LucideIcon;
  items: NavItem[];
}

// Define explicit translations for each navigation item
const navigationTranslations = {
  dashboard: {
    en: "Dashboard",
    "zh-CN": "仪表板",
    "zh-TW": "儀表板",
    es: "Panel de Control", 
    fr: "Tableau de Bord"
  },
  analytics: {
    en: "Analytics",
    "zh-CN": "数据分析",
    "zh-TW": "數據分析",
    es: "Análisis",
    fr: "Analytique"
  },
  transactions: {
    en: "Transactions",
    "zh-CN": "交易记录",
    "zh-TW": "交易記錄",
    es: "Transacciones",
    fr: "Transactions"
  },
  wallet: {
    title: {
      en: "Wallet",
      "zh-CN": "钱包",
      "zh-TW": "錢包",
      es: "Billetera",
      fr: "Portefeuille"
    },
    deposit: {
      en: "Deposit",
      "zh-CN": "充值",
      "zh-TW": "充值",
      es: "Depositar",
      fr: "Dépôt"
    },
    depositRecords: {
      en: "Deposit Records",
      "zh-CN": "充值记录",
      "zh-TW": "充值記錄",
      es: "Registros de Depósito",
      fr: "Relevés de Dépôt"
    },
    fundDetails: {
      en: "Fund Details",
      "zh-CN": "资金明细",
      "zh-TW": "資金明細",
      es: "Detalles de Fondos",
      fr: "Détails des Fonds"
    }
  },
  cards: {
    title: {
      en: "Card Management",
      "zh-CN": "卡片管理",
      "zh-TW": "卡片管理",
      es: "Gestión de Tarjetas",
      fr: "Gestion de Cartes"
    },
    search: {
      en: "Card Search",
      "zh-CN": "卡片搜索",
      "zh-TW": "卡片搜索",
      es: "Búsqueda de Tarjetas",
      fr: "Recherche de Carte"
    },
    activationTasks: {
      en: "Activation Tasks",
      "zh-CN": "激活任务",
      "zh-TW": "激活任務",
      es: "Tareas de Activación",
      fr: "Tâches d'Activation"
    },
    apply: {
      en: "Apply Card",
      "zh-CN": "申请卡片",
      "zh-TW": "申請卡片",
      es: "Solicitar Tarjeta",
      fr: "Demander une Carte"
    }
  },
  merchant: {
    title: {
      en: "Merchant Center",
      "zh-CN": "商户中心",
      "zh-TW": "商戶中心",
      es: "Centro de Comerciantes",
      fr: "Centre Marchand"
    },
    accountManagement: {
      en: "Account Management",
      "zh-CN": "账户管理",
      "zh-TW": "賬戶管理",
      es: "Gestión de Cuentas",
      fr: "Gestion de Compte"
    },
    accountInfo: {
      en: "Account Info",
      "zh-CN": "账户信息",
      "zh-TW": "賬戶信息",
      es: "Información de Cuenta",
      fr: "Informations de Compte"
    },
    accountRoles: {
      en: "Account Roles",
      "zh-CN": "账户角色",
      "zh-TW": "賬戶角色",
      es: "Roles de Cuenta",
      fr: "Rôles de Compte"
    }
  },
  invitation: {
    title: {
      en: "Invitation Management",
      "zh-CN": "邀请管理",
      "zh-TW": "邀請管理",
      es: "Gestión de Invitaciones",
      fr: "Gestion d'Invitation"
    },
    list: {
      en: "Invitation List",
      "zh-CN": "邀请列表",
      "zh-TW": "邀請列表",
      es: "Lista de Invitaciones",
      fr: "Liste d'Invitation"
    },
    rebateList: {
      en: "Rebate List",
      "zh-CN": "返利列表",
      "zh-TW": "返利列表",
      es: "Lista de Reembolsos",
      fr: "Liste de Rabais"
    }
  }
};

export const getQuickAccessItems = (t: (key: string) => string): NavItem[] => [
  { name: "sidebar.dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "sidebar.analytics", path: "/dashboard/analytics", icon: PieChart },
  { name: "sidebar.transactions", path: "/dashboard/transactions", icon: Landmark }
];

export const getNavigationGroups = (t: (key: string) => string): NavGroup[] => [
  {
    section: "sidebar.wallet.title",
    icon: Wallet,
    items: [
      { name: "sidebar.wallet.deposit", path: "/dashboard/wallet/deposit", icon: ChevronRight },
      { name: "sidebar.wallet.depositRecords", path: "/dashboard/wallet/deposit-records", icon: ChevronRight },
      { name: "sidebar.wallet.fundDetails", path: "/dashboard/wallet/fund-details", icon: ChevronRight },
    ],
  },
  {
    section: "sidebar.cards.title",
    icon: CreditCard,
    items: [
      { name: "sidebar.cards.search", path: "/dashboard/cards/search", icon: ChevronRight },
      { name: "sidebar.cards.activationTasks", path: "/dashboard/cards/activation", icon: ChevronRight },
      { name: "sidebar.cards.apply", path: "/dashboard/cards/apply", icon: ChevronRight },
    ],
  },
  {
    section: "sidebar.merchant.title",
    icon: Store,
    items: [
      { name: "sidebar.merchant.accountManagement", path: "/dashboard/account/management", icon: ChevronRight },
      { name: "sidebar.merchant.accountInfo", path: "/dashboard/account/info", icon: ChevronRight },
      { name: "sidebar.merchant.accountRoles", path: "/dashboard/account/roles", icon: ChevronRight },
    ],
  },
  {
    section: "sidebar.invitation.title",
    icon: UserPlus,
    items: [
      { name: "sidebar.invitation.list", path: "/dashboard/invitation/list", icon: ChevronRight },
      { name: "sidebar.invitation.rebateList", path: "/dashboard/invitation/rebate", icon: ChevronRight },
    ],
  }
];

// Export the translations for direct access
export { navigationTranslations };
