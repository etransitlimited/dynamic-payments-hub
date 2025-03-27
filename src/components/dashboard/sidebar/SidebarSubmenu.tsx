
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SubMenuItem } from "./types";
import { useSidebar } from "./SidebarContext";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarSubmenuProps {
  title: string;
  icon: React.ReactNode;
  items: SubMenuItem[];
  isActive: (path: string) => boolean;
}

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({ title, icon, items, isActive }) => {
  const { isExpanded, toggleSection } = useSidebar();
  const isMenuExpanded = isExpanded(title);
  const hasActiveItem = items.some(item => isActive(item.path));

  return (
    <div className="mb-2">
      <Collapsible open={isMenuExpanded} onOpenChange={() => toggleSection(title)}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-blue-300 cursor-pointer hover:bg-blue-900/20 rounded-md">
            <div className="flex items-center">
              <span className="mr-2">{icon}</span>
              {title}
            </div>
            <span className="text-blue-300">
              {isMenuExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-6 space-y-1 mt-1">
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
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SidebarSubmenu;
