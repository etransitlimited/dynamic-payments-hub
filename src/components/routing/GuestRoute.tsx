
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

interface GuestRouteProps {
  isLoggedIn?: boolean;
}

// GuestRoute 是仅在未登录时才能访问的路由
const GuestRoute: React.FC<GuestRouteProps> = ({ isLoggedIn: propIsLoggedIn }) => {
  const location = useLocation();
  const { isLoggedIn: authIsLoggedIn, isLoading } = useAuth();
  
  // 使用 prop 或 auth hook 的登录状态
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : authIsLoggedIn;
  
  // 从 location state 获取重定向目标，如果没有则默认为 dashboard
  const from = location.state?.from || "/dashboard";
  
  useEffect(() => {
    console.log(`GuestRoute: Current path: ${location.pathname}, isLoggedIn: ${isLoggedIn}, isLoading: ${isLoading}`);
    console.log("GuestRoute: Redirect target if logged in:", from);
    console.log("GuestRoute: localStorage token:", localStorage.getItem('authToken'));
  }, [location.pathname, isLoggedIn, isLoading, from]);

  // 在开发模式下始终允许访问以便于测试
  if (process.env.NODE_ENV === 'development' && location.search.includes('bypass=guest')) {
    console.log("GuestRoute: Development mode - allowing access to auth pages");
    return <Outlet />;
  }

  // 如果正在加载认证状态，显示加载组件
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-950">
        <div className="text-white">Checking authentication...</div>
      </div>
    );
  }

  // 如果用户已登录，重定向到 dashboard 或请求的页面
  if (isLoggedIn) {
    console.log(`GuestRoute: User is authenticated, redirecting to ${from}`);
    return <Navigate to={from} replace />;
  }
  
  // 用户未登录，显示访客内容（登录/注册表单）
  console.log("GuestRoute: User is not authenticated, showing login form");
  return <Outlet />;
};

export default GuestRoute;
