
import React, { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import { DashboardLoading } from "@/components/routing/LoadingComponents";
import DashboardInternalRoutes from "./DashboardInternalRoutes";
import { usePerformance } from "@/hooks/use-performance";

// Dashboard Home page - optimized lazy loading
const DashboardHome = React.lazy(() => 
  import("@/pages/dashboard/DashboardHome").then(module => {
    // Report successful load for analytics
    if (process.env.NODE_ENV === 'development') {
      console.log('Dashboard Home loaded successfully');
    }
    return module;
  })
);

// Prefetch manager for dashboard routes
const usePrefetchRoutes = () => {
  const location = useLocation();
  const { performanceTier, isPoorConnection } = usePerformance();
  
  useEffect(() => {
    // Skip prefetching for low-performance devices or poor connections
    if (performanceTier === 'low' || isPoorConnection) return;
    
    // Prefetch based on current route
    const prefetchTimeout = setTimeout(() => {
      if (location.pathname === '/dashboard') {
        // Prefetch common routes when on dashboard home
        import("@/pages/dashboard/analytics/AnalyticsPage");
        import("@/pages/dashboard/transactions/TransactionsPage");
      } else if (location.pathname.includes('/dashboard/analytics')) {
        // Prefetch related analytics components
        import("@/pages/dashboard/transactions/TransactionsPage");
      } else if (location.pathname.includes('/dashboard/transactions')) {
        // Prefetch related transaction components
        import("@/pages/dashboard/analytics/AnalyticsPage");
      }
    }, 1000); // Delay prefetching to prioritize current route
    
    return () => clearTimeout(prefetchTimeout);
  }, [location.pathname, performanceTier, isPoorConnection]);
};

const DashboardRoutes = () => {
  // Use the prefetch hook
  usePrefetchRoutes();

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
