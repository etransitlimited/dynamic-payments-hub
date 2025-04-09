
import React, { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/context/TranslationProvider";

interface GuestRouteProps {
  isLoggedIn?: boolean;
}

// GuestRoute is for routes only accessible when not logged in
const GuestRoute: React.FC<GuestRouteProps> = ({ isLoggedIn: propIsLoggedIn }) => {
  const location = useLocation();
  const { isLoggedIn: authIsLoggedIn, isLoading } = useAuth();
  const { language } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  const [canRedirect, setCanRedirect] = useState(true);
  const redirectInProgressRef = useRef(false);
  const mountedRef = useRef(true);
  const authCheckedRef = useRef(false);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastLanguageRef = useRef<string>(language);
  
  // Use prop or auth hook's login state
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : authIsLoggedIn;
  
  // Get redirect target from location state, or default to dashboard
  const from = location.state?.from || "/dashboard";
  
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
  
  // Block redirects during language changes to prevent navigation conflicts
  useEffect(() => {
    if (isChangingLanguage) {
      setCanRedirect(false);
      console.log("GuestRoute: Language changing, blocking redirects");
      
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          setCanRedirect(true);
          console.log("GuestRoute: Language change settled, redirects enabled");
        }
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isChangingLanguage]);
  
  // When language changes, we don't want to trigger redirects right away to prevent navigation conflicts
  useEffect(() => {
    if (language !== lastLanguageRef.current) {
      console.log(`GuestRoute: Language changed from ${lastLanguageRef.current} to ${language}`);
      lastLanguageRef.current = language as string;
      
      setCanRedirect(false);
      
      // Reset redirect progress status to allow navigation after language settles
      setTimeout(() => {
        if (mountedRef.current) {
          redirectInProgressRef.current = false;
          setCanRedirect(true);
          console.log("GuestRoute: Language change settled, redirects re-enabled");
        }
      }, 800);
    }
  }, [language]);
  
  useEffect(() => {
    if (mountedRef.current) {
      console.log(`GuestRoute: Current path: ${location.pathname}, isLoggedIn: ${isLoggedIn}, isLoading: ${isLoading}, canRedirect: ${canRedirect}`);
      console.log("GuestRoute: Redirect target if logged in:", from);
      // Avoid excessive localStorage access in logs
      if (!authCheckedRef.current) {
        console.log("GuestRoute: localStorage token:", localStorage.getItem('authToken'));
      }
    }
  }, [location.pathname, isLoggedIn, isLoading, from, canRedirect]);

  // In dev mode always allow access for testing
  if (process.env.NODE_ENV === 'development' && location.search.includes('bypass=guest')) {
    console.log("GuestRoute: Development mode - allowing access to auth pages");
    return <Outlet />;
  }

  // If auth is loading, show loading component only during initial load
  if (isLoading && !authCheckedRef.current) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-950">
        <div className="text-white">Checking authentication...</div>
      </div>
    );
  }
  
  // Mark auth as checked
  authCheckedRef.current = true;

  // If user is logged in, redirect to dashboard or requested page
  // But only redirect once to prevent loops
  if (isLoggedIn && !redirectInProgressRef.current && mountedRef.current && canRedirect) {
    console.log(`GuestRoute: User is authenticated, redirecting to ${from}`);
    redirectInProgressRef.current = true;
    
    // Clear any existing timeout
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }
    
    // Add a small delay to ensure auth state is stable
    redirectTimeoutRef.current = setTimeout(() => {
      redirectInProgressRef.current = false;
    }, 800);
    
    return <Navigate to={from} replace />;
  }
  
  // If language is changing, delay redirect and show guest content
  if (isLoggedIn && isChangingLanguage) {
    console.log("GuestRoute: Language is changing, showing login form temporarily");
    return <Outlet />;
  }
  
  // User is not logged in, show guest content (login/register form)
  console.log("GuestRoute: User is not authenticated, showing login form");
  redirectInProgressRef.current = false;
  return <Outlet />;
};

export default GuestRoute;
