
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ParticlesLayer from "@/components/particles/ParticlesLayer";
import GradientOverlay from "@/components/particles/GradientOverlay";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#061428] overflow-hidden relative">
        {/* Background Layers */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <ParticlesLayer />
          <GradientOverlay />
        </div>
        
        {/* Main Layout */}
        <div className="relative z-10 flex w-full">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader className="h-16 flex-shrink-0 backdrop-blur-md bg-blue-950/30 border-b border-blue-800/30 shadow-md" />
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
