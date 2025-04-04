
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardLoading, FrontendLoading } from "@/components/routing/LoadingComponents";
import AuthLayout from "@/components/auth/AuthLayout";
import { Login, Register, ForgotPassword, NotFound, AccountInfo, AccountManagement, AccountRoles, FundDetails, CardSearchPage, CardApplicationPage, CardActivationTasksPage, DepositRecords, WalletDeposit } from "@/components/routing/RouteComponents";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AppProviders from "@/components/providers/AppProviders";
import TransactionsPage from "./pages/dashboard/transactions/TransactionsPage";
import TransactionHistoryPage from "./pages/dashboard/transactions/TransactionHistoryPage";

// Lazy loaded components to improve initial load time
const IndexPage = lazy(() => import("@/pages/frontend/Index"));
const DashboardHome = lazy(() => import("@/pages/dashboard/DashboardHome"));
const AnalyticsPage = lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));
const InvitationList = lazy(() => import("@/pages/dashboard/invitation/InvitationList"));
const RebateList = lazy(() => import("@/pages/dashboard/invitation/RebateList"));

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
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
            <Route path="wallet/deposit" element={<WalletDeposit />} />
            <Route path="wallet/records" element={<DepositRecords />} />
            <Route path="wallet/fund-details" element={<FundDetails />} />
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
            <Route path="merchant/info" element={<AccountInfo />} />
            <Route path="merchant/management" element={<AccountManagement />} />
            <Route path="merchant/roles" element={<AccountRoles />} />
            <Route path="cards/search" element={<CardSearchPage />} />
            <Route path="cards/apply" element={<CardApplicationPage />} />
            <Route path="cards/activation" element={<CardActivationTasksPage />} />
          </Route>

          {/* 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
