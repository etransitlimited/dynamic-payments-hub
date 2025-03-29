
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { PageLoading } from "@/components/routing/LoadingComponents";
import DashboardInternalRoutes from "@/components/routing/DashboardInternalRoutes";
import { LanguageProvider } from "@/context/LanguageContext";

// Dashboard pages using lazy loading
const DashboardHome = React.lazy(() => import("@/pages/dashboard/DashboardHome"));

// Wallet pages
const WalletDeposit = React.lazy(() => import("@/pages/dashboard/wallet/WalletDeposit"));
const DepositRecords = React.lazy(() => import("@/pages/dashboard/wallet/DepositRecords"));
const FundDetails = React.lazy(() => import("@/pages/dashboard/wallet/FundDetails"));

// Analytics pages
const AnalyticsPage = React.lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));

// Card management pages
const CardSearch = React.lazy(() => import("@/pages/dashboard/cards/CardSearch"));
const ActivationTasks = React.lazy(() => import("@/pages/dashboard/cards/ActivationTasks"));
const ApplyCard = React.lazy(() => import("@/pages/dashboard/cards/ApplyCard"));

// Merchant Account pages
const AccountInfo = React.lazy(() => import("@/pages/dashboard/merchant/AccountInfo"));
const AccountManagement = React.lazy(() => import("@/pages/dashboard/merchant/AccountManagement"));
const AccountRoles = React.lazy(() => import("@/pages/dashboard/merchant/AccountRoles"));

// Transaction pages
const TransactionsPage = React.lazy(() => import("@/pages/dashboard/transactions/TransactionsPage"));

// Invitation pages
const InvitationList = React.lazy(() => import("@/pages/dashboard/invitation/InvitationList"));
const RebateList = React.lazy(() => import("@/pages/dashboard/invitation/RebateList"));

const DashboardRoutes = () => {
  console.log("DashboardRoutes rendered with LanguageProvider");
  
  return (
    <LanguageProvider>
      <DashboardLayout>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            {/* Home Route */}
            <Route path="" element={<DashboardHome />} />
            
            {/* Wallet Routes */}
            <Route path="wallet/deposit" element={<WalletDeposit />} />
            <Route path="wallet/records" element={<DepositRecords />} />
            <Route path="wallet/funds" element={<FundDetails />} />
            
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
            
            {/* Internal Routes */}
            <Route path="*" element={<DashboardInternalRoutes />} />
          </Routes>
        </Suspense>
      </DashboardLayout>
    </LanguageProvider>
  );
};

export default DashboardRoutes;
