
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardLoading } from "@/components/routing/LoadingComponents";
import AuthLayout from "@/components/auth/AuthLayout";
import AppProviders from "@/components/providers/AppProviders";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TransactionsPage from "./pages/dashboard/transactions/TransactionsPage";
import TransactionHistoryPage from "./pages/dashboard/transactions/TransactionHistoryPage";

// Frontend pages (public)
const Login = lazy(() => import("@/pages/frontend/Login"));
const Register = lazy(() => import("@/pages/frontend/Register"));
const ForgotPassword = lazy(() => import("@/pages/frontend/ForgotPassword"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Lazy loaded components to improve initial load time
const IndexPage = lazy(() => import("@/pages/frontend/Index"));
const DashboardHome = lazy(() => import("@/pages/dashboard/DashboardHome"));
const AnalyticsPage = lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));
const InvitationList = lazy(() => import("@/pages/dashboard/invitation/InvitationList"));
const RebateList = lazy(() => import("@/pages/dashboard/invitation/RebateList"));
const WalletDeposit = lazy(() => import("@/pages/dashboard/wallet/WalletDeposit"));
const DepositRecords = lazy(() => import("@/pages/dashboard/wallet/DepositRecords"));
const FundDetails = lazy(() => import("@/pages/dashboard/wallet/FundDetails"));
const AccountInfo = lazy(() => import("@/pages/dashboard/merchant/AccountInfo"));
const AccountManagement = lazy(() => import("@/pages/dashboard/merchant/AccountManagement"));
const AccountRoles = lazy(() => import("@/pages/dashboard/merchant/AccountRoles"));
const CardSearchPage = lazy(() => import("@/pages/dashboard/cards/CardSearch"));
const CardApplicationPage = lazy(() => import("@/pages/dashboard/cards/ApplyCard"));
const CardActivationTasksPage = lazy(() => import("@/pages/dashboard/cards/ActivationTasks"));

// Simple loading component for frontend pages
const FrontendLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#061428] text-white">
    <div className="flex flex-col items-center">
      <div className="w-64 h-12 bg-blue-900/20 rounded-lg mb-4 animate-pulse"></div>
      <div className="w-48 h-4 bg-blue-900/20 rounded-lg animate-pulse"></div>
    </div>
  </div>
);

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          {/* Frontend routes */}
          <Route
            path="/"
            element={
              <Suspense fallback={<FrontendLoading />}>
                <IndexPage />
              </Suspense>
            }
          />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={
              <Suspense fallback={<FrontendLoading />}>
                <Login />
              </Suspense>
            } />
            <Route path="/register" element={
              <Suspense fallback={<FrontendLoading />}>
                <Register />
              </Suspense>
            } />
            <Route path="/forgot-password" element={
              <Suspense fallback={<FrontendLoading />}>
                <ForgotPassword />
              </Suspense>
            } />
          </Route>

          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<DashboardLoading />}>
                  <DashboardHome />
                </Suspense>
              }
            />
            <Route path="analytics" element={
              <Suspense fallback={<DashboardLoading />}>
                <AnalyticsPage />
              </Suspense>
            } />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="transactions/history" element={<TransactionHistoryPage />} />
            <Route path="wallet/deposit" element={
              <Suspense fallback={<DashboardLoading />}>
                <WalletDeposit />
              </Suspense>
            } />
            <Route path="wallet/records" element={
              <Suspense fallback={<DashboardLoading />}>
                <DepositRecords />
              </Suspense>
            } />
            <Route path="wallet/fund-details" element={
              <Suspense fallback={<DashboardLoading />}>
                <FundDetails />
              </Suspense>
            } />
            <Route path="invitation/list" element={
              <Suspense fallback={<DashboardLoading />}>
                <InvitationList />
              </Suspense>
            } />
            <Route path="invitation" element={
              <Suspense fallback={<DashboardLoading />}>
                <InvitationList />
              </Suspense>
            } />
            <Route path="invitation/rebate" element={
              <Suspense fallback={<DashboardLoading />}>
                <RebateList />
              </Suspense>
            } />
            <Route path="account/info" element={
              <Suspense fallback={<DashboardLoading />}>
                <AccountInfo />
              </Suspense>
            } />
            <Route path="account/management" element={
              <Suspense fallback={<DashboardLoading />}>
                <AccountManagement />
              </Suspense>
            } />
            <Route path="account/roles" element={
              <Suspense fallback={<DashboardLoading />}>
                <AccountRoles />
              </Suspense>
            } />
            <Route path="merchant/info" element={
              <Suspense fallback={<DashboardLoading />}>
                <AccountInfo />
              </Suspense>
            } />
            <Route path="merchant/management" element={
              <Suspense fallback={<DashboardLoading />}>
                <AccountManagement />
              </Suspense>
            } />
            <Route path="merchant/roles" element={
              <Suspense fallback={<DashboardLoading />}>
                <AccountRoles />
              </Suspense>
            } />
            <Route path="cards/search" element={
              <Suspense fallback={<DashboardLoading />}>
                <CardSearchPage />
              </Suspense>
            } />
            <Route path="cards/apply" element={
              <Suspense fallback={<DashboardLoading />}>
                <CardApplicationPage />
              </Suspense>
            } />
            <Route path="cards/activation" element={
              <Suspense fallback={<DashboardLoading />}>
                <CardActivationTasksPage />
              </Suspense>
            } />
          </Route>

          {/* 404 Not Found route */}
          <Route path="*" element={
            <Suspense fallback={<FrontendLoading />}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
