
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
  
  // Get redirect path from location state, or default to dashboard
  const from = location.state?.from || "/dashboard";
  
  console.log("LoginForm - Mounted with auth state:", { isLoggedIn, isLoading });
  console.log("LoginForm - Redirect target after login:", from);
  console.log("LoginForm - Token in localStorage:", localStorage.getItem('authToken'));
  console.log("LoginForm - Language changing:", isChangingLanguage, "Can navigate:", canNavigate);

  // Track mounted state to prevent memory leaks
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      // Clear any pending timeout on unmount
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  // Block navigation during language changes
  useEffect(() => {
    if (isChangingLanguage) {
      setCanNavigate(false);
      console.log("LoginForm: Language changing, blocking navigation");
      
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          setCanNavigate(true);
          console.log("LoginForm: Language change settled, navigation enabled");
        }
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isChangingLanguage]);

  // Reset navigation flags when language changes to prevent conflicts
  useEffect(() => {
    if (language !== lastLanguageRef.current) {
      console.log(`LoginForm: Language changed from ${lastLanguageRef.current} to ${language}`);
      lastLanguageRef.current = language;
      
      setCanNavigate(false);
      
      // Reset redirect status after language change settles
      setTimeout(() => {
        if (mountedRef.current) {
          redirectInProgressRef.current = false;
          setCanNavigate(true);
          console.log("LoginForm: Language change settled, navigation re-enabled");
        }
      }, 800);
    }
  }, [language]);

  // If already logged in, redirect to dashboard or original target, but only if not changing language
  useEffect(() => {
    if (isLoggedIn && !isLoading && mountedRef.current && !redirectInProgressRef.current && canNavigate) {
      console.log("User already logged in, redirecting to:", from);
      redirectInProgressRef.current = true;
      
      // Clear any existing timeout
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      
      // Small delay to coordinate with language changes
      redirectTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          navigate(from, { replace: true });
          
          // Reset flag after navigation
          setTimeout(() => {
            if (mountedRef.current) {
              redirectInProgressRef.current = false;
            }
          }, 300);
        }
      }, 300);
    }
  }, [isLoggedIn, isLoading, navigate, from, canNavigate]);

  // Handle successful login by navigating to redirect path
  const handleLoginSuccess = () => {
    if (!mountedRef.current || !canNavigate) return;
    
    console.log("LoginForm - Login successful, redirecting to:", from);
    redirectInProgressRef.current = true;
    
    // Clear any existing timeout
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }
    
    // Use slight delay to ensure auth state has updated
    redirectTimeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        navigate(from, { replace: true });
        
        // Reset flag after navigation 
        setTimeout(() => {
          if (mountedRef.current) {
            redirectInProgressRef.current = false;
          }
        }, 300);
      }
    }, 300);
  };

  // If still checking auth state, show simplified loading
  if (isLoading) {
    return <div className="flex justify-center py-4"><span className="text-blue-200">Loading...</span></div>;
  }

  return (
    <div className="relative z-10 w-full">
      <LoginFormFields onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginForm;
