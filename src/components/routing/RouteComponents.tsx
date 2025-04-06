import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import DashboardPage from "@/pages/dashboard/DashboardPage";
import WalletDashboard from "@/pages/dashboard/wallet/WalletDashboard";
import WalletDeposit from "@/pages/dashboard/wallet/WalletDeposit";
import DepositRecords from "@/pages/dashboard/wallet/DepositRecords";
import FundDetails from "@/pages/dashboard/wallet/FundDetails";
import CardSearch from "@/pages/dashboard/cards/CardSearch";
import CardActivationTasksPage from "@/pages/dashboard/cards/CardActivationTasksPage";
import CardApplicationPage from "@/pages/dashboard/cards/CardApplicationPage";
import TransactionsPage from "@/pages/dashboard/transactions/TransactionsPage";
import TransactionHistoryPage from "@/pages/dashboard/transactions/TransactionHistoryPage";
import AccountInfo from "@/pages/dashboard/merchant/AccountInfo";
import AccountManagement from "@/pages/dashboard/merchant/AccountManagement";
import AccountRoles from "@/pages/dashboard/merchant/AccountRoles";
import InvitationList from "@/pages/dashboard/invitation/InvitationList";
import RebateList from "@/pages/dashboard/invitation/RebateList";
import AnalyticsPage from "@/pages/dashboard/analytics/AnalyticsPage";

const RouteComponents = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  // Enhanced debugging logs for route setup and auth state
  useEffect(() => {
    console.log("RouteComponents rendering, current path:", location.pathname);
    console.log("Authentication state:", { isLoggedIn, isLoading });
    
    // Force log local storage content for debugging
    const authToken = localStorage.getItem('authToken');
    console.log("Auth token in localStorage:", !!authToken);
    
    // For development testing, you can uncomment this block to set a test token
    // if (!authToken) {
    //   console.log("Setting test auth token for development");
    //   localStorage.setItem('authToken', 'test-token-123');
    // }
  }, [isLoggedIn, isLoading, location.pathname]);

  // Additional debug info
  console.log("Current route state:", {
    path: location.pathname, 
    isLoggedIn, 
    isLoading,
    hasToken: !!localStorage.getItem('authToken')
  });

  if (isLoading) {
    console.log("Auth is loading, showing loading page");
    return <PageLoading />;
  }

  return (
    <Routes>
      {/* Guest Routes with AuthLayout - Frontend section */}
      <Route element={<AuthLayout />}>
        <Route element={<GuestRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
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
        {/* Temporarily comment out other frontend routes */}
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} /> */}
      </Route>

      {/* Backend Routes (Dashboard) - Explicitly pass isLoggedIn prop */}
      <Route element={<BackendRoute isLoggedIn={isLoggedIn} />}>
        <Route element={<DashboardLayout />}>
          {/* Main Dashboard */}
          <Route path="/dashboard" element={<DashboardHome />} />
          
          {/* Wallet Section */}
          <Route path="/dashboard/wallet" element={<WalletDashboard />} />
          <Route path="/dashboard/wallet/deposit" element={<WalletDeposit />} />
          <Route path="/dashboard/wallet/deposit-records" element={<DepositRecords />} />
          <Route path="/dashboard/wallet/records" element={<DepositRecords />} />
          <Route path="/dashboard/wallet/fund-details" element={<FundDetails />} />
          <Route path="/dashboard/wallet/funds" element={<FundDetails />} />
          
          {/* Other backend routes - keep existing */}
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
          
          {/* Handle any unknown dashboard paths */}
          <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>

      {/* Not Found Route */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default RouteComponents;
