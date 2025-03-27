
import React from "react";
import { Sidebar, SidebarContent, SidebarFooter as SidebarFooterContainer, SidebarHeader } from "@/components/ui/sidebar";
import SidebarLogo from "./sidebar/SidebarLogo";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import SidebarFooter from "./sidebar/SidebarFooter";

const AdminSidebar = () => {
  return (
    <Sidebar className="border-r border-blue-900/50 bg-gradient-to-b from-[#061428] to-[#0a1e3a]">
      <SidebarHeader className="border-b border-blue-900/50 p-4">
        <SidebarLogo 
          logoSrc="/lovable-uploads/47003b38-e99e-468a-a1da-52124948df0d.png" 
          logoAlt="Logo" 
          title="卡台管理系统" 
        />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarNavigation />
      </SidebarContent>
      <SidebarFooterContainer className="border-t border-blue-900/50 p-4">
        <SidebarFooter />
      </SidebarFooterContainer>
    </Sidebar>
  );
};

export default AdminSidebar;
