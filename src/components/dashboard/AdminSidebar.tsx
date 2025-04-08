
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
import { 
  Sidebar, 
  SidebarGroup, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroupLabel
} from "@/components/ui/sidebar";

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
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Main
            </SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard"
                    className={cn(
                      "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      location.pathname === "/dashboard" &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/analytics"
                    className={cn(
                      "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      isActive("/dashboard/analytics") &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/transactions"
                    className={cn(
                      "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      isActive("/dashboard/transactions") &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <FileText className="h-5 w-5" />
                    <span>Transactions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/wallet"
                    className={cn(
                      "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      isActive("/dashboard/wallet") &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <Wallet className="h-5 w-5" />
                    <span>Wallet</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/cards"
                    className={cn(
                      "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      isActive("/dashboard/cards") &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Cards</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {isCollapsed ? "" : "Account"}
            </SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/settings"
                    className={cn(
                      "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      isActive("/dashboard/settings") &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/dashboard/profile"
                    className={cn(
                      "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      isActive("/dashboard/profile") &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
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
