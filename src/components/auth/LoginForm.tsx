import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import LoginFormFields from "./forms/LoginFormFields";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/context/TranslationProvider";

const LoginForm: React.FC = () => {
  const { t } = useSafeTranslation();
  const { language, isLoading: langLoading } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  const [canNavigate, setCanNavigate] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading: authLoading, login, forceRefresh } = useAuth();
  const mountedRef = useRef(true);
  const redirectInProgressRef = useRef(false);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastLanguageRef = useRef<string>(language);
  const authCheckRef = useRef(false);
  const loginAttemptCountRef = useRef(0);
  
  // Get redirect path from location state, or default to dashboard
  const from = location.state?.from || "/dashboard";
  
  console.log("LoginForm - Mounted with auth state:", { isLoggedIn, authLoading });
  console.log("LoginForm - Redirect target after login:", from);
  console.log("LoginForm - Token in localStorage:", localStorage.getItem('authToken'));
  console.log("LoginForm - Language changing:", isChangingLanguage, "Can navigate:", canNavigate);

  // Track mounted state to prevent memory leaks
  useEffect(() => {
    mountedRef.current = true;
    
    // Special fix: Check for token from sessionStorage (language change preservation)
    const checkAndRestoreToken = () => {
      if (loginAttemptCountRef.current > 3) return; // Prevent infinite loops
      
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
      if (token && !isLoggedIn && !authLoading) {
        console.log("LoginForm: Found token - attempting login restoration");
        login(token);
        authCheckRef.current = true;
        loginAttemptCountRef.current++;
      }
    };
    
    if (!authCheckRef.current) {
      checkAndRestoreToken();
    }
    
    // Force a refresh attempt on mount
    setTimeout(() => {
      if (mountedRef.current && !isLoggedIn) {
        forceRefresh();
      }
    }, 300);
    
    return () => {
      mountedRef.current = false;
      // Clear any pending timeout on unmount
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, [isLoggedIn, authLoading, login, forceRefresh]);

  // Ensure token persists during language change
  useEffect(() => {
    // If token exists in session storage, use it
    const tempToken = sessionStorage.getItem('tempAuthToken');
    if (tempToken) {
      console.log("LoginForm: Restoring auth token from session storage");
      localStorage.setItem('authToken', tempToken);
      
      // Try to login with this token
      login(tempToken);
      
      // Keep in sessionStorage as backup
      // We will clear it only after successful login
    }
  }, [login]);

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
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [isChangingLanguage]);

  // Reset navigation flags when language changes to prevent conflicts
  useEffect(() => {
    if (language !== lastLanguageRef.current) {
      console.log(`LoginForm: Language changed from ${lastLanguageRef.current} to ${language}`);
      lastLanguageRef.current = language;
      
      // Store token temporarily to preserve during language change
      const token = localStorage.getItem('authToken');
      if (token) {
        sessionStorage.setItem('tempAuthToken', token);
        localStorage.setItem('authToken', token); // Make sure it's also in localStorage
        console.log("LoginForm: Preserved token during language change");
      }
      
      setCanNavigate(false);
      
      // Reset redirect status after language change settles
      setTimeout(() => {
        if (mountedRef.current) {
          redirectInProgressRef.current = false;
          setCanNavigate(true);
          console.log("LoginForm: Language change settled, navigation re-enabled");
          
          // Try to restore from sessionStorage again
          const tempToken = sessionStorage.getItem('tempAuthToken');
          if (tempToken) {
            login(tempToken);
          }
        }
      }, 1200);
    }
  }, [language, login]);

  // Enhanced redirection logic with more robust checks
  useEffect(() => {
    // Skip if we're changing language or can't navigate
    if (!canNavigate || isChangingLanguage) {
      return;
    }
    
    // Skip if redirect is already in progress
    if (redirectInProgressRef.current) {
      return;
    }
    
    // If we're logged in and can navigate, proceed with redirect
    if (isLoggedIn && !authLoading && mountedRef.current) {
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
              
              // Clear temp token now that we're successfully redirected
              sessionStorage.removeItem('tempAuthToken');
            }
          }, 300);
        }
      }, 500);
    }
  }, [isLoggedIn, authLoading, navigate, from, canNavigate, isChangingLanguage]);

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
            
            // Clear temp token now that we're successfully logged in
            sessionStorage.removeItem('tempAuthToken');
          }
        }, 300);
      }
    }, 300);
  };

  // If still checking auth state, show simplified loading
  if (authLoading || langLoading) {
    return <div className="flex justify-center py-4"><span className="text-blue-200">Loading...</span></div>;
  }

  return (
    <div className="relative z-10 w-full" data-isolation-scope="auth_login" data-language={language}>
      <LoginFormFields onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginForm;
