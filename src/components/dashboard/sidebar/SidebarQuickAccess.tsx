
import React from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import SidebarNavItem from "./SidebarNavItem";
import { NavItem } from "./SidebarNavGroup";

interface SidebarQuickAccessProps {
  items: NavItem[];
  isCollapsed: boolean;
}

const SidebarQuickAccess = ({ items, isCollapsed }: SidebarQuickAccessProps) => {
  return (
    <div className="mb-4 px-1.5">
      <SidebarMenu className="flex flex-col space-y-2">
        {items.map((item) => (
          <SidebarNavItem
            key={item.name}
            path={item.path}
            name={item.name}
            icon={item.icon}
            isCollapsed={isCollapsed}
          />
        ))}
      </SidebarMenu>
    </div>
  );
};

export default SidebarQuickAccess;
