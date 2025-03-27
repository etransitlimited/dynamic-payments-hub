
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import { DashboardLoading } from "./LoadingComponents";

// Dashboard pages
const DashboardHome = lazy(() => import("@/pages/dashboard/DashboardHome"));

// Analytics, Users, Transactions & Discounts pages
const AnalyticsPage = lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));
const UsersManagementPage = lazy(() => import("@/pages/dashboard/users/UsersManagementPage"));
const TransactionsPage = lazy(() => import("@/pages/dashboard/transactions/TransactionsPage"));
const DiscountsPage = lazy(() => import("@/pages/dashboard/discounts/DiscountsPage"));

// Wallet pages
const WalletDeposit = lazy(() => import("@/pages/dashboard/wallet/WalletDeposit"));
const DepositRecords = lazy(() => import("@/pages/dashboard/wallet/DepositRecords"));
const FundDetails = lazy(() => import("@/pages/dashboard/wallet/FundDetails"));

// Card pages
const CardSearch = lazy(() => import("@/pages/dashboard/cards/CardSearch"));
const ActivationTasks = lazy(() => import("@/pages/dashboard/cards/ActivationTasks"));
const ApplyCard = lazy(() => import("@/pages/dashboard/cards/ApplyCard"));

// Merchant pages
const AccountManagement = lazy(() => import("@/pages/dashboard/merchant/AccountManagement"));
const AccountInfo = lazy(() => import("@/pages/dashboard/merchant/AccountInfo"));
const AccountRoles = lazy(() => import("@/pages/dashboard/merchant/AccountRoles"));

// Invitation pages
const InvitationList = lazy(() => import("@/pages/dashboard/invitation/InvitationList"));
const RebateList = lazy(() => import("@/pages/dashboard/invitation/RebateList"));

const DashboardRoutes = () => {
  return (
    <Dashboard>
      <Routes>
        <Route index element={
          <Suspense fallback={<DashboardLoading />}>
            <DashboardHome />
          </Suspense>
        } />
        
        {/* Analytics, Users, Transactions & Discounts Routes */}
        <Route path="analytics" element={
          <Suspense fallback={<DashboardLoading />}>
            <AnalyticsPage />
          </Suspense>
        } />
        <Route path="users" element={
          <Suspense fallback={<DashboardLoading />}>
            <UsersManagementPage />
          </Suspense>
        } />
        <Route path="transactions" element={
          <Suspense fallback={<DashboardLoading />}>
            <TransactionsPage />
          </Suspense>
        } />
        <Route path="discounts" element={
          <Suspense fallback={<DashboardLoading />}>
            <DiscountsPage />
          </Suspense>
        } />
        
        {/* Wallet Routes */}
        <Route path="wallet/deposit" element={
          <Suspense fallback={<DashboardLoading />}>
            <WalletDeposit />
          </Suspense>
        } />
        <Route path="wallet/deposit-records" element={
          <Suspense fallback={<DashboardLoading />}>
            <DepositRecords />
          </Suspense>
        } />
        <Route path="wallet/fund-details" element={
          <Suspense fallback={<DashboardLoading />}>
            <FundDetails />
          </Suspense>
        } />
        
        {/* Card Management Routes */}
        <Route path="cards/search" element={
          <Suspense fallback={<DashboardLoading />}>
            <CardSearch />
          </Suspense>
        } />
        <Route path="cards/activation-tasks" element={
          <Suspense fallback={<DashboardLoading />}>
            <ActivationTasks />
          </Suspense>
        } />
        <Route path="cards/apply" element={
          <Suspense fallback={<DashboardLoading />}>
            <ApplyCard />
          </Suspense>
        } />
        
        {/* Merchant Center Routes */}
        <Route path="merchant/account-management" element={
          <Suspense fallback={<DashboardLoading />}>
            <AccountManagement />
          </Suspense>
        } />
        <Route path="merchant/account-info" element={
          <Suspense fallback={<DashboardLoading />}>
            <AccountInfo />
          </Suspense>
        } />
        <Route path="merchant/account-roles" element={
          <Suspense fallback={<DashboardLoading />}>
            <AccountRoles />
          </Suspense>
        } />
        
        {/* Invitation Management Routes */}
        <Route path="invitation/list" element={
          <Suspense fallback={<DashboardLoading />}>
            <InvitationList />
          </Suspense>
        } />
        <Route path="invitation/rebate-list" element={
          <Suspense fallback={<DashboardLoading />}>
            <RebateList />
          </Suspense>
        } />
      </Routes>
    </Dashboard>
  );
};

export default DashboardRoutes;
