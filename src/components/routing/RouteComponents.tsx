
import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import BackendRoute from "./BackendRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/use-auth";
import NotFound from "@/pages/frontend/NotFound";
import CardActivationTasksPage from "@/pages/dashboard/cards/CardActivationTasksPage";

// Lazy load components for better initial loading
const DashboardHome = React.lazy(() => import("@/pages/dashboard/DashboardHome"));
const TransactionsPage = React.lazy(() => import("@/pages/dashboard/transactions/TransactionsPage"));
const AnalyticsPage = React.lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));
const WalletDashboard = React.lazy(() => import("@/pages/dashboard/wallet/WalletDashboard"));
const FundDetails = React.lazy(() => import("@/pages/dashboard/wallet/FundDetails"));

// Enhanced placeholder component for routes that don't exist yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-lg bg-charcoal-dark/50 p-6">
    <h1 className="mb-4 text-2xl font-bold text-purple-300">{title} Page</h1>
    <p className="text-center text-gray-400">This page is under construction.</p>
    <div className="mt-6 p-4 bg-purple-900/20 rounded-md border border-purple-700/30 text-sm text-purple-200">
      <p>Successfully navigated to the <strong>{title}</strong> route.</p>
      <p className="mt-2 text-xs text-purple-400">Route: /dashboard/{title.toLowerCase()}</p>
    </div>
  </div>
);

// Auth pages
const LoginPage = () => <PlaceholderPage title="Login" />;
const RegisterPage = () => <PlaceholderPage title="Register" />;
const ForgotPasswordPage = () => <PlaceholderPage title="Forgot Password" />;

// Dashboard pages
const CardsPage = () => <PlaceholderPage title="Cards" />;
const CardDetails = () => <PlaceholderPage title="Card Details" />;
const CardSearch = () => <PlaceholderPage title="Card Search" />;
const ProductsPage = () => <PlaceholderPage title="Products" />;
const UsersPage = () => <PlaceholderPage title="Users" />;
const SecurityPage = () => <PlaceholderPage title="Security" />;
const NotificationsPage = () => <PlaceholderPage title="Notifications" />;
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
  const { isLoggedIn } = useAuth();
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
        <Route 
          path="/dashboard" 
          element={
            <BackendRoute isLoggedIn={isLoggedIn}>
              <DashboardLayout />
            </BackendRoute>
          }
        >
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
            <Route path="activation" element={<CardActivationTasksPage />} />
          </Route>
          
          {/* Management Routes */}
          <Route path="products" element={<ProductsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouteComponents;
