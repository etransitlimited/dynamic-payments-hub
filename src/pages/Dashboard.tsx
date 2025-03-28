
import React, { ReactNode } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Suspense } from "react";
import { DashboardLoading } from "@/components/routing/LoadingComponents";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <DashboardLayout>
      <ErrorBoundary>
        <Suspense fallback={<DashboardLoading />}>
          {children}
        </Suspense>
      </ErrorBoundary>
    </DashboardLayout>
  );
};

export default Dashboard;
