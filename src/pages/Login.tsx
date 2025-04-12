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
  
  useEffect(() => {
    mountedRef.current = true;
    console.log("Login page mounted, isLoggedIn:", isLoggedIn);
    console.log("Login page location state:", location.state);
    
    return () => {
      mountedRef.current = false;
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (location.state && typeof location.state === 'object' && 'from' in location.state) {
      const fromPath = location.state.from as string;
      console.log(`Login: Storing return path: ${fromPath}`);
      returnToPathRef.current = fromPath;
      
      localStorage.setItem('lastPath', fromPath);
    } else {
      const storedPath = localStorage.getItem('lastPath');
      if (storedPath && storedPath !== '/login') {
        returnToPathRef.current = storedPath;
        console.log(`Login: Retrieved return path from localStorage: ${storedPath}`);
      }
    }
  }, [location.state]);
  
  useEffect(() => {
    if (isChangingLanguage) {
      setCanRedirect(false);
      lastLanguageChangeTimeRef.current = Date.now();
      console.log("Login: Language changing, blocking redirects");
      
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      
      redirectTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setCanRedirect(true);
          console.log("Login: Language change settled, redirects enabled");
        }
      }, 1000);
      
      return () => {
        if (redirectTimeoutRef.current) {
          clearTimeout(redirectTimeoutRef.current);
        }
      };
    }
  }, [isChangingLanguage]);
  
  useEffect(() => {
    if (!mountedRef.current || redirectInProgressRef.current || !canRedirect || 
        isChangingLanguage || Date.now() - lastLanguageChangeTimeRef.current < 1000) {
      return;
    }
    
    if (isLoggedIn && returnToPathRef.current) {
      redirectInProgressRef.current = true;
      console.log(`Login: Already logged in, redirecting to: ${returnToPathRef.current}`);
      
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      
      redirectTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          navigate(returnToPathRef.current as string, { replace: true });
        }
        
        setTimeout(() => {
          if (mountedRef.current) {
            redirectInProgressRef.current = false;
          }
        }, 300);
      }, 100);
    } else if (isLoggedIn) {
      redirectInProgressRef.current = true;
      console.log('Login: Already logged in, redirecting to dashboard');
      
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      
      redirectTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          navigate('/dashboard', { replace: true });
        }
        
        setTimeout(() => {
          if (mountedRef.current) {
            redirectInProgressRef.current = false;
          }
        }, 300);
      }, 100);
    }
  }, [isLoggedIn, navigate, canRedirect, isChangingLanguage]);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const loggedOut = searchParams.get('logout') === 'true';
    
    if (loggedOut && mountedRef.current) {
      console.log("Login: User logged out successfully");
    }
  }, [location.search]);
  
  const cardTitle = useMemo(() => t('auth.login.title', 'Login'), [t]);
  const cardDescription = useMemo(() => t('auth.login.description', 'Enter your credentials to access your account'), [t]);

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
