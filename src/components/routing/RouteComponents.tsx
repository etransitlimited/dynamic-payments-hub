
import { useState, lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import HreflangTags from "@/components/seo/HreflangTags";
import { useSEO } from "@/utils/seo";
import { PageLoading } from "./LoadingComponents";
import DashboardRoutes from "./DashboardRoutes";

// Lazy load pages for better code splitting
const Index = lazy(() => import("@/pages/Index"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Dashboard Routes - using the correct path pattern */}
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </LanguageProvider>
  );
};

export default RouteComponents;
