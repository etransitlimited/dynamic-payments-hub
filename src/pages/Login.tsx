
import React, { useEffect, useRef, useMemo } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import AuthFooter from "@/components/auth/AuthFooter";
import { useLocation, useNavigate } from "react-router-dom";
import { useSEO } from "@/utils/seo";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/use-auth";

const Login = () => {
  const { t, language } = useSafeTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { getMetadata } = useSEO({});
  const metadata = useMemo(() => getMetadata(location.pathname, language), [location.pathname, language]);
  const { isLoggedIn } = useAuth();
  const returnToPathRef = useRef<string | null>(null);
  const redirectInProgressRef = useRef(false);
  const mountedRef = useRef(true);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Track component mount/unmount to prevent memory leaks
  useEffect(() => {
    mountedRef.current = true;
    console.log("Login page mounted, isLoggedIn:", isLoggedIn);
    console.log("Login page location state:", location.state);
    
    return () => {
      mountedRef.current = false;
      // Clear any pending timeout on unmount
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);
  
  // On mount, store returnTo path to avoid losing it during language changes
  useEffect(() => {
    if (location.state && typeof location.state === 'object' && 'from' in location.state) {
      const fromPath = location.state.from as string;
      console.log(`Login: Storing return path: ${fromPath}`);
      returnToPathRef.current = fromPath;
    }
  }, [location.state]);
  
  // Redirect to returnTo path if user is already logged in
  useEffect(() => {
    if (!mountedRef.current || redirectInProgressRef.current) return;
    
    if (isLoggedIn && returnToPathRef.current) {
      redirectInProgressRef.current = true;
      console.log(`Login: Already logged in, redirecting to: ${returnToPathRef.current}`);
      
      // Clear any existing timeout
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      
      // Small timeout to avoid potential navigation conflicts
      redirectTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          navigate(returnToPathRef.current as string, { replace: true });
        }
        
        // Reset flag after a delay
        setTimeout(() => {
          if (mountedRef.current) {
            redirectInProgressRef.current = false;
          }
        }, 300);
      }, 100);
    } else if (isLoggedIn) {
      redirectInProgressRef.current = true;
      console.log('Login: Already logged in, redirecting to dashboard');
      
      // Clear any existing timeout
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      
      // Small timeout to avoid potential navigation conflicts
      redirectTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          navigate('/dashboard', { replace: true });
        }
        
        // Reset flag after a delay
        setTimeout(() => {
          if (mountedRef.current) {
            redirectInProgressRef.current = false;
          }
        }, 300);
      }, 100);
    }
  }, [isLoggedIn, navigate]);

  // Memoize title and description to prevent unnecessary re-renders
  const cardTitle = useMemo(() => t('auth.login.title', 'Login'), [t]);
  const cardDescription = useMemo(() => t('auth.login.description', 'Enter your credentials to access your account'), [t]);

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
