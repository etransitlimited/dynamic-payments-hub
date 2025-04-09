
import React from "react";
import { Wallet, CreditCard, Users, UserPlus, LayoutDashboard, BarChart, FileText, Bell, Settings } from "lucide-react";
import { NavItem } from "./SidebarNavItem";
import { getDirectTranslation } from "@/utils/translationHelpers";

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
