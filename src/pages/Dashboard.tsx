
import React, { ReactNode } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LanguageProvider } from "@/context/LanguageContext";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <LanguageProvider>
      <DashboardLayout>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </DashboardLayout>
    </LanguageProvider>
  );
};

export default Dashboard;
