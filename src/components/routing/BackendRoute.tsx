
import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

interface BackendRouteProps {
  isLoggedIn?: boolean;
}

const BackendRoute: React.FC<BackendRouteProps> = ({ isLoggedIn: propIsLoggedIn }) => {
  const location = useLocation();
  const lastPathRef = useRef(location.pathname);
  const { isLoggedIn: authIsLoggedIn, isLoading } = useAuth();
  
  // 使用 prop 或 auth hook 的登录状态
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : authIsLoggedIn;
  
  // 记录路由变化
  useEffect(() => {
    if (lastPathRef.current !== location.pathname) {
      console.log(`BackendRoute: Path changed from ${lastPathRef.current} to ${location.pathname}`);
      lastPathRef.current = location.pathname;
    }
  }, [location.pathname]);
  
  // 为开发和测试，允许绕过认证
  if (process.env.NODE_ENV !== 'production' && 
      (location.search.includes('bypass=auth') || localStorage.getItem('bypassAuth'))) {
    console.log("BackendRoute: Auth bypass detected, allowing access to protected route");
    return <Outlet />;
  }
  
  // 如果正在加载认证状态，显示加载中
  if (isLoading) {
    console.log("BackendRoute: Auth is loading, waiting for auth state");
    return (
      <div className="flex h-screen items-center justify-center bg-charcoal">
        <div className="text-white">Loading authentication...</div>
      </div>
    );
  }
  
  // 如果用户未登录，重定向到登录页面并传递 returnTo 路径
  if (!isLoggedIn) {
    console.log(`BackendRoute: User not authenticated, redirecting to login with returnTo: ${location.pathname}`);
    
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location.pathname, timestamp: Date.now() }}
      />
    );
  }
  
  // 用户已登录，显示受保护的内容
  console.log("BackendRoute: User is authenticated, showing protected content");
  return <Outlet />;
};

export default BackendRoute;
