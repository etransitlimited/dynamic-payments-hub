
import React, { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/context/TranslationProvider";

interface BackendRouteProps {
  isLoggedIn?: boolean;
}

// BackendRoute 仅在登录时可访问
const BackendRoute: React.FC<BackendRouteProps> = ({ isLoggedIn: propIsLoggedIn }) => {
  const location = useLocation();
  const { isLoggedIn: authIsLoggedIn, isLoading } = useAuth();
  const { language } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  const [canRedirect, setCanRedirect] = useState(true);
  const redirectInProgressRef = useRef(false);
  const lastPathRef = useRef<string | null>(null);
  const mountedRef = useRef(true);
  const authCheckedRef = useRef(false);
  const languageChangeTimeRef = useRef<number>(0);
  const initialCheckRef = useRef(true);
  const languageStabilityWaitPeriod = 2500; // 增加到2500ms

  // 使用传入属性或认证钩子的登录状态
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : authIsLoggedIn;
  
  // 跟踪挂载状态
  useEffect(() => {
    mountedRef.current = true;
    // 尝试从存储中获取上一个路径（用于语言更改还原）
    const storedPath = localStorage.getItem('lastPath');
    if (storedPath) {
      lastPathRef.current = storedPath;
    }
    
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // 修复：关键 - 在语言变更期间保持令牌在localStorage和sessionStorage中
  useEffect(() => {
    // 在语言变更期间，保留身份验证状态
    if (isChangingLanguage) {
      // 首先存储当前路径
      if (location.pathname) {
        localStorage.setItem('lastPath', location.pathname);
      }
      
      // 在语言更改期间将令牌保存到sessionStorage作为备份
      const token = localStorage.getItem('authToken');
      if (token) {
        console.log("BackendRoute: 语言更改期间备份认证token");
        sessionStorage.setItem('tempAuthToken', token);
      }
      
      // 记录语言更改时间
      languageChangeTimeRef.current = Date.now();
    } else if (sessionStorage.getItem('tempAuthToken')) {
      // 语言更改完成后，如果需要恢复令牌
      const tempToken = sessionStorage.getItem('tempAuthToken');
      const currentToken = localStorage.getItem('authToken');
      
      if (tempToken && (!currentToken || tempToken !== currentToken)) {
        console.log("BackendRoute: 语言更改后恢复认证token");
        localStorage.setItem('authToken', tempToken);
      }
    }
  }, [isChangingLanguage, location.pathname]);

  // 在语言变更期间阻止重定向
  useEffect(() => {
    if (isChangingLanguage) {
      setCanRedirect(false);
      console.log("BackendRoute: 语言正在更改，阻止重定向");
      
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          setCanRedirect(true);
          console.log("BackendRoute: 语言更改已稳定，启用重定向");
        }
      }, languageStabilityWaitPeriod); // 增加至2500ms以提高稳定性
      
      return () => clearTimeout(timer);
    }
  }, [isChangingLanguage]);

  // 调试日志
  useEffect(() => {
    if (initialCheckRef.current || isLoggedIn !== undefined) {
      console.log(`BackendRoute: 路径: ${location.pathname}, 登录状态: ${isLoggedIn}, 加载中: ${isLoading}, 可重定向: ${canRedirect}`);
      console.log(`BackendRoute: 语言: ${language}, 变更中: ${isChangingLanguage}`);
      initialCheckRef.current = false;
    }
  }, [location.pathname, isLoggedIn, isLoading, language, canRedirect, isChangingLanguage]);

  // 如果处于开发模式且有绕过参数，允许访问
  if (process.env.NODE_ENV === 'development' && location.search.includes('bypass=auth')) {
    return <Outlet />;
  }

  // 当身份验证正在加载或初始渲染时，等待
  if ((isLoading && !authCheckedRef.current) || initialCheckRef.current) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-950">
        <div className="text-white">正在检查认证状态...</div>
      </div>
    );
  }

  // 关键：在语言变更期间和变更后短时间内跳过重定向
  if (isChangingLanguage || (Date.now() - languageChangeTimeRef.current < languageStabilityWaitPeriod)) {
    console.log("BackendRoute: 语言最近改变，延迟重定向决定");
    authCheckedRef.current = true;
    return <Outlet />; 
  }

  // 关键：语言更改完成后，检查是否需要恢复认证
  if (!isLoggedIn && !isChangingLanguage && sessionStorage.getItem('tempAuthToken')) {
    console.log("BackendRoute: 检测到语言变更，尝试恢复认证");
    // 等待以避免重定向，outlet将继续显示当前内容
    return <Outlet />;
  }

  // 如果用户未登录，重定向到登录页面
  if (!isLoggedIn && canRedirect && !redirectInProgressRef.current && !isChangingLanguage) {
    console.log("BackendRoute: 用户未认证，重定向到登录页面");
    redirectInProgressRef.current = true;
    
    // 重定向前存储当前路径
    if (location.pathname) {
      localStorage.setItem('lastPath', location.pathname);
    }
    
    // 将当前位置传递给重定向，以便在登录后返回
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // 用户已登录或语言正在更改，显示后端内容
  authCheckedRef.current = true;
  redirectInProgressRef.current = false;
  return <Outlet />;
};

export default BackendRoute;
