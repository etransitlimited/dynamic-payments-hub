
import React, { ReactNode, Suspense } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { DashboardLoading } from "@/components/routing/LoadingComponents";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <DashboardLayout>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </DashboardLayout>
  );
};

export default Dashboard;
