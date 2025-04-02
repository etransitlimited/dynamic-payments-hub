
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
      { name: "sidebar.merchant.accountManagement", path: "/dashboard/merchant/account-management", icon: ChevronRight },
      { name: "sidebar.merchant.accountInfo", path: "/dashboard/merchant/account-info", icon: ChevronRight },
      { name: "sidebar.merchant.accountRoles", path: "/dashboard/merchant/account-roles", icon: ChevronRight },
    ],
  },
  {
    section: "sidebar.invitation.title",
    icon: UserPlus,
    items: [
      { name: "sidebar.invitation.list", path: "/dashboard/invitation/list", icon: ChevronRight },
      { name: "sidebar.invitation.rebateList", path: "/dashboard/invitation/rebate-list", icon: ChevronRight },
    ],
  }
];
