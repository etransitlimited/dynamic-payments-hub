
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import { DashboardLoading } from "@/components/routing/LoadingComponents";
import DashboardInternalRoutes from "./DashboardInternalRoutes";

// Dashboard Home page
const DashboardHome = React.lazy(() => import("@/pages/dashboard/DashboardHome"));

const DashboardRoutes = () => {
  return (
    <Dashboard>
      <Suspense fallback={<DashboardLoading />}>
        <Routes>
          {/* Dashboard Home */}
          <Route index element={<DashboardHome />} />
          
          {/* All other Dashboard Routes */}
          <Route path="*" element={<DashboardInternalRoutes />} />
        </Routes>
      </Suspense>
    </Dashboard>
  );
};

export default DashboardRoutes;
