
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
const WalletDeposit = React.lazy(() => import("@/pages/dashboard/wallet/WalletDeposit"));
const DepositRecords = React.lazy(() => import("@/pages/dashboard/wallet/DepositRecords"));
const FundDetails = React.lazy(() => import("@/pages/dashboard/wallet/FundDetails"));
const AnalyticsPage = React.lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));
const CardSearch = React.lazy(() => import("@/pages/dashboard/cards/CardSearch"));
const ActivationTasks = React.lazy(() => import("@/pages/dashboard/cards/ActivationTasks"));
const ApplyCard = React.lazy(() => import("@/pages/dashboard/cards/ApplyCard"));
const AccountInfo = React.lazy(() => import("@/pages/dashboard/merchant/AccountInfo"));
const AccountManagement = React.lazy(() => import("@/pages/dashboard/merchant/AccountManagement"));
const AccountRoles = React.lazy(() => import("@/pages/dashboard/merchant/AccountRoles"));
const InvitationList = React.lazy(() => import("@/pages/dashboard/invitation/InvitationList"));
const RebateList = React.lazy(() => import("@/pages/dashboard/invitation/RebateList"));

// Dashboard Layout
const DashboardLayout = React.lazy(() => import("@/components/dashboard/DashboardLayout"));

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
            <Route index element={<DashboardHome />} />
            
            {/* Wallet Routes */}
            <Route path="wallet/deposit" element={<WalletDeposit />} />
            <Route path="wallet/records" element={<DepositRecords />} />
            <Route path="wallet/deposit-records" element={<DepositRecords />} />
            <Route path="wallet/funds" element={<FundDetails />} />
            <Route path="wallet/fund-details" element={<FundDetails />} />
            
            {/* Analytics Routes */}
            <Route path="analytics" element={<AnalyticsPage />} />
            
            {/* Card Management Routes */}
            <Route path="cards/search" element={<CardSearch />} />
            <Route path="cards/activation" element={<ActivationTasks />} />
            <Route path="cards/apply" element={<ApplyCard />} />
            
            {/* Merchant Account Routes */}
            <Route path="account/info" element={<AccountInfo />} />
            <Route path="account/management" element={<AccountManagement />} />
            <Route path="account/roles" element={<AccountRoles />} />
            
            {/* Transaction Routes */}
            <Route path="transactions" element={<TransactionsPage />} />
            
            {/* Invitation Routes */}
            <Route path="invitation/list" element={<InvitationList />} />
            <Route path="invitation/rebate" element={<RebateList />} />
            
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
