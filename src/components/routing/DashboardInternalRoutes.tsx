
import React, { Suspense, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { DashboardLoading } from "@/components/routing/LoadingComponents";
import { usePerformance } from "@/hooks/use-performance";

// Enhanced lazy loading with error handling and loading events
const enhancedLazy = (importFn: () => Promise<any>, name: string) => {
  return React.lazy(() => 
    importFn()
      .then(module => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Route Loaded] ${name}`);
        }
        return module;
      })
      .catch(err => {
        console.error(`Error loading route component ${name}:`, err);
        // Return a minimal error component
        return { 
          default: () => (
            <div className="p-6 text-red-500">
              <h2 className="text-xl font-bold">Failed to load {name}</h2>
              <p>Please try refreshing the page.</p>
            </div>
          )
        };
      })
  );
};

// Analytics & Transactions pages
const AnalyticsPage = enhancedLazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"), "Analytics");
const TransactionsPage = enhancedLazy(() => import("@/pages/dashboard/transactions/TransactionsPage"), "Transactions");

// Wallet pages
const WalletDeposit = enhancedLazy(() => import("@/pages/dashboard/wallet/WalletDeposit"), "Wallet Deposit");
const DepositRecords = enhancedLazy(() => import("@/pages/dashboard/wallet/DepositRecords"), "Deposit Records");
const FundDetails = enhancedLazy(() => import("@/pages/dashboard/wallet/FundDetails"), "Fund Details");

// Card pages
const CardSearch = enhancedLazy(() => import("@/pages/dashboard/cards/CardSearch"), "Card Search");
const ActivationTasks = enhancedLazy(() => import("@/pages/dashboard/cards/ActivationTasks"), "Activation Tasks");
const ApplyCard = enhancedLazy(() => import("@/pages/dashboard/cards/ApplyCard"), "Apply Card");

// Merchant pages
const AccountManagement = enhancedLazy(() => import("@/pages/dashboard/merchant/AccountManagement"), "Account Management");
const AccountInfo = enhancedLazy(() => import("@/pages/dashboard/merchant/AccountInfo"), "Account Info");
const AccountRoles = enhancedLazy(() => import("@/pages/dashboard/merchant/AccountRoles"), "Account Roles");

// Invitation pages
const InvitationList = enhancedLazy(() => import("@/pages/dashboard/invitation/InvitationList"), "Invitation List");
const RebateList = enhancedLazy(() => import("@/pages/dashboard/invitation/RebateList"), "Rebate List");

// Custom suspense boundary with enhanced loading state
const RouteSuspense = ({ children }: { children: React.ReactNode }) => {
  const { performanceTier } = usePerformance();
  
  // For low-end devices, use a simpler loading indicator to reduce strain
  const loadingIndicator = performanceTier === 'low' 
    ? <div className="p-8 text-center text-blue-400">Loading...</div>
    : <DashboardLoading />;
  
  return <Suspense fallback={loadingIndicator}>{children}</Suspense>;
};

// Route prefetching logic
const RoutePrefetcher = () => {
  const location = useLocation();
  const { performanceTier } = usePerformance();
  
  useEffect(() => {
    // Skip prefetching for low-performance devices
    if (performanceTier === 'low') return;
    
    // Intelligent prefetching based on current route
    const prefetchNextRoutes = setTimeout(() => {
      if (location.pathname.includes('/dashboard/analytics')) {
        // User is viewing analytics, they might check transactions next
        import("@/pages/dashboard/transactions/TransactionsPage");
      } else if (location.pathname.includes('/dashboard/wallet')) {
        // In wallet section, prefetch related wallet pages
        if (location.pathname.includes('/deposit')) {
          import("@/pages/dashboard/wallet/DepositRecords");
        } else if (location.pathname.includes('/records')) {
          import("@/pages/dashboard/wallet/FundDetails");
        }
      } else if (location.pathname.includes('/dashboard/cards')) {
        // In cards section, prefetch related card pages
        if (location.pathname.includes('/search')) {
          import("@/pages/dashboard/cards/ActivationTasks");
        } else if (location.pathname.includes('/activation')) {
          import("@/pages/dashboard/cards/ApplyCard");
        }
      }
    }, 2000); // Delay to ensure current page loads first
    
    return () => clearTimeout(prefetchNextRoutes);
  }, [location.pathname, performanceTier]);
  
  return null; // This component doesn't render anything
};

const DashboardInternalRoutes = () => {
  return (
    <RouteSuspense>
      {/* Invisible component for route prefetching */}
      <RoutePrefetcher />
      
      <Routes>
        {/* Analytics & Transactions Routes */}
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        
        {/* Wallet Routes */}
        <Route path="wallet" element={<Navigate to="/dashboard/wallet/deposit" replace />} />
        <Route path="wallet/deposit" element={<WalletDeposit />} />
        <Route path="wallet/records" element={<DepositRecords />} />
        <Route path="wallet/deposit-records" element={<DepositRecords />} />
        <Route path="wallet/fund-details" element={<FundDetails />} />
        <Route path="wallet/funds" element={<FundDetails />} />
        
        {/* Card Management Routes */}
        <Route path="cards" element={<Navigate to="/dashboard/cards/search" replace />} />
        <Route path="cards/search" element={<CardSearch />} />
        <Route path="cards/activation" element={<ActivationTasks />} />
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
    </RouteSuspense>
  );
};

export default DashboardInternalRoutes;
