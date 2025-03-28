
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardRoutes from "@/components/routing/DashboardRoutes";
import { PageLoading } from "@/components/routing/LoadingComponents";
import HreflangTags from "@/components/seo/HreflangTags";
import { LanguageProvider } from "@/context/LanguageContext";

// Frontend pages (public)
const Index = React.lazy(() => import("@/pages/frontend/Index"));
const Login = React.lazy(() => import("@/pages/frontend/Login"));
const Register = React.lazy(() => import("@/pages/frontend/Register"));
const ForgotPassword = React.lazy(() => import("@/pages/frontend/ForgotPassword"));
const NotFound = React.lazy(() => import("@/pages/frontend/NotFound"));

const RouteComponents = () => {
  return (
    <LanguageProvider>
      <>
        <HreflangTags />
        <Suspense fallback={<PageLoading />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Dashboard Routes - protected by Dashboard component */}
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
            
            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </>
    </LanguageProvider>
  );
};

export default RouteComponents;
