
import React, { lazy, Suspense, useEffect, useState, useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import GuestRoute from "./GuestRoute";
import FrontendRoute from "./FrontendRoute";
import BackendRoute from "./BackendRoute";
import { PageLoading } from "./LoadingComponents";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/context/LanguageContext";

// Lazy load pages for better performance
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const InvitationPage = lazy(() => import("@/pages/InvitationPage"));
const Contact = lazy(() => import("@/pages/frontend/Contact"));
const Terms = lazy(() => import("@/pages/frontend/Terms"));
const Privacy = lazy(() => import("@/pages/frontend/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Index = lazy(() => import("@/pages/Index"));

// Layouts
const AuthLayout = lazy(() => import("@/components/auth/AuthLayout"));
const DashboardLayout = lazy(() => import("@/components/dashboard/DashboardLayout"));

// Dashboard pages
const DashboardHome = lazy(() => import("@/pages/dashboard/DashboardHome"));
const AnalyticsPage = lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));
const TransactionsPage = lazy(() => import("@/pages/dashboard/transactions/TransactionsPage"));
const TransactionHistoryPage = lazy(() => import("@/pages/dashboard/transactions/TransactionHistoryPage"));

// Wallet pages
const WalletManagement = lazy(() => import("@/pages/dashboard/wallet/WalletDashboard"));
const FundDetails = lazy(() => import("@/pages/dashboard/wallet/FundDetails"));
const DepositRecords = lazy(() => import("@/pages/dashboard/wallet/DepositRecords"));
const WalletDeposit = lazy(() => import("@/pages/dashboard/wallet/WalletDeposit"));

// Cards pages
const CardManagement = lazy(() => import("@/pages/dashboard/cards/CardSearch"));
const CardActivationTasksPage = lazy(() => import("@/pages/dashboard/cards/CardActivationTasksPage"));
const CardApplicationPage = lazy(() => import("@/pages/dashboard/cards/CardApplicationPage"));

// Merchant pages
const AccountSettings = lazy(() => import("@/pages/dashboard/merchant/AccountManagement"));
const AccountInfo = lazy(() => import("@/pages/dashboard/merchant/AccountInfo"));
const AccountRoles = lazy(() => import("@/pages/dashboard/merchant/AccountRoles"));

// Invitation pages
const InvitationManagement = lazy(() => import("@/pages/dashboard/invitation/InvitationList"));
const RebateManagement = lazy(() => import("@/pages/dashboard/invitation/RebateList"));

const RouteComponents = () => {
  const { isLoggedIn, isLoading, forceRefresh } = useAuth();
  const { language } = useLanguage(); 
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const isInitialLoadRef = useRef(true);
  const [isChangingRoute, setIsChangingRoute] = useState(false);
  const changeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced debugging and refresh on route change
  useEffect(() => {
    console.log("==== ROUTE COMPONENTS MOUNTED OR UPDATED ====");
    console.log("RouteComponents: Current path:", location.pathname);
    console.log("RouteComponents: Auth state:", { isLoggedIn, isLoading });
    console.log("RouteComponents: Current language:", language);
    
    // Track path changes to avoid unnecessary operations
    if (prevPathRef.current !== location.pathname) {
      console.log(`Path changed from ${prevPathRef.current} to ${location.pathname}`);
      prevPathRef.current = location.pathname;
      
      // Force refresh auth state when navigating to protected route while not logged in
      if (location.pathname.startsWith('/dashboard') && !isLoggedIn && !isLoading) {
        console.log("Navigating to protected route, refreshing auth state");
        forceRefresh();
      }
      
      // Set a flag when changing routes to coordinate with other effects
      setIsChangingRoute(true);
      
      // Clear any existing timeout
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
      }
      
      // Reset the flag after a short delay
      changeTimeoutRef.current = setTimeout(() => {
        setIsChangingRoute(false);
        isInitialLoadRef.current = false;
      }, 300);
    }
    
    // Cleanup
    return () => {
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
      }
    };
  }, [location.pathname, isLoggedIn, isLoading, forceRefresh, language]);

  // Generate a stable route key that won't change with language updates
  // But WILL change when the app is reloaded
  const routeKey = React.useMemo(() => 
    `routes-${isInitialLoadRef.current ? 'initial' : 'updated'}-${Date.now()}`, 
  []);

  // If still loading auth state, show loading indicator only during initial load
  if (isLoading && isInitialLoadRef.current) {
    console.log("RouteComponents: Auth is loading, showing loading page");
    return <PageLoading />;
  }

  return (
    <Suspense fallback={<PageLoading />}>
      <Routes key={routeKey}>
        <Route path="/" element={<Index />} />
        
        {/* Auth routes with AuthLayout, wrapped in GuestRoute */}
        <Route element={<GuestRoute isLoggedIn={isLoggedIn} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/invitation/:token" element={<InvitationPage />} />
          </Route>
        </Route>

        {/* Frontend routes (public pages) */}
        <Route element={<FrontendRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>

        {/* Protected backend routes */}
        <Route element={<BackendRoute isLoggedIn={isLoggedIn} />}>
          <Route element={<DashboardLayout />}>
            {/* Dashboard - Main entry point */}
            <Route path="/dashboard" element={<DashboardHome />} />
            
            {/* Data Analytics section */}
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
            
            {/* Transactions section */}
            <Route path="/dashboard/transactions" element={<TransactionsPage />} />
            <Route path="/dashboard/transactions/history" element={<TransactionHistoryPage />} />
            
            {/* Wallet section */}
            <Route path="/dashboard/wallet" element={<Navigate to="/dashboard/wallet/management" replace />} />
            <Route path="/dashboard/wallet/management" element={<WalletManagement />} />
            <Route path="/dashboard/wallet/fund-details" element={<FundDetails />} />
            <Route path="/dashboard/wallet/deposit-records" element={<DepositRecords />} />
            <Route path="/dashboard/wallet/deposit" element={<WalletDeposit />} />
            
            {/* Cards section */}
            <Route path="/dashboard/cards" element={<Navigate to="/dashboard/cards/management" replace />} />
            <Route path="/dashboard/cards/management" element={<CardManagement />} />
            <Route path="/dashboard/cards/activation-tasks" element={<CardActivationTasksPage />} />
            <Route path="/dashboard/cards/apply" element={<CardApplicationPage />} />
            
            {/* Merchant section */}
            <Route path="/dashboard/merchant" element={<Navigate to="/dashboard/merchant/account-settings" replace />} />
            <Route path="/dashboard/merchant/account-settings" element={<AccountSettings />} />
            <Route path="/dashboard/merchant/account-info" element={<AccountInfo />} />
            <Route path="/dashboard/merchant/account-roles" element={<AccountRoles />} />
            
            {/* Invitation section */}
            <Route path="/dashboard/invitation" element={<Navigate to="/dashboard/invitation/management" replace />} />
            <Route path="/dashboard/invitation/management" element={<InvitationManagement />} />
            <Route path="/dashboard/invitation/rebate-management" element={<RebateManagement />} />
            
            {/* Legacy routes for backward compatibility */}
            <Route path="/dashboard/cards/search" element={<Navigate to="/dashboard/cards/management" replace />} />
            <Route path="/dashboard/cards/activation" element={<Navigate to="/dashboard/cards/activation-tasks" replace />} />
            <Route path="/dashboard/wallet/records" element={<Navigate to="/dashboard/wallet/deposit-records" replace />} />
            <Route path="/dashboard/wallet/funds" element={<Navigate to="/dashboard/wallet/fund-details" replace />} />
            <Route path="/dashboard/account" element={<Navigate to="/dashboard/merchant/account-settings" replace />} />
            <Route path="/dashboard/account/info" element={<Navigate to="/dashboard/merchant/account-info" replace />} />
            <Route path="/dashboard/account/management" element={<Navigate to="/dashboard/merchant/account-settings" replace />} />
            <Route path="/dashboard/account/roles" element={<Navigate to="/dashboard/merchant/account-roles" replace />} />
            <Route path="/dashboard/invitation/list" element={<Navigate to="/dashboard/invitation/management" replace />} />
            <Route path="/dashboard/invitation/rebate" element={<Navigate to="/dashboard/invitation/rebate-management" replace />} />
            <Route path="/dashboard/invitation/rebate-list" element={<Navigate to="/dashboard/invitation/rebate-management" replace />} />
            
            {/* Catch-all redirect for dashboard */}
            <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default RouteComponents;
