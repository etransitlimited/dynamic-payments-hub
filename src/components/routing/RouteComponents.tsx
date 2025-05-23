
import React, { lazy, Suspense, useEffect, useState, useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import GuestRoute from "./GuestRoute";
import FrontendRoute from "./FrontendRoute";
import BackendRoute from "./BackendRoute";
import { PageLoading } from "./LoadingComponents";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/context/TranslationProvider";

// Lazy load pages for better performance
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const InvitationPage = lazy(() => import("@/pages/InvitationPage"));
const Contact = lazy(() => import("@/pages/frontend/Contact"));
const Terms = lazy(() => import("@/pages/frontend/Terms"));
const Privacy = lazy(() => import("@/pages/frontend/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const FrontendNotFound = lazy(() => import("@/pages/frontend/NotFound"));
const Index = lazy(() => import("@/pages/Index"));

// Layouts
const AuthLayout = lazy(() => import("@/components/auth/AuthLayout"));
const DashboardLayout = lazy(() => import("@/components/dashboard/DashboardLayout"));

// Dashboard pages
const DashboardHome = lazy(() => import("@/pages/dashboard/DashboardHome"));
const AnalyticsPage = lazy(() => import("@/pages/dashboard/analytics/AnalyticsPage"));
const TransactionsPage = lazy(() => import("@/pages/dashboard/transactions/TransactionsPage"));
const TransactionHistoryPage = lazy(() => import("@/pages/dashboard/transactions/TransactionHistoryPage"));

// Wallet pages
const WalletManagement = lazy(() => import("@/pages/dashboard/wallet/WalletDashboard"));
const FundDetails = lazy(() => import("@/pages/dashboard/wallet/FundDetails"));
const DepositRecords = lazy(() => import("@/pages/dashboard/wallet/DepositRecords"));
const WalletDeposit = lazy(() => import("@/pages/dashboard/wallet/WalletDeposit"));
const WalletWithdraw = lazy(() => import("@/pages/dashboard/wallet/WalletWithdraw"));
const FinancialCalendar = lazy(() => import("@/pages/dashboard/wallet/FinancialCalendar"));
const FinancialReports = lazy(() => import("@/pages/dashboard/wallet/FinancialReports"));

// Cards pages
const CardManagementPage = lazy(() => import("@/pages/dashboard/cards/CardManagementPage"));
const CardActivationTasksPage = lazy(() => import("@/pages/dashboard/cards/CardActivationTasksPage"));
const CardApplicationPage = lazy(() => import("@/pages/dashboard/cards/CardApplicationPage"));

// Merchant pages
const AccountSettings = lazy(() => import("@/pages/dashboard/merchant/AccountManagement"));
const AccountInfo = lazy(() => import("@/pages/dashboard/merchant/AccountInfo"));
const AccountRoles = lazy(() => import("@/pages/dashboard/merchant/AccountRoles"));

// Invitation pages
const InvitationManagement = lazy(() => import("@/pages/dashboard/invitation/InvitationList"));
const RebateManagement = lazy(() => import("@/pages/dashboard/invitation/RebateList"));

// 导入通知模块的路由
import getNotificationRoutes from "@/modules/notification/routes";

const RouteComponents = () => {
  const { isLoggedIn, isLoading, forceRefresh } = useAuth();
  const { language } = useLanguage(); 
  const { isChangingLanguage } = useTranslation();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const isInitialLoadRef = useRef(true);
  const [isChangingRoute, setIsChangingRoute] = useState(false);
  const changeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const authTokenRef = useRef<string | null>(null);
  const authCheckedRef = useRef(false);

  // CRITICAL FIX: Preserve auth token across language changes
  useEffect(() => {
    // Store auth token when component mounts
    const token = localStorage.getItem('authToken');
    if (token) {
      authTokenRef.current = token;
      authCheckedRef.current = true;
    } else {
      // Try to restore from session storage
      const sessionToken = sessionStorage.getItem('tempAuthToken');
      if (sessionToken) {
        console.log("RouteComponents: Found token in session storage, restoring");
        localStorage.setItem('authToken', sessionToken);
        authTokenRef.current = sessionToken;
        authCheckedRef.current = true;
      }
    }
    
    // Check token periodically
    const checkToken = () => {
      const currentToken = localStorage.getItem('authToken');
      if (!currentToken && authTokenRef.current) {
        console.log("RouteComponents: Auth token lost, restoring");
        localStorage.setItem('authToken', authTokenRef.current);
        forceRefresh();
      } else if (currentToken && currentToken !== authTokenRef.current) {
        console.log("RouteComponents: Auth token changed");
        authTokenRef.current = currentToken;
      }
    };
    
    // Check token periodically
    const interval = setInterval(checkToken, 500);
    
    return () => {
      clearInterval(interval);
    };
  }, [forceRefresh]);

  // CRITICAL FIX: Restore token during language changes
  useEffect(() => {
    if (isChangingLanguage) {
      console.log("RouteComponents: Language changing, preserving auth token");
      const token = localStorage.getItem('authToken') || authTokenRef.current;
      if (token) {
        // Save to both ref and session storage
        authTokenRef.current = token;
        sessionStorage.setItem('tempAuthToken', token);
      }
    } else if (!isChangingLanguage) {
      // After language change, restore token if needed
      const currentToken = localStorage.getItem('authToken');
      
      if (!currentToken) {
        if (authTokenRef.current) {
          console.log("RouteComponents: Restoring auth token from memory reference");
          localStorage.setItem('authToken', authTokenRef.current);
          forceRefresh();
        } 
        
        // Also check session storage as backup
        const sessionToken = sessionStorage.getItem('tempAuthToken');
        if (sessionToken && !currentToken) {
          console.log("RouteComponents: Restoring auth token from session storage");
          localStorage.setItem('authToken', sessionToken);
          forceRefresh();
        }
      }
    }
  }, [isChangingLanguage, forceRefresh]);

  useEffect(() => {
    console.log("==== ROUTE COMPONENTS MOUNTED OR UPDATED ====");
    console.log("RouteComponents: Current path:", location.pathname);
    console.log("RouteComponents: Auth state:", { isLoggedIn, isLoading });
    console.log("RouteComponents: Current language:", language);
    console.log("RouteComponents: Language changing:", isChangingLanguage);
    console.log("RouteComponents: Token in localStorage:", !!localStorage.getItem('authToken'));
    console.log("RouteComponents: Token in sessionStorage:", !!sessionStorage.getItem('tempAuthToken'));
    console.log("RouteComponents: Token in memory:", !!authTokenRef.current);
    
    if (prevPathRef.current !== location.pathname) {
      console.log(`Path changed from ${prevPathRef.current} to ${location.pathname}`);
      prevPathRef.current = location.pathname;
      
      if (location.pathname.startsWith('/dashboard') && !isLoggedIn && !isLoading && !isChangingLanguage) {
        console.log("Navigating to protected route, refreshing auth state");
        forceRefresh();
      }
      
      setIsChangingRoute(true);
      
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
      }
      
      changeTimeoutRef.current = setTimeout(() => {
        setIsChangingRoute(false);
        isInitialLoadRef.current = false;
      }, 300);
    }
    
    return () => {
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
      }
    };
  }, [location.pathname, isLoggedIn, isLoading, forceRefresh, language, isChangingLanguage]);

  // Generate a stable key that changes only when language changes
  const routeKey = React.useMemo(() => 
    `routes-${isInitialLoadRef.current ? 'initial' : 'updated'}-${language}-${Date.now()}`, 
  [language]);

  // Check and restore auth token one more time before rendering
  useEffect(() => {
    if (!localStorage.getItem('authToken') && !isChangingLanguage && !authCheckedRef.current) {
      const sessionToken = sessionStorage.getItem('tempAuthToken');
      if (sessionToken) {
        console.log("RouteComponents: Last chance to restore token before rendering");
        localStorage.setItem('authToken', sessionToken);
        setTimeout(() => forceRefresh(), 100);
      } else if (authTokenRef.current) {
        console.log("RouteComponents: Last chance to restore token from memory");
        localStorage.setItem('authToken', authTokenRef.current);
        setTimeout(() => forceRefresh(), 100);
      }
    }
    authCheckedRef.current = true;
  }, [isChangingLanguage, forceRefresh]);

  if (isLoading && isInitialLoadRef.current && !isChangingLanguage) {
    console.log("RouteComponents: Auth is loading, showing loading page");
    return <PageLoading />;
  }

  // 获取通知路由配置
  const notificationRoutes = getNotificationRoutes(language);

  return (
    <Suspense fallback={<PageLoading />}>
      <Routes key={routeKey}>
        <Route path="/" element={<Index />} />
        
        {/* 添加支持语言前缀的前端主页路由 */}
        <Route path="/:lang" element={<Index />} />
        
        {/* Guest routes - accessible when not logged in */}
        <Route element={<GuestRoute isLoggedIn={isLoggedIn} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/invitation/:token" element={<InvitationPage />} />
            {/* 添加带语言前缀的登录页面路由 */}
            <Route path="/:lang/login" element={<Login />} />
            <Route path="/:lang/register" element={<Register />} />
            <Route path="/:lang/forgot-password" element={<ForgotPassword />} />
            <Route path="/:lang/reset-password/:token" element={<ResetPassword />} />
            <Route path="/:lang/invitation/:token" element={<InvitationPage />} />
          </Route>
        </Route>

        {/* Frontend routes - accessible regardless of auth state */}
        <Route element={<FrontendRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* 添加带语言前缀的前端路由 */}
          <Route path="/:lang/contact" element={<Contact />} />
          <Route path="/:lang/terms" element={<Terms />} />
          <Route path="/:lang/privacy" element={<Privacy />} />
        </Route>

        {/* Backend routes - only accessible when logged in */}
        <Route element={<BackendRoute isLoggedIn={isLoggedIn} />}>
          <Route element={<DashboardLayout />}>
            {/* 不带语言前缀的路由 */}
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard/transactions" element={<TransactionsPage />} />
            <Route path="/dashboard/transactions/history" element={<TransactionHistoryPage />} />
            
            {/* 带语言前缀的路由 */}
            <Route path="/:lang/dashboard" element={<DashboardHome />} />
            <Route path="/:lang/dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="/:lang/dashboard/transactions" element={<TransactionsPage />} />
            <Route path="/:lang/dashboard/transactions/history" element={<TransactionHistoryPage />} />
            
            {/* 关键修复: 确保根据当前语言正确添加通知路由 */}
            {notificationRoutes.map((route, index) => (
              <Route
                key={`notification-route-${index}`}
                path={route.path}
                element={route.element}
              />
            ))}
            
            {/* 不带语言前缀的钱包路由 */}
            <Route path="/dashboard/wallet" element={<Navigate to="/dashboard/wallet/management" replace />} />
            <Route path="/dashboard/wallet/management" element={<WalletManagement />} />
            <Route path="/dashboard/wallet/fund-details" element={<FundDetails />} />
            <Route path="/dashboard/wallet/deposit-records" element={<DepositRecords />} />
            <Route path="/dashboard/wallet/deposit" element={<WalletDeposit />} />
            <Route path="/dashboard/wallet/withdraw" element={<WalletWithdraw />} />
            <Route path="/dashboard/wallet/financial-calendar" element={<FinancialCalendar />} />
            <Route path="/dashboard/wallet/financial-reports" element={<FinancialReports />} />
            
            {/* 带语言前缀的钱包路由 */}
            <Route path="/:lang/dashboard/wallet" element={<Navigate to={`/${language}/dashboard/wallet/management`} replace />} />
            <Route path="/:lang/dashboard/wallet/management" element={<WalletManagement />} />
            <Route path="/:lang/dashboard/wallet/fund-details" element={<FundDetails />} />
            <Route path="/:lang/dashboard/wallet/deposit-records" element={<DepositRecords />} />
            <Route path="/:lang/dashboard/wallet/deposit" element={<WalletDeposit />} />
            <Route path="/:lang/dashboard/wallet/withdraw" element={<WalletWithdraw />} />
            <Route path="/:lang/dashboard/wallet/financial-calendar" element={<FinancialCalendar />} />
            <Route path="/:lang/dashboard/wallet/financial-reports" element={<FinancialReports />} />
            
            {/* 不带语言前缀的卡片路由 */}
            <Route path="/dashboard/cards" element={<Navigate to="/dashboard/cards/management" replace />} />
            <Route path="/dashboard/cards/management" element={<CardManagementPage />} />
            <Route path="/dashboard/cards/activation-tasks" element={<CardActivationTasksPage />} />
            <Route path="/dashboard/cards/apply" element={<CardApplicationPage />} />
            
            {/* 带语言前缀的卡片路由 */}
            <Route path="/:lang/dashboard/cards" element={<Navigate to={`/${language}/dashboard/cards/management`} replace />} />
            <Route path="/:lang/dashboard/cards/management" element={<CardManagementPage />} />
            <Route path="/:lang/dashboard/cards/activation-tasks" element={<CardActivationTasksPage />} />
            <Route path="/:lang/dashboard/cards/apply" element={<CardApplicationPage />} />
            
            {/* 不带语言前缀的商户路由 */}
            <Route path="/dashboard/merchant" element={<Navigate to="/dashboard/account/info" replace />} />
            <Route path="/dashboard/merchant/account-settings" element={<AccountSettings />} />
            <Route path="/dashboard/merchant/account-info" element={<AccountInfo />} />
            <Route path="/dashboard/merchant/account-roles" element={<AccountRoles />} />
            
            {/* 带语言前缀的商户路由 */}
            <Route path="/:lang/dashboard/merchant" element={<Navigate to={`/${language}/dashboard/account/info`} replace />} />
            <Route path="/:lang/dashboard/merchant/account-settings" element={<AccountSettings />} />
            <Route path="/:lang/dashboard/merchant/account-info" element={<AccountInfo />} />
            <Route path="/:lang/dashboard/merchant/account-roles" element={<AccountRoles />} />
            
            {/* 不带语言前缀的邀请路由 */}
            <Route path="/dashboard/invitation" element={<Navigate to="/dashboard/invitation/list" replace />} />
            <Route path="/dashboard/invitation/management" element={<InvitationManagement />} />
            <Route path="/dashboard/invitation/rebate-management" element={<RebateManagement />} />
            
            {/* 带语言前缀的邀请路由 */}
            <Route path="/:lang/dashboard/invitation" element={<Navigate to={`/${language}/dashboard/invitation/list`} replace />} />
            <Route path="/:lang/dashboard/invitation/management" element={<InvitationManagement />} />
            <Route path="/:lang/dashboard/invitation/rebate-management" element={<RebateManagement />} />
            
            {/* 路由别名映射 - 不带语言前缀 */}
            <Route path="/dashboard/cards/search" element={<Navigate to="/dashboard/cards/management" replace />} />
            <Route path="/dashboard/cards/activation" element={<Navigate to="/dashboard/cards/activation-tasks" replace />} />
            <Route path="/dashboard/wallet/records" element={<Navigate to="/dashboard/wallet/deposit-records" replace />} />
            <Route path="/dashboard/wallet/funds" element={<Navigate to="/dashboard/wallet/fund-details" replace />} />
            <Route path="/dashboard/account" element={<Navigate to="/dashboard/merchant/account-info" replace />} />
            <Route path="/dashboard/account/info" element={<Navigate to="/dashboard/merchant/account-info" replace />} />
            <Route path="/dashboard/account/management" element={<Navigate to="/dashboard/merchant/account-settings" replace />} />
            <Route path="/dashboard/account/roles" element={<Navigate to="/dashboard/merchant/account-roles" replace />} />
            <Route path="/dashboard/invitation/list" element={<Navigate to="/dashboard/invitation/management" replace />} />
            <Route path="/dashboard/invitation/rebate" element={<Navigate to="/dashboard/invitation/rebate-management" replace />} />
            <Route path="/dashboard/invitation/rebate-list" element={<Navigate to="/dashboard/invitation/rebate-management" replace />} />
            
            {/* 路由别名映射 - 带语言前缀 */}
            <Route path="/:lang/dashboard/cards/search" element={<Navigate to={`/${language}/dashboard/cards/management`} replace />} />
            <Route path="/:lang/dashboard/cards/activation" element={<Navigate to={`/${language}/dashboard/cards/activation-tasks`} replace />} />
            <Route path="/:lang/dashboard/wallet/records" element={<Navigate to={`/${language}/dashboard/wallet/deposit-records`} replace />} />
            <Route path="/:lang/dashboard/wallet/funds" element={<Navigate to={`/${language}/dashboard/wallet/fund-details`} replace />} />
            <Route path="/:lang/dashboard/account" element={<Navigate to={`/${language}/dashboard/merchant/account-info`} replace />} />
            <Route path="/:lang/dashboard/account/info" element={<Navigate to={`/${language}/dashboard/merchant/account-info`} replace />} />
            <Route path="/:lang/dashboard/account/management" element={<Navigate to={`/${language}/dashboard/merchant/account-settings`} replace />} />
            <Route path="/:lang/dashboard/account/roles" element={<Navigate to={`/${language}/dashboard/merchant/account-roles`} replace />} />
            <Route path="/:lang/dashboard/invitation/list" element={<Navigate to={`/${language}/dashboard/invitation/management`} replace />} />
            <Route path="/:lang/dashboard/invitation/rebate" element={<Navigate to={`/${language}/dashboard/invitation/rebate-management`} replace />} />
            <Route path="/:lang/dashboard/invitation/rebate-list" element={<Navigate to={`/${language}/dashboard/invitation/rebate-management`} replace />} />
            
            {/* 通配符重定向 - 不带语言前缀和带语言前缀 */}
            <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/:lang/dashboard/*" element={<Navigate to={`/${language}/dashboard`} replace />} />
          </Route>
        </Route>

        {/* 404 路由 - 前端和后端分别使用不同的 404 页面 */}
        <Route path="/404" element={<NotFound />} />
        <Route path="/:lang/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default RouteComponents;
