
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
        {/* Background Layers with enhanced tech effects */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <ParticlesLayer />
          <GradientOverlay />
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          
          {/* Extra glowing orb effects */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl"></div>
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
