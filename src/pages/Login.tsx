
import React, { useEffect, useRef, useMemo, useState } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import AuthFooter from "@/components/auth/AuthFooter";
import { useLocation, useNavigate } from "react-router-dom";
import { useSEO } from "@/utils/seo";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/context/TranslationProvider";
import { useLanguage } from "@/context/LanguageContext";

const Login = () => {
  const { t, language } = useSafeTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { getMetadata } = useSEO({});
  const metadata = useMemo(() => getMetadata(location.pathname, language), [location.pathname, language]);
  const { isLoggedIn } = useAuth();
  const { isChangingLanguage } = useTranslation();
  const [canRedirect, setCanRedirect] = useState(true);
  const returnToPathRef = useRef<string | null>(null);
  const redirectInProgressRef = useRef(false);
  const mountedRef = useRef(true);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastLanguageChangeTimeRef = useRef<number>(0);
  const languageStabilityWaitPeriod = 2500; // 增加到2500ms
  
  // 跟踪组件挂载/卸载以防止内存泄漏
  useEffect(() => {
    mountedRef.current = true;
    console.log("登录页面已挂载，isLoggedIn:", isLoggedIn);
    console.log("登录页面位置状态:", location.state);
    
    return () => {
      mountedRef.current = false;
      // 卸载时清除任何待处理的超时
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);
  
  // 在挂载时，存储returnTo路径以避免在语言变更期间丢失它
  useEffect(() => {
    if (location.state && typeof location.state === 'object' && 'from' in location.state) {
      const fromPath = location.state.from as string;
      console.log(`Login: 存储返回路径: ${fromPath}`);
      returnToPathRef.current = fromPath;
      
      // 同时存储在localStorage作为备份
      localStorage.setItem('lastPath', fromPath);
    } else {
      // 如果状态中没有，尝试从localStorage获取
      const storedPath = localStorage.getItem('lastPath');
      if (storedPath && storedPath !== '/login') {
        returnToPathRef.current = storedPath;
        console.log(`Login: 从localStorage检索返回路径: ${storedPath}`);
      }
    }
  }, [location.state]);
  
  // 处理语言变更
  useEffect(() => {
    if (isChangingLanguage) {
      setCanRedirect(false);
      lastLanguageChangeTimeRef.current = Date.now();
      console.log("Login: 语言正在变更，阻止重定向");
      
      // 清除任何现有超时
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      
      // 设置超时以重新启用重定向
      redirectTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setCanRedirect(true);
          console.log("Login: 语言变更已稳定，重定向已启用");
        }
      }, languageStabilityWaitPeriod);
      
      return () => {
        if (redirectTimeoutRef.current) {
          clearTimeout(redirectTimeoutRef.current);
        }
      };
    }
  }, [isChangingLanguage]);
  
  // 重定向到returnTo路径（如果用户已登录）
  useEffect(() => {
    if (!mountedRef.current || redirectInProgressRef.current || !canRedirect || 
        isChangingLanguage || Date.now() - lastLanguageChangeTimeRef.current < languageStabilityWaitPeriod) {
      return;
    }
    
    if (isLoggedIn && returnToPathRef.current) {
      redirectInProgressRef.current = true;
      console.log(`Login: 已登录，重定向到: ${returnToPathRef.current}`);
      
      // 清除任何现有超时
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      
      // 小超时以避免潜在的导航冲突
      redirectTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          navigate(returnToPathRef.current as string, { replace: true });
        }
        
        // 延迟后重置标志
        setTimeout(() => {
          if (mountedRef.current) {
            redirectInProgressRef.current = false;
          }
        }, 500);
      }, 500);
    } else if (isLoggedIn) {
      redirectInProgressRef.current = true;
      console.log('Login: 已登录，重定向到dashboard');
      
      // 清除任何现有超时
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      
      // 小超时以避免潜在的导航冲突
      redirectTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          navigate('/dashboard', { replace: true });
        }
        
        // 延迟后重置标志
        setTimeout(() => {
          if (mountedRef.current) {
            redirectInProgressRef.current = false;
          }
        }, 500);
      }, 500);
    }
  }, [isLoggedIn, navigate, canRedirect, isChangingLanguage]);

  // 记忆化标题和描述以防止不必要的重新渲染
  const cardTitle = useMemo(() => t('auth.login.title', 'Login'), [t]);
  const cardDescription = useMemo(() => t('auth.login.description', 'Enter your credentials to access your account'), [t]);

  // 如果语言正在变更，显示最小内容以防止导航问题
  if (isChangingLanguage) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="p-6 max-w-md">
          <h1 className="text-2xl font-medium mb-2">{cardTitle}</h1>
          <p className="text-muted-foreground">{cardDescription}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        {metadata.meta.map((meta, index) => (
          <meta key={`meta-${index}`} {...meta} />
        ))}
        {metadata.script.map((script, index) => (
          <script key={`script-${index}`} {...script} />
        ))}
      </Helmet>
      <AuthCard
        title={cardTitle}
        description={cardDescription}
        footer={<AuthFooter isLogin={true} />}
      >
        <LoginForm />
      </AuthCard>
    </>
  );
};

export default Login;
