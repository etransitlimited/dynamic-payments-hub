import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoading } from "@/components/routing/LoadingComponents";
import HreflangTags from "@/components/seo/HreflangTags";

// Frontend pages (public)
const Index = React.lazy(() => import("@/pages/Index"));
const Login = React.lazy(() => import("@/pages/frontend/Login"));
const Register = React.lazy(() => import("@/pages/frontend/Register"));
const ForgotPassword = React.lazy(() => import("@/pages/frontend/ForgotPassword"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

// Dashboard
const DashboardHome = React.lazy(() => import("@/pages/dashboard/DashboardHome"));
const TransactionsPage = React.lazy(() => import("@/pages/dashboard/transactions/TransactionsPage"));
const TransactionHistoryPage = React.lazy(() => import("@/pages/dashboard/transactions/TransactionHistoryPage"));
const WalletDeposit = React.lazy(() => import("@/pages/dashboard/wallet/WalletDeposit"));
const DepositRecords = React.lazy(() => import("@/pages/dashboard/wallet/DepositRecords"));
const FundDetails = React.lazy(() => import("@/pages/dashboard/wallet/FundDetails"));
const AnalyticsPage = React.lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));
const CardSearch = React.lazy(() => import("@/pages/dashboard/cards/CardSearch"));
const CardSearchPage = React.lazy(() => import("@/pages/dashboard/cards/CardSearchPage"));
const ActivationTasks = React.lazy(() => import("@/pages/dashboard/cards/ActivationTasks"));
const CardActivationTasksPage = React.lazy(() => import("@/pages/dashboard/cards/CardActivationTasksPage"));
const ApplyCard = React.lazy(() => import("@/pages/dashboard/cards/ApplyCard"));
const CardApplicationPage = React.lazy(() => import("@/pages/dashboard/cards/CardApplicationPage"));
const AccountInfo = React.lazy(() => import("@/pages/dashboard/merchant/AccountInfo"));
const AccountManagement = React.lazy(() => import("@/pages/dashboard/merchant/AccountManagement"));
const AccountRoles = React.lazy(() => import("@/pages/dashboard/merchant/AccountRoles"));
const InvitationList = React.lazy(() => import("@/pages/dashboard/invitation/InvitationList"));
const RebateList = React.lazy(() => import("@/pages/dashboard/invitation/RebateList"));

// Dashboard Layout
const DashboardLayout = React.lazy(() => import("@/components/dashboard/DashboardLayout"));
const DashboardPage = React.lazy(() => import("@/pages/dashboard/DashboardPage"));

// Import new wallet dashboard
import WalletDashboard from "@/pages/dashboard/wallet/WalletDashboard";

/**
 * Primary routing component for the application
 * Handles all routes, both public and authenticated
 */
const RouteComponents = () => {
  return (
    <>
      <HreflangTags />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <Suspense fallback={<PageLoading />}>
                <DashboardLayout />
              </Suspense>
            }
          >
            <Route index element={<DashboardPage />} />
            
            {/* Wallet Routes - Grouped by functionality */}
            <Route path="wallet">
              <Route index element={<WalletDashboard />} />
              <Route path="deposit" element={<WalletDeposit />} />
              <Route path="deposit-records" element={<DepositRecords />} />
              <Route path="records" element={<DepositRecords />} /> {/* Keep for backward compatibility */}
              <Route path="fund-details" element={<FundDetails />} />
            </Route>
            
            {/* Analytics Routes */}
            <Route path="analytics" element={<AnalyticsPage />} />
            
            {/* Card Management Routes - With new pages */}
            <Route path="cards">
              <Route index element={<CardSearchPage />} />
              <Route path="search" element={<CardSearchPage />} />
              <Route path="activation" element={<CardActivationTasksPage />} />
              <Route path="apply" element={<CardApplicationPage />} />
              
              {/* Legacy routes for backward compatibility */}
              <Route path="search-legacy" element={<CardSearch />} />
              <Route path="activation-legacy" element={<ActivationTasks />} />
              <Route path="apply-legacy" element={<ApplyCard />} />
            </Route>
            
            {/* Account Routes */}
            <Route path="account">
              <Route index element={<AccountInfo />} />
              <Route path="info" element={<AccountInfo />} />
              <Route path="management" element={<AccountManagement />} />
              <Route path="roles" element={<AccountRoles />} />
            </Route>
            
            {/* Legacy Merchant Account Routes - Keep for backwards compatibility */}
            <Route path="merchant/info" element={<AccountInfo />} />
            <Route path="merchant/management" element={<AccountManagement />} />
            <Route path="merchant/roles" element={<AccountRoles />} />
            
            {/* Transaction Routes - With new history page */}
            <Route path="transactions">
              <Route index element={<TransactionsPage />} />
              <Route path="history" element={<TransactionHistoryPage />} />
            </Route>
            
            {/* Invitation Routes */}
            <Route path="invitation">
              <Route index element={<InvitationList />} />
              <Route path="list" element={<InvitationList />} />
              <Route path="rebate" element={<RebateList />} />
            </Route>
            
            {/* Fallback for dashboard - should redirect to home */}
            <Route path="*" element={<DashboardHome />} />
          </Route>
          
          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default RouteComponents;
