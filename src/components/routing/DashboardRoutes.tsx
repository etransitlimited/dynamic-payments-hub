
import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import { DashboardLoading } from "@/components/routing/LoadingComponents";

// Dashboard pages
const DashboardHome = React.lazy(() => import("@/pages/dashboard/DashboardHome"));

// Analytics & Transactions pages
const AnalyticsPage = React.lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));
const TransactionsPage = React.lazy(() => import("@/pages/dashboard/transactions/TransactionsPage"));

// Wallet pages
const WalletDeposit = React.lazy(() => import("@/pages/dashboard/wallet/WalletDeposit"));
const DepositRecords = React.lazy(() => import("@/pages/dashboard/wallet/DepositRecords"));
const FundDetails = React.lazy(() => import("@/pages/dashboard/wallet/FundDetails"));

// Card pages
const CardSearch = React.lazy(() => import("@/pages/dashboard/cards/CardSearch"));
const ActivationTasks = React.lazy(() => import("@/pages/dashboard/cards/ActivationTasks"));
const ApplyCard = React.lazy(() => import("@/pages/dashboard/cards/ApplyCard"));

// Merchant pages
const AccountManagement = React.lazy(() => import("@/pages/dashboard/merchant/AccountManagement"));
const AccountInfo = React.lazy(() => import("@/pages/dashboard/merchant/AccountInfo"));
const AccountRoles = React.lazy(() => import("@/pages/dashboard/merchant/AccountRoles"));

// Invitation pages
const InvitationList = React.lazy(() => import("@/pages/dashboard/invitation/InvitationList"));
const RebateList = React.lazy(() => import("@/pages/dashboard/invitation/RebateList"));

const DashboardRoutes = () => {
  return (
    <Dashboard>
      <Routes>
        {/* Dashboard Home */}
        <Route index element={<DashboardHome />} />
        
        {/* Analytics & Transactions Routes */}
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        
        {/* Wallet Routes */}
        <Route path="wallet" element={<Navigate to="/dashboard/wallet/deposit" replace />} />
        <Route path="wallet/deposit" element={<WalletDeposit />} />
        <Route path="wallet/deposit-records" element={<DepositRecords />} />
        <Route path="wallet/fund-details" element={<FundDetails />} />
        
        {/* Card Management Routes */}
        <Route path="cards" element={<Navigate to="/dashboard/cards/search" replace />} />
        <Route path="cards/search" element={<CardSearch />} />
        <Route path="cards/activation-tasks" element={<ActivationTasks />} />
        <Route path="cards/apply" element={<ApplyCard />} />
        
        {/* Merchant Center Routes */}
        <Route path="merchant" element={<Navigate to="/dashboard/merchant/account-management" replace />} />
        <Route path="merchant/account-management" element={<AccountManagement />} />
        <Route path="merchant/account-info" element={<AccountInfo />} />
        <Route path="merchant/account-roles" element={<AccountRoles />} />
        
        {/* Invitation Management Routes */}
        <Route path="invitation" element={<Navigate to="/dashboard/invitation/list" replace />} />
        <Route path="invitation/list" element={<InvitationList />} />
        <Route path="invitation/rebate-list" element={<RebateList />} />

        {/* Catch-all route for dashboard - redirect to main dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Dashboard>
  );
};

export default DashboardRoutes;
