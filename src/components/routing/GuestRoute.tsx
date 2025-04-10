
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
  const languageChangeTimeRef = useRef<number>(0);
  
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

  // Handle auth token preservation during language changes
  useEffect(() => {
    // Save token when language changes to prevent it from being lost
    if (isChangingLanguage) {
      const token = localStorage.getItem('authToken');
      if (token) {
        console.log("GuestRoute: Preserving auth token during language change");
        // Store in session to avoid localStorage conflicts
        sessionStorage.setItem('tempAuthToken', token);
      }
    } else if (sessionStorage.getItem('tempAuthToken')) {
      // Restore token after language change is complete
      const tempToken = sessionStorage.getItem('tempAuthToken');
      if (tempToken) {
        console.log("GuestRoute: Restoring auth token after language change");
        localStorage.setItem('authToken', tempToken);
        sessionStorage.removeItem('tempAuthToken');
      }
    }
  }, [isChangingLanguage]);
  
  // Block redirects during language changes with improved timing
  useEffect(() => {
    if (isChangingLanguage) {
      setCanRedirect(false);
      languageChangeTimeRef.current = Date.now();
      console.log("GuestRoute: Language changing, blocking redirects");
      
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          setCanRedirect(true);
          console.log("GuestRoute: Language change settled, redirects enabled");
        }
      }, 1500); // Increased from 1000ms to 1500ms for more stability
      
      return () => clearTimeout(timer);
    } else {
      // Only re-enable redirects if sufficient time has passed since last language change
      const timePassedSinceChange = Date.now() - languageChangeTimeRef.current;
      if (timePassedSinceChange > 1500 && !canRedirect && mountedRef.current) {
        setCanRedirect(true);
      }
    }
  }, [isChangingLanguage, canRedirect]);
  
  // When language changes, we don't want to trigger redirects right away
  useEffect(() => {
    if (language !== lastLanguageRef.current) {
      console.log(`GuestRoute: Language changed from ${lastLanguageRef.current} to ${language}`);
      lastLanguageRef.current = language as string;
      languageChangeTimeRef.current = Date.now();
      
      setCanRedirect(false);
      
      // Reset redirect progress status to allow navigation after language settles
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      
      redirectTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          redirectInProgressRef.current = false;
          setCanRedirect(true);
          console.log("GuestRoute: Language change settled, redirects re-enabled");
        }
      }, 1500); // Increased from 1000ms to 1500ms
    }
  }, [language]);
  
  // Improved logging
  useEffect(() => {
    if (mountedRef.current) {
      console.log(`GuestRoute: Current path: ${location.pathname}, isLoggedIn: ${isLoggedIn}, isLoading: ${isLoading}, canRedirect: ${canRedirect}`);
      console.log(`GuestRoute: Redirect target if logged in: ${from}, isChangingLanguage: ${isChangingLanguage}`);
      console.log(`GuestRoute: Language change time: ${new Date(languageChangeTimeRef.current).toISOString()}, time since: ${Date.now() - languageChangeTimeRef.current}ms`);
      // Avoid excessive localStorage access in logs
      if (!authCheckedRef.current) {
        console.log("GuestRoute: localStorage token:", localStorage.getItem('authToken'));
      }
    }
  }, [location.pathname, isLoggedIn, isLoading, from, canRedirect, isChangingLanguage]);

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

  // Critical fix: During language change, NEVER redirect
  if (isChangingLanguage || Date.now() - languageChangeTimeRef.current < 1500) {
    console.log("GuestRoute: Language is changing or recently changed, showing login form temporarily");
    return <Outlet />;
  }

  // If user is logged in, redirect to dashboard or requested page
  // But only redirect once to prevent loops and not during language changes
  if (isLoggedIn && !redirectInProgressRef.current && mountedRef.current && 
      canRedirect && !isChangingLanguage && Date.now() - languageChangeTimeRef.current > 1500) {
    console.log(`GuestRoute: User is authenticated, redirecting to ${from}`);
    redirectInProgressRef.current = true;
    
    // Clear any existing timeout
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }
    
    // Add a small delay to ensure auth state is stable
    redirectTimeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        redirectInProgressRef.current = false;
      }
    }, 800);
    
    return <Navigate to={from} replace />;
  }
  
  // User is not logged in, show guest content (login/register form)
  console.log("GuestRoute: User is not authenticated, showing login form");
  redirectInProgressRef.current = false;
  return <Outlet />;
};

export default GuestRoute;
