
import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import NotFound from "@/pages/NotFound";
import BackendRoute from "./BackendRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";

// Lazy load components for better initial loading
const DashboardHome = React.lazy(() => import("@/pages/dashboard/DashboardHome"));
const TransactionsPage = React.lazy(() => import("@/pages/dashboard/transactions/TransactionsPage"));
const AnalyticsPage = React.lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));
const WalletDashboard = React.lazy(() => import("@/pages/dashboard/wallet/WalletDashboard"));
const FundDetails = React.lazy(() => import("@/pages/dashboard/wallet/FundDetails"));
// Import existing auth pages
const LoginPage = React.lazy(() => import("@/pages/Login"));
const RegisterPage = React.lazy(() => import("@/pages/Register"));
const ForgotPasswordPage = React.lazy(() => import("@/pages/ForgotPassword"));
const ResetPasswordPage = React.lazy(() => import("@/pages/ResetPassword"));
const CardsPage = React.lazy(() => import("@/pages/dashboard/cards/CardsPage"));
const CardDetails = React.lazy(() => import("@/pages/dashboard/cards/CardDetails"));
const CardSearch = React.lazy(() => import("@/pages/dashboard/cards/CardSearch"));
// Comment out SettingsPage until it exists
// const SettingsPage = React.lazy(() => import("@/pages/dashboard/settings/SettingsPage"));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-charcoal">
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
      <p className="text-lg text-purple-300">Loading...</p>
    </div>
  </div>
);

const RouteComponents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Redirect to dashboard on root path
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
    
    // Only mark as non-initial after the first navigation
    if (isInitialLoad) {
      setTimeout(() => setIsInitialLoad(false), 500);
    }
  }, [location.pathname, navigate, isInitialLoad]);

  // Generate a stable key for routes to prevent unnecessary re-renders
  const routesKey = React.useMemo(() => `routes-${location.pathname.split('/')[1]}-${language}`, [location.pathname, language]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes key={routesKey}>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<BackendRoute isLoggedIn={true}><DashboardLayout /></BackendRoute>}>
          <Route index element={<DashboardHome />} />
          
          {/* Transactions */}
          <Route path="transactions" element={<TransactionsPage />} />
          
          {/* Analytics */}
          <Route path="analytics" element={<AnalyticsPage />} />
          
          {/* Wallet */}
          <Route path="wallet">
            <Route index element={<WalletDashboard />} />
            <Route path="fund-details" element={<FundDetails />} />
          </Route>
          
          {/* Cards */}
          <Route path="cards">
            <Route index element={<CardsPage />} />
            <Route path=":cardId" element={<CardDetails />} />
            <Route path="search" element={<CardSearch />} />
          </Route>
          
          {/* Settings - Commented out until the page exists */}
          {/* <Route path="settings" element={<SettingsPage />} /> */}
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouteComponents;
