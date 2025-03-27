
import React from "react";
import { Button } from "@/components/ui/button";

interface SidebarFooterItemProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

const SidebarFooterItem: React.FC<SidebarFooterItemProps> = ({ icon, title, onClick }) => {
  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start text-sm font-medium text-blue-200 hover:bg-blue-900/20 hover:text-white"
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {title}
    </Button>
  );
};

export default SidebarFooterItem;
