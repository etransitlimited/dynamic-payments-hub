
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

export const getQuickAccessItems = (t: (key: string) => string): NavItem[] => [
  { name: t("sidebar.dashboard"), path: "/dashboard", icon: LayoutDashboard },
  { name: t("sidebar.analytics"), path: "/dashboard/analytics", icon: PieChart },
  { name: t("sidebar.transactions"), path: "/dashboard/transactions", icon: Landmark }
];

export const getNavigationGroups = (t: (key: string) => string): NavGroup[] => [
  {
    section: t("sidebar.wallet.title"),
    icon: Wallet,
    items: [
      { name: t("sidebar.wallet.deposit"), path: "/dashboard/wallet/deposit", icon: ChevronRight },
      { name: t("sidebar.wallet.depositRecords"), path: "/dashboard/wallet/deposit-records", icon: ChevronRight },
      { name: t("sidebar.wallet.fundDetails"), path: "/dashboard/wallet/fund-details", icon: ChevronRight },
    ],
  },
  {
    section: t("sidebar.cards.title"),
    icon: CreditCard,
    items: [
      { name: t("sidebar.cards.search"), path: "/dashboard/cards/search", icon: ChevronRight },
      { name: t("sidebar.cards.activationTasks"), path: "/dashboard/cards/activation", icon: ChevronRight },
      { name: t("sidebar.cards.apply"), path: "/dashboard/cards/apply", icon: ChevronRight },
    ],
  },
  {
    section: t("sidebar.merchant.title"),
    icon: Store,
    items: [
      { name: t("sidebar.merchant.accountManagement"), path: "/dashboard/merchant/account-management", icon: ChevronRight },
      { name: t("sidebar.merchant.accountInfo"), path: "/dashboard/merchant/account-info", icon: ChevronRight },
      { name: t("sidebar.merchant.accountRoles"), path: "/dashboard/merchant/account-roles", icon: ChevronRight },
    ],
  },
  {
    section: t("sidebar.invitation.title"),
    icon: UserPlus,
    items: [
      { name: t("sidebar.invitation.list"), path: "/dashboard/invitation/list", icon: ChevronRight },
      { name: t("sidebar.invitation.rebateList"), path: "/dashboard/invitation/rebate-list", icon: ChevronRight },
    ],
  }
];
