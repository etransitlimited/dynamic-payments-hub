
import React, { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/context/TranslationProvider";

interface GuestRouteProps {
  isLoggedIn?: boolean;
}

// GuestRoute 仅在未登录时可访问
const GuestRoute: React.FC<GuestRouteProps> = ({ isLoggedIn: propIsLoggedIn }) => {
  const location = useLocation();
  const { isLoggedIn: authIsLoggedIn, isLoading, forceRefresh } = useAuth();
  const { language } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  const [canRedirect, setCanRedirect] = useState(true);
  const redirectInProgressRef = useRef(false);
  const mountedRef = useRef(true);
  const authCheckedRef = useRef(false);
  const lastLanguageRef = useRef<string>(language);
  const languageChangeTimeRef = useRef<number>(0);
  const initialCheckRef = useRef(true);
  const languageStabilityWaitPeriod = 2500; // 增加到2500ms
  
  // 使用传入属性或认证钩子的登录状态
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : authIsLoggedIn;
  
  // 获取重定向目标（来自位置状态或默认为仪表板）
  const from = location.state?.from || "/dashboard";
  
  useEffect(() => {
    mountedRef.current = true;
    
    // 挂载时强制刷新一次身份验证状态
    forceRefresh();
    
    return () => {
      mountedRef.current = false;
    };
  }, [forceRefresh]);

  // 修复：关键 - 在语言变更期间保持令牌在localStorage和sessionStorage中
  useEffect(() => {
    // 在语言变更期间，保留身份验证状态
    if (isChangingLanguage) {
      // 在语言更改期间将令牌保存到sessionStorage作为备份
      const token = localStorage.getItem('authToken');
      if (token) {
        console.log("GuestRoute: 语言更改期间备份认证token");
        sessionStorage.setItem('tempAuthToken', token);
      }
      
      // 记录语言更改时间
      languageChangeTimeRef.current = Date.now();
    } else if (sessionStorage.getItem('tempAuthToken')) {
      // 语言更改完成后，如果需要恢复令牌
      const tempToken = sessionStorage.getItem('tempAuthToken');
      const currentToken = localStorage.getItem('authToken');
      
      if (tempToken && (!currentToken || tempToken !== currentToken)) {
        console.log("GuestRoute: 语言更改后恢复认证token");
        localStorage.setItem('authToken', tempToken);
        // 强制刷新身份验证状态
        forceRefresh();
      }
    }
  }, [isChangingLanguage, forceRefresh]);
  
  // 在语言变更期间阻止重定向
  useEffect(() => {
    if (isChangingLanguage) {
      setCanRedirect(false);
      languageChangeTimeRef.current = Date.now();
      console.log("GuestRoute: 语言正在更改，阻止重定向");
      
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          setCanRedirect(true);
          console.log("GuestRoute: 语言更改已稳定，启用重定向");
        }
      }, languageStabilityWaitPeriod); // 增加到2500ms以提高稳定性
      
      return () => clearTimeout(timer);
    }
  }, [isChangingLanguage]);
  
  // 当语言变更时，更新引用并阻止重定向
  useEffect(() => {
    if (language !== lastLanguageRef.current) {
      console.log(`GuestRoute: 语言从${lastLanguageRef.current}变为${language}`);
      lastLanguageRef.current = language as string;
      languageChangeTimeRef.current = Date.now();
      
      setCanRedirect(false);
      
      // 在语言变更稳定后重置重定向状态
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          redirectInProgressRef.current = false;
          setCanRedirect(true);
          console.log("GuestRoute: 语言变更已稳定，重新启用重定向");
        }
      }, languageStabilityWaitPeriod);
      
      return () => clearTimeout(timer);
    }
  }, [language]);
  
  // 调试日志
  useEffect(() => {
    if (initialCheckRef.current || isLoggedIn !== undefined) {
      console.log(`GuestRoute: 路径: ${location.pathname}, 登录状态: ${isLoggedIn}, 加载中: ${isLoading}, 可重定向: ${canRedirect}`);
      console.log(`GuestRoute: 如果已登录，重定向目标: ${from}, 语言变更中: ${isChangingLanguage}`);
      console.log(`GuestRoute: 语言: ${language}, 上一语言: ${lastLanguageRef.current}`);
      initialCheckRef.current = false;
    }
  }, [location.pathname, isLoggedIn, isLoading, from, canRedirect, isChangingLanguage, language]);

  // 在开发模式下始终允许访问进行测试
  if (process.env.NODE_ENV === 'development' && location.search.includes('bypass=guest')) {
    console.log("GuestRoute: 开发模式绕过 - 允许访问认证页面");
    return <Outlet />;
  }

  // 如果身份验证正在加载或初始渲染时，等待
  if ((isLoading && !authCheckedRef.current) || initialCheckRef.current) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-950">
        <div className="text-white">正在检查认证状态...</div>
      </div>
    );
  }
  
  // 标记身份验证已检查
  authCheckedRef.current = true;

  // 关键：在语言变更期间和变更后短时间内跳过重定向
  if (isChangingLanguage || (Date.now() - languageChangeTimeRef.current < languageStabilityWaitPeriod)) {
    console.log("GuestRoute: 语言最近改变，延迟重定向决定");
    return <Outlet />; 
  }

  // 关键：语言更改完成后，检查是否需要恢复认证
  if (!isLoggedIn && !isChangingLanguage && sessionStorage.getItem('tempAuthToken')) {
    console.log("GuestRoute: 检测到可能的令牌，尝试恢复认证");
    // 尝试恢复身份验证
    const tempToken = sessionStorage.getItem('tempAuthToken');
    if (tempToken) {
      localStorage.setItem('authToken', tempToken);
      // 强制刷新身份验证状态
      forceRefresh();
    }
  }

  // 如果用户已登录，重定向到仪表板或请求的页面
  // 但仅在语言不变更时重定向一次，以防止循环
  if (isLoggedIn && !redirectInProgressRef.current && mountedRef.current && 
      canRedirect && !isChangingLanguage) {
    console.log(`GuestRoute: 用户已认证，重定向到${from}`);
    redirectInProgressRef.current = true;
    return <Navigate to={from} replace />;
  }
  
  // 用户未登录，显示访客内容（登录/注册表单）
  console.log("GuestRoute: 用户未认证，显示登录表单");
  redirectInProgressRef.current = false;
  return <Outlet />;
};

export default GuestRoute;
