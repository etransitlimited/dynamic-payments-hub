
import React, { ReactNode } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Navigate } from "react-router-dom";

interface DashboardProps {
  children?: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  // If this component is used directly, redirect to dashboard home
  if (!children) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <DashboardLayout>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </DashboardLayout>
  );
};

export default Dashboard;
