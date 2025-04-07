
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import GuestRoute from "./GuestRoute";
import FrontendRoute from "./FrontendRoute";
import BackendRoute from "./BackendRoute";
import { PageLoading } from "./LoadingComponents";
import { useAuth } from "@/hooks/use-auth";

// Lazy load pages for better performance
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const InvitationPage = lazy(() => import("@/pages/InvitationPage"));
const Contact = lazy(() => import("@/pages/frontend/Contact"));
const Terms = lazy(() => import("@/pages/frontend/Terms"));
const Privacy = lazy(() => import("@/pages/frontend/Privacy"));
const NotFound = lazy(() => import("@/pages/frontend/NotFound"));
const Index = lazy(() => import("@/pages/Index"));

// Layouts
const AuthLayout = lazy(() => import("@/components/auth/AuthLayout"));
const DashboardLayout = lazy(() => import("@/components/dashboard/DashboardLayout"));

// Dashboard pages
const DashboardHome = lazy(() => import("@/pages/dashboard/DashboardHome"));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const WalletDashboard = lazy(() => import("@/pages/dashboard/wallet/WalletDashboard"));
const WalletDeposit = lazy(() => import("@/pages/dashboard/wallet/WalletDeposit"));
const DepositRecords = lazy(() => import("@/pages/dashboard/wallet/DepositRecords"));
const FundDetails = lazy(() => import("@/pages/dashboard/wallet/FundDetails"));
const CardSearch = lazy(() => import("@/pages/dashboard/cards/CardSearch"));
const CardActivationTasksPage = lazy(() => import("@/pages/dashboard/cards/CardActivationTasksPage"));
const CardApplicationPage = lazy(() => import("@/pages/dashboard/cards/CardApplicationPage"));
const TransactionsPage = lazy(() => import("@/pages/dashboard/transactions/TransactionsPage"));
const TransactionHistoryPage = lazy(() => import("@/pages/dashboard/transactions/TransactionHistoryPage"));
const AccountInfo = lazy(() => import("@/pages/dashboard/merchant/AccountInfo"));
const AccountManagement = lazy(() => import("@/pages/dashboard/merchant/AccountManagement"));
const AccountRoles = lazy(() => import("@/pages/dashboard/merchant/AccountRoles"));
const InvitationList = lazy(() => import("@/pages/dashboard/invitation/InvitationList"));
const RebateList = lazy(() => import("@/pages/dashboard/invitation/RebateList"));
const AnalyticsPage = lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));

const RouteComponents = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  // Enhanced debugging
  console.log("==== ROUTE COMPONENTS MOUNTED ====");
  console.log("RouteComponents: Current path:", location.pathname);
  console.log("RouteComponents: Auth state:", { isLoggedIn, isLoading });
  console.log("RouteComponents: localStorage token:", localStorage.getItem('authToken'));
  console.log("========================");

  // If still loading auth state, show loading indicator
  if (isLoading) {
    console.log("Auth is loading, showing loading page");
    return <PageLoading />;
  }

  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* Auth routes with AuthLayout, using GuestRoute wrapper */}
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

        {/* Protected dashboard routes */}
        <Route element={<BackendRoute isLoggedIn={isLoggedIn} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/wallet" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard/wallet/deposit" element={<WalletDeposit />} />
            <Route path="/dashboard/wallet/deposit-records" element={<DepositRecords />} />
            <Route path="/dashboard/wallet/records" element={<DepositRecords />} />
            <Route path="/dashboard/wallet/fund-details" element={<FundDetails />} />
            <Route path="/dashboard/wallet/funds" element={<FundDetails />} />
            <Route path="/dashboard/cards" element={<Navigate to="/dashboard/cards/search" replace />} />
            <Route path="/dashboard/cards/search" element={<CardSearch />} />
            <Route path="/dashboard/cards/activation" element={<CardActivationTasksPage />} />
            <Route path="/dashboard/cards/apply" element={<CardApplicationPage />} />
            <Route path="/dashboard/transactions" element={<TransactionsPage />} />
            <Route path="/dashboard/transactions/history" element={<TransactionHistoryPage />} />
            <Route path="/dashboard/account" element={<Navigate to="/dashboard/account/info" replace />} />
            <Route path="/dashboard/account/info" element={<AccountInfo />} />
            <Route path="/dashboard/account/management" element={<AccountManagement />} />
            <Route path="/dashboard/account/roles" element={<AccountRoles />} />
            <Route path="/dashboard/invitation" element={<Navigate to="/dashboard/invitation/list" replace />} />
            <Route path="/dashboard/invitation/list" element={<InvitationList />} />
            <Route path="/dashboard/invitation/rebate" element={<RebateList />} />
            <Route path="/dashboard/invitation/rebate-list" element={<RebateList />} />
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
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
