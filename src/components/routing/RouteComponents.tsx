
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
const WalletManagement = lazy(() => import("@/pages/dashboard/wallet/WalletManagement"));
const FundDetails = lazy(() => import("@/pages/dashboard/wallet/FundDetails"));
const DepositRecords = lazy(() => import("@/pages/dashboard/wallet/DepositRecords"));
const WalletDeposit = lazy(() => import("@/pages/dashboard/wallet/WalletDeposit"));
const WalletWithdraw = lazy(() => import("@/pages/dashboard/wallet/WalletWithdraw"));
const FinancialCalendar = lazy(() => import("@/pages/dashboard/wallet/FinancialCalendar"));
const FinancialReports = lazy(() => import("@/pages/dashboard/wallet/FinancialReports"));

// Cards pages
const CardManagementPage = lazy(() => import("@/pages/dashboard/cards/CardManagementPage"));
const CardActivationTasksPage = lazy(() => import("@/pages/dashboard/cards/CardActivationTasksPage"));
const CardApplicationPage = lazy(() => import("@/pages/dashboard/cards/CardApplicationPage"));

// Merchant pages
const AccountSettings = lazy(() => import("@/pages/dashboard/merchant/AccountManagement"));
const AccountInfo = lazy(() => import("@/pages/dashboard/merchant/AccountInfo"));
const AccountRoles = lazy(() => import("@/pages/dashboard/merchant/AccountRoles"));

// Invitation pages
const InvitationManagement = lazy(() => import("@/pages/dashboard/invitation/InvitationList"));
const RebateManagement = lazy(() => import("@/pages/dashboard/invitation/RebateList"));

// Import the AuthWrapper
const AuthWrapper = lazy(() => import("@/modules/auth/components/AuthWrapper"));

const RouteComponents = () => {
  const { isLoggedIn, isLoading, forceRefresh } = useAuth();
  const { language } = useLanguage(); 
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const isInitialLoadRef = useRef(true);
  const [isChangingRoute, setIsChangingRoute] = useState(false);
  const changeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const authCheckedRef = useRef(false);
  const tokenCheckAttemptRef = useRef(0);
  
  // Force check auth state on mount
  useEffect(() => {
    console.log("RouteComponents: Initial mount, checking for tokens");
    
    // Only on first load, try up to 3 times to restore token
    const checkForToken = () => {
      if (tokenCheckAttemptRef.current >= 3) return;
      
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
      if (token && !isLoggedIn && !isLoading) {
        console.log(`RouteComponents: Found token on attempt ${tokenCheckAttemptRef.current + 1}, refreshing auth`);
        forceRefresh();
      }
      
      tokenCheckAttemptRef.current++;
    };
    
    // Immediate check
    checkForToken();
    
    // Then try a few more times with delay
    const timer1 = setTimeout(checkForToken, 500);
    const timer2 = setTimeout(checkForToken, 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    console.log("==== ROUTE COMPONENTS MOUNTED OR UPDATED ====");
    console.log("RouteComponents: Current path:", location.pathname);
    console.log("RouteComponents: Auth state:", { isLoggedIn, isLoading });
    console.log("RouteComponents: Current language:", language);
    
    if (prevPathRef.current !== location.pathname) {
      console.log(`Path changed from ${prevPathRef.current} to ${location.pathname}`);
      prevPathRef.current = location.pathname;
      
      if (location.pathname.startsWith('/dashboard') && !isLoggedIn && !isLoading) {
        console.log("Navigating to protected route, refreshing auth state");
        forceRefresh();
      }
      
      setIsChangingRoute(true);
      
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
      }
      
      changeTimeoutRef.current = setTimeout(() => {
        setIsChangingRoute(false);
        isInitialLoadRef.current = false;
      }, 300);
    }
    
    return () => {
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
      }
    };
  }, [location.pathname, isLoggedIn, isLoading, forceRefresh, language]);

  // More aggressive token check on page load/refresh
  useEffect(() => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
    if (token && !isLoggedIn && !isLoading && !authCheckedRef.current) {
      console.log("Found auth token during initialization, refreshing state");
      forceRefresh();
      authCheckedRef.current = true;
      
      // Double check after a short delay
      setTimeout(() => {
        const tokenStillExists = localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
        if (tokenStillExists && !isLoggedIn) {
          console.log("Token still exists but not logged in, forcing refresh again");
          forceRefresh();
        }
      }, 1000);
    }
  }, [isLoggedIn, isLoading, forceRefresh]);

  // Generate unique route key for forcing remount
  const routeKey = React.useMemo(() => 
    `routes-${isInitialLoadRef.current ? 'initial' : 'updated'}-${Date.now()}`, 
  []);

  // Show loading state during initial auth check
  if (isLoading && isInitialLoadRef.current) {
    console.log("RouteComponents: Auth is loading, showing loading page");
    return <PageLoading />;
  }

  return (
    <Suspense fallback={<PageLoading />}>
      <AuthWrapper>
        <Routes key={routeKey}>
          <Route path="/" element={<Index />} />
          
          <Route element={<GuestRoute isLoggedIn={isLoggedIn} />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/invitation/:token" element={<InvitationPage />} />
            </Route>
          </Route>

          <Route element={<FrontendRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          <Route element={<BackendRoute isLoggedIn={isLoggedIn} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
              <Route path="/dashboard/transactions" element={<TransactionsPage />} />
              <Route path="/dashboard/transactions/history" element={<TransactionHistoryPage />} />
              
              <Route path="/dashboard/wallet" element={<Navigate to="/dashboard/wallet/management" replace />} />
              <Route path="/dashboard/wallet/management" element={<WalletManagement />} />
              <Route path="/dashboard/wallet/fund-details" element={<FundDetails />} />
              <Route path="/dashboard/wallet/deposit-records" element={<DepositRecords />} />
              <Route path="/dashboard/wallet/deposit" element={<WalletDeposit />} />
              <Route path="/dashboard/wallet/withdraw" element={<WalletWithdraw />} />
              <Route path="/dashboard/wallet/financial-calendar" element={<FinancialCalendar />} />
              <Route path="/dashboard/wallet/financial-reports" element={<FinancialReports />} />
              
              <Route path="/dashboard/cards" element={<Navigate to="/dashboard/cards/management" replace />} />
              <Route path="/dashboard/cards/management" element={<CardManagementPage />} />
              <Route path="/dashboard/cards/activation-tasks" element={<CardActivationTasksPage />} />
              <Route path="/dashboard/cards/apply" element={<CardApplicationPage />} />
              
              <Route path="/dashboard/merchant" element={<Navigate to="/dashboard/merchant/account-settings" replace />} />
              <Route path="/dashboard/merchant/account-settings" element={<AccountSettings />} />
              <Route path="/dashboard/merchant/account-info" element={<AccountInfo />} />
              <Route path="/dashboard/merchant/account-roles" element={<AccountRoles />} />
              
              <Route path="/dashboard/invitation" element={<Navigate to="/dashboard/invitation/management" replace />} />
              <Route path="/dashboard/invitation/management" element={<InvitationManagement />} />
              <Route path="/dashboard/invitation/rebate-management" element={<RebateManagement />} />
              
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
              
              <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AuthWrapper>
    </Suspense>
  );
};

export default RouteComponents;
