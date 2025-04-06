
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GuestRoute from "./GuestRoute";
import FrontendRoute from "./FrontendRoute";
import BackendRoute from "./BackendRoute";
import { PageLoading } from "./LoadingComponents";
import { useAuth } from "@/hooks/use-auth";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import AuthLayout from "@/components/auth/AuthLayout";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NotFound from "@/pages/NotFound";
import DashboardHome from "@/pages/dashboard/DashboardHome";

const RouteComponents = () => {
  const { isLoggedIn, isLoading } = useAuth();

  // Enhanced debugging logs for route setup and auth state
  useEffect(() => {
    console.log("RouteComponents rendering, auth state:", { isLoggedIn, isLoading });
    console.log("Auth routes setup: Login path: /login, Register path: /register");
    console.log("Backend routes setup: Dashboard path: /dashboard");
    
    // Log when route changes occur using a one-time setup
    const originalPushState = history.pushState;
    history.pushState = function(state, title, url) {
      console.log(`Navigation occurred to: ${url}`);
      return originalPushState.apply(this, [state, title, url]);
    };
    
    return () => {
      // Restore original function when component unmounts
      history.pushState = originalPushState;
      console.log("RouteComponents unmounted, navigation listener removed");
    };
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Routes>
      {/* Guest Routes with AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route element={<GuestRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Temporarily comment out other guest routes until we create those components */}
          {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> 
          <Route path="/invitation/:token" element={<InvitationPage />} /> */}
        </Route>
      </Route>

      {/* Frontend Routes */}
      <Route element={<FrontendRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Temporarily comment out other frontend routes */}
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} /> */}
      </Route>

      {/* Backend Routes (Dashboard) */}
      <Route element={<BackendRoute isLoggedIn={isLoggedIn} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/*" element={<DashboardHome />} />
          {/* Dashboard section routes */}
          <Route path="/dashboard/cards/*" element={<DashboardHome />} />
          <Route path="/dashboard/transactions/*" element={<DashboardHome />} />
          <Route path="/dashboard/wallet/*" element={<DashboardHome />} />
          <Route path="/dashboard/account/*" element={<DashboardHome />} />
          <Route path="/dashboard/invitation/*" element={<DashboardHome />} />
          <Route path="/dashboard/analytics" element={<DashboardHome />} />
        </Route>
      </Route>

      {/* Not Found Route */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default RouteComponents;
