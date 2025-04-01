
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
      <div className="min-h-screen flex w-full bg-[#061428] overflow-hidden relative">
        {/* Simple background with gradient */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Main dark blue background */}
          <div className="absolute inset-0 bg-[#061428]"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          
          {/* Simple gradient effects */}
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
        </div>
        
        {/* Main Layout */}
        <div className="relative z-10 flex w-full">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader className="h-16 flex-shrink-0 backdrop-blur-md bg-gradient-to-r from-blue-950/50 to-blue-900/30 border-b border-blue-800/30 shadow-md" />
            <main className="flex-1 overflow-auto p-4">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
