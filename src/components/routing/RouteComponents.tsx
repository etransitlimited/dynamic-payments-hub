
import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import HreflangTags from "@/components/seo/HreflangTags";
import { useSEO } from "@/utils/seo";
import { PageLoading } from "./LoadingComponents";
import DashboardRoutes from "./DashboardRoutes";

// Lazy load pages for better code splitting
const Index = React.lazy(() => import("@/pages/frontend/Index"));
const Login = React.lazy(() => import("@/pages/frontend/Login"));
const Register = React.lazy(() => import("@/pages/frontend/Register"));
const ForgotPassword = React.lazy(() => import("@/pages/frontend/ForgotPassword"));
const NotFound = React.lazy(() => import("@/pages/frontend/NotFound"));

// ScrollToTop component to reset scroll position on page changes
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

// SEO Handler component
const SEOHandler = () => {
  const location = useLocation();
  const { language } = useLanguage();
  
  useEffect(() => {
    document.documentElement.lang = language;
  }, [location.pathname, language]);
  
  useSEO();
  
  return null;
};

// Main route components wrapper
const RouteComponents = () => {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <SEOHandler />
      <HreflangTags />
      <React.Suspense fallback={<PageLoading />}>
        <Routes>
          {/* Frontend routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Dashboard (Backend) Routes */}
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          
          {/* Direct path redirects with replace to prevent history issues */}
          <Route path="/wallet" element={<Navigate to="/dashboard/wallet/deposit" replace />} />
          <Route path="/wallet/*" element={<Navigate to="/dashboard/wallet/deposit" replace />} />
          
          <Route path="/cards" element={<Navigate to="/dashboard/cards/search" replace />} />
          <Route path="/cards/*" element={<Navigate to="/dashboard/cards/search" replace />} />
          
          <Route path="/analytics" element={<Navigate to="/dashboard/analytics" replace />} />
          <Route path="/transactions" element={<Navigate to="/dashboard/transactions" replace />} />
          
          <Route path="/merchant" element={<Navigate to="/dashboard/merchant/account-management" replace />} />
          <Route path="/merchant/*" element={<Navigate to="/dashboard/merchant/account-management" replace />} />
          
          <Route path="/invitation" element={<Navigate to="/dashboard/invitation/list" replace />} />
          <Route path="/invitation/*" element={<Navigate to="/dashboard/invitation/list" replace />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </LanguageProvider>
  );
};

export default RouteComponents;
