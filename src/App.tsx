
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, lazy, Suspense, useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import HreflangTags from "@/components/seo/HreflangTags";
import { useSEO } from "@/utils/seo";

// Lazy load pages for better code splitting
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Dashboard pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));

// Wallet pages
const WalletDeposit = lazy(() => import("./pages/dashboard/wallet/WalletDeposit"));

// Card pages
const CardSearch = lazy(() => import("./pages/dashboard/cards/CardSearch"));

// Merchant pages
const AccountManagement = lazy(() => import("./pages/dashboard/merchant/AccountManagement"));

// Invitation pages
const InvitationList = lazy(() => import("./pages/dashboard/invitation/InvitationList"));

// Page loading component
const PageLoading = () => (
  <div className="min-h-screen bg-[#061428] p-4">
    <Skeleton className="w-full h-20 bg-blue-900/10 rounded-lg mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="w-full h-60 bg-blue-900/10 rounded-lg" />
      <Skeleton className="w-full h-60 bg-blue-900/10 rounded-lg" />
    </div>
  </div>
);

// Dashboard loading component
const DashboardLoading = () => (
  <div className="min-h-screen bg-slate-50 p-4">
    <Skeleton className="w-full h-16 bg-slate-200 rounded-lg mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <Skeleton className="w-full h-28 bg-slate-200 rounded-lg" />
      <Skeleton className="w-full h-28 bg-slate-200 rounded-lg" />
      <Skeleton className="w-full h-28 bg-slate-200 rounded-lg" />
      <Skeleton className="w-full h-28 bg-slate-200 rounded-lg" />
    </div>
    <Skeleton className="w-full h-80 bg-slate-200 rounded-lg" />
  </div>
);

// ScrollToTop component to reset scroll position on page changes
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

// SEO Handler component
const SEOHandler = () => {
  const location = useLocation();
  const { language } = useLanguage();
  
  useEffect(() => {
    // Set the language attribute on the html element
    document.documentElement.lang = language;
  }, [location.pathname, language]);
  
  // Initialize SEO for the current page
  useSEO();
  
  return null;
};

// Wrapper for components that need router context
const RouterComponents = () => {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <SEOHandler />
      <HreflangTags />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={
              <Suspense fallback={<DashboardLoading />}>
                <DashboardHome />
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
                <div className="p-4">充值记录页面</div>
              </Suspense>
            } />
            <Route path="wallet/fund-details" element={
              <Suspense fallback={<DashboardLoading />}>
                <div className="p-4">资金明细页面</div>
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
                <div className="p-4">开卡任务页面</div>
              </Suspense>
            } />
            <Route path="cards/apply" element={
              <Suspense fallback={<DashboardLoading />}>
                <div className="p-4">申请卡片页面</div>
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
                <div className="p-4">帐号信息页面</div>
              </Suspense>
            } />
            <Route path="merchant/account-roles" element={
              <Suspense fallback={<DashboardLoading />}>
                <div className="p-4">账户角色页面</div>
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
                <div className="p-4">返点列表页面</div>
              </Suspense>
            } />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </LanguageProvider>
  );
};

function App() {
  // Configure QueryClient with performance optimizations
  const [queryClient] = useState(() => 
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime with gcTime)
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouterComponents />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
