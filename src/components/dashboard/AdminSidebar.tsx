
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  HomeIcon,
  LayoutDashboard,
  Settings,
  CreditCard,
  User,
  Users,
  FileText,
  Wallet,
  BarChart3,
  ChevronRight,
  Globe,
  Bell,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  UserCircle,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { Sidebar, SidebarSection, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  collapsed = false,
  onToggleCollapse,
  className = "",
}) => {
  const location = useLocation();
  const { language } = useLanguage();
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  // Handle prop changes
  React.useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  // Handle internal state changes
  const handleToggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onToggleCollapse) {
      onToggleCollapse();
    }
  };

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background/80 shadow-sm transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[280px]",
        className
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <span className="text-xl font-bold text-foreground">Admin</span>
          )}
        </div>
        <button
          onClick={handleToggleCollapse}
          className="rounded p-1 hover:bg-accent"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="custom-scrollbar flex-1 overflow-auto">
        <Sidebar className="border-none p-2">
          <SidebarSection>
            <SidebarMenu>
              <SidebarMenuItem
                as={Link}
                to="/dashboard"
                icon={<LayoutDashboard className="h-5 w-5" />}
                title="Dashboard"
                isActive={location.pathname === "/dashboard"}
                className={cn(
                  "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  location.pathname === "/dashboard" &&
                    "bg-accent text-accent-foreground"
                )}
              />
              
              <SidebarMenuItem
                as={Link}
                to="/dashboard/analytics"
                icon={<BarChart3 className="h-5 w-5" />}
                title="Analytics"
                isActive={isActive("/dashboard/analytics")}
                className={cn(
                  "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  isActive("/dashboard/analytics") &&
                    "bg-accent text-accent-foreground"
                )}
              />

              <SidebarMenuItem
                as={Link}
                to="/dashboard/transactions"
                icon={<FileText className="h-5 w-5" />}
                title="Transactions"
                isActive={isActive("/dashboard/transactions")}
                className={cn(
                  "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  isActive("/dashboard/transactions") &&
                    "bg-accent text-accent-foreground"
                )}
              />

              <SidebarMenuItem
                as={Link}
                to="/dashboard/wallet"
                icon={<Wallet className="h-5 w-5" />}
                title="Wallet"
                isActive={isActive("/dashboard/wallet")}
                className={cn(
                  "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  isActive("/dashboard/wallet") &&
                    "bg-accent text-accent-foreground"
                )}
              />

              <SidebarMenuItem
                as={Link}
                to="/dashboard/cards"
                icon={<CreditCard className="h-5 w-5" />}
                title="Cards"
                isActive={isActive("/dashboard/cards")}
                className={cn(
                  "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  isActive("/dashboard/cards") &&
                    "bg-accent text-accent-foreground"
                )}
              />
            </SidebarMenu>
          </SidebarSection>

          <SidebarSection title={isCollapsed ? "" : "Account"}>
            <SidebarMenu>
              <SidebarMenuItem
                as={Link}
                to="/dashboard/settings"
                icon={<Settings className="h-5 w-5" />}
                title="Settings"
                isActive={isActive("/dashboard/settings")}
                className={cn(
                  "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  isActive("/dashboard/settings") &&
                    "bg-accent text-accent-foreground"
                )}
              />
              <SidebarMenuItem
                as={Link}
                to="/dashboard/profile"
                icon={<User className="h-5 w-5" />}
                title="Profile"
                isActive={isActive("/dashboard/profile")}
                className={cn(
                  "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  isActive("/dashboard/profile") &&
                    "bg-accent text-accent-foreground"
                )}
              />
            </SidebarMenu>
          </SidebarSection>
        </Sidebar>
      </div>

      {/* Bottom user section */}
      <div className="border-t p-2">
        <div className="flex items-center gap-2 rounded-lg p-2 hover:bg-accent">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserCircle className="h-6 w-6" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 text-sm">
              <div className="font-medium">Admin User</div>
              <div className="text-xs text-muted-foreground">admin@example.com</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
