
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#061428]">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto bg-[#061428]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
