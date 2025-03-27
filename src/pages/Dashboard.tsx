
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </DashboardLayout>
  );
};

export default Dashboard;
