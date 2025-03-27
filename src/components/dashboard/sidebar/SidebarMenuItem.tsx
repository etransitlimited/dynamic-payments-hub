
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarMenuItemProps {
  title: string;
  icon?: React.ReactNode;
  path: string;
  isActive: boolean;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ title, icon, path, isActive }) => {
  return (
    <Link to={path}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start text-sm font-medium",
          isActive
            ? "bg-blue-900/40 text-white hover:bg-blue-900/50"
            : "text-blue-200 hover:bg-blue-900/20 hover:text-white"
        )}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </Button>
    </Link>
  );
};

export default SidebarMenuItem;
