
import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import BackendRoute from "./BackendRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";

// For now, create a simple ErrorPage component directly instead of importing
const ErrorPage = () => (
  <div className="flex h-screen flex-col items-center justify-center bg-charcoal">
    <h1 className="text-3xl font-bold text-white">404 Not Found</h1>
    <p className="mt-2 text-purple-300">The page you're looking for doesn't exist.</p>
    <a href="/dashboard" className="mt-6 text-purple-400 underline hover:text-purple-300">
      Return to Dashboard
    </a>
  </div>
);

// Lazy load components for better initial loading
const DashboardHome = React.lazy(() => import("@/pages/dashboard/DashboardHome"));
const TransactionsPage = React.lazy(() => import("@/pages/dashboard/transactions/TransactionsPage"));
const AnalyticsPage = React.lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));
const WalletDashboard = React.lazy(() => import("@/pages/dashboard/wallet/WalletDashboard"));
const FundDetails = React.lazy(() => import("@/pages/dashboard/wallet/FundDetails"));

// Mock placeholder components for routes that don't exist yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-lg bg-charcoal-dark/50 p-6">
    <h1 className="mb-4 text-2xl font-bold text-purple-300">{title} Page</h1>
    <p className="text-center text-gray-400">This page is under construction.</p>
  </div>
);

const LoginPage = () => <PlaceholderPage title="Login" />;
const RegisterPage = () => <PlaceholderPage title="Register" />;
const ForgotPasswordPage = () => <PlaceholderPage title="Forgot Password" />;
const CardsPage = () => <PlaceholderPage title="Cards" />;
const CardDetails = () => <PlaceholderPage title="Card Details" />;
const CardSearch = () => <PlaceholderPage title="Card Search" />;
const SettingsPage = () => <PlaceholderPage title="Settings" />;

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

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<BackendRoute><DashboardLayout /></BackendRoute>}>
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
          
          {/* Settings */}
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default RouteComponents;
