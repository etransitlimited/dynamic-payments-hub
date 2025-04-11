
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import LoginFormFields from "./forms/LoginFormFields";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/context/TranslationProvider";

const LoginForm: React.FC = () => {
  const { t } = useSafeTranslation();
  const { language } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  const [canNavigate, setCanNavigate] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();
  const mountedRef = useRef(true);
  const redirectInProgressRef = useRef(false);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastLanguageRef = useRef<string>(language);
  const languageChangeTimeRef = useRef<number>(0);
  const languageStabilityWaitPeriod = 2500; // 增加到2500ms
  const initialCheckRef = useRef(true);
  
  // 从位置状态获取重定向路径，或默认到仪表板
  const from = location.state?.from || "/dashboard";
  
  console.log("LoginForm - 挂载时认证状态:", { isLoggedIn, isLoading });
  console.log("LoginForm - 登录后重定向目标:", from);

  // 跟踪挂载状态以防止内存泄漏
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      // 卸载时清除任何待处理的超时
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  // 在语言变更期间阻止导航
  useEffect(() => {
    if (isChangingLanguage) {
      setCanNavigate(false);
      languageChangeTimeRef.current = Date.now();
      console.log("LoginForm: 语言正在更改，阻止导航");
      
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          setCanNavigate(true);
          console.log("LoginForm: 语言更改已稳定，启用导航");
        }
      }, languageStabilityWaitPeriod);
      
      return () => clearTimeout(timer);
    } else {
      // 仅当语言变更后足够时间过去时才重新启用导航
      const timePassedSinceChange = Date.now() - languageChangeTimeRef.current;
      if (timePassedSinceChange > languageStabilityWaitPeriod && !canNavigate && mountedRef.current) {
        setCanNavigate(true);
      }
    }
  }, [isChangingLanguage, canNavigate]);

  // 当语言变更时重置导航标志以防止冲突
  useEffect(() => {
    if (language !== lastLanguageRef.current) {
      console.log(`LoginForm: 语言从${lastLanguageRef.current}变为${language}`);
      lastLanguageRef.current = language;
      languageChangeTimeRef.current = Date.now();
      
      setCanNavigate(false);
      
      // 在语言变更稳定后重置重定向状态
      setTimeout(() => {
        if (mountedRef.current) {
          redirectInProgressRef.current = false;
          setCanNavigate(true);
          console.log("LoginForm: 语言变更已稳定，导航重新启用");
        }
      }, languageStabilityWaitPeriod);
    }
  }, [language]);

  // 检查会话存储中是否存在认证令牌（来自语言变更）
  useEffect(() => {
    // 语言变更完成后，检查是否需要恢复认证
    if (!isLoggedIn && !isChangingLanguage && sessionStorage.getItem('tempAuthToken')) {
      console.log("LoginForm: 在语言变更后找到保存的认证令牌，正在恢复");
      const tempToken = sessionStorage.getItem('tempAuthToken');
      if (tempToken) {
        localStorage.setItem('authToken', tempToken);
      }
    }
  }, [isLoggedIn, isChangingLanguage]);

  // 如果已登录，重定向到仪表板或原始目标，但仅当不更改语言时
  useEffect(() => {
    // 在语言变更期间和变更后短时间内跳过重定向
    if (isChangingLanguage || Date.now() - languageChangeTimeRef.current < languageStabilityWaitPeriod) {
      return;
    }
    
    if (isLoggedIn && !isLoading && mountedRef.current && !redirectInProgressRef.current && canNavigate) {
      console.log("用户已登录，重定向到:", from);
      redirectInProgressRef.current = true;
      
      // 清除任何现有超时
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      
      // 小延迟以协调语言变更
      redirectTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          navigate(from, { replace: true });
          
          // 导航后重置标志
          setTimeout(() => {
            if (mountedRef.current) {
              redirectInProgressRef.current = false;
            }
          }, 300);
        }
      }, 300);
    }
  }, [isLoggedIn, isLoading, navigate, from, canNavigate, isChangingLanguage]);

  // 通过导航到重定向路径处理成功登录
  const handleLoginSuccess = () => {
    if (!mountedRef.current || !canNavigate) return;
    
    console.log("LoginForm - 登录成功，重定向到:", from);
    redirectInProgressRef.current = true;
    
    // 清除任何现有超时
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }
    
    // 使用轻微延迟以确保认证状态已更新
    redirectTimeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        navigate(from, { replace: true });
        
        // 导航后重置标志
        setTimeout(() => {
          if (mountedRef.current) {
            redirectInProgressRef.current = false;
          }
        }, 500);
      }
    }, 500);
  };

  // 如果仍在检查认证状态，显示简化加载
  if (isLoading) {
    return <div className="flex justify-center py-4"><span className="text-blue-200">加载中...</span></div>;
  }

  return (
    <div className="relative z-10 w-full">
      <LoginFormFields onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginForm;
