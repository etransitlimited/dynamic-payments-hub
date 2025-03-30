
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ParticlesLayer from "@/components/particles/ParticlesLayer";
import GradientOverlay from "@/components/particles/GradientOverlay";
import { ThemeProvider } from "@/context/ThemeContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full dark:bg-[#061428] bg-gray-50 overflow-hidden relative">
          {/* Background Layers with enhanced tech effects - only shown in dark mode */}
          <div className="absolute inset-0 overflow-hidden z-0 dark:block hidden">
            <ParticlesLayer />
            <GradientOverlay />
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            
            {/* Extra glowing orb effects */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Main Layout */}
          <div className="relative z-10 flex w-full">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
              <DashboardHeader className="h-16 flex-shrink-0 backdrop-blur-md dark:bg-gradient-to-r dark:from-blue-950/50 dark:to-blue-900/30 bg-white/80 dark:border-b dark:border-blue-800/30 border-b border-gray-200 shadow-md" />
              <main className="flex-1 overflow-auto p-4">
                {children}
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default DashboardLayout;
