
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SubmenuItem {
  title: string;
  path: string;
}

interface SidebarSubmenuProps {
  title: string;
  icon: React.ReactNode;
  items: SubmenuItem[];
  isActive: (path: string) => boolean;
}

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({ title, icon, items, isActive }) => {
  return (
    <div className="mb-2">
      <div className="flex items-center px-3 py-2 text-sm font-medium text-blue-300">
        <span className="mr-2">{icon}</span>
        {title}
      </div>
      <div className="ml-6 space-y-1">
        {items.map((item, index) => (
          <Link to={item.path} key={index}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start pl-6 text-sm font-normal",
                isActive(item.path)
                  ? "bg-blue-900/40 text-white hover:bg-blue-900/50"
                  : "text-blue-200 hover:bg-blue-900/20 hover:text-white"
              )}
            >
              {item.title}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarSubmenu;
