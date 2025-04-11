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
  const authTokenRef = useRef<string | null>(null);
  
  // Use prop or auth hook's login state
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : authIsLoggedIn;
  
  // Get redirect target from location state, or default to dashboard
  const from = location.state?.from || "/dashboard";
  
  useEffect(() => {
    mountedRef.current = true;
    
    // Check for auth token on mount
    const token = localStorage.getItem('authToken');
    if (token) {
      authTokenRef.current = token;
    } else {
      // Try to restore from session storage
      const sessionToken = sessionStorage.getItem('tempAuthToken');
      if (sessionToken) {
        console.log("GuestRoute: Found token in session storage, restoring");
        localStorage.setItem('authToken', sessionToken);
        authTokenRef.current = sessionToken;
        forceRefresh();
      }
    }
    
    return () => {
      mountedRef.current = false;
    };
  }, [forceRefresh]);

  // Fix: CRITICAL - Keep token in both localStorage and sessionStorage during language changes
  useEffect(() => {
    // During language changes, preserve the authentication state
    if (isChangingLanguage) {
      // Save token to sessionStorage as backup during language change
      const token = localStorage.getItem('authToken') || authTokenRef.current;
      if (token) {
        console.log("GuestRoute: Backing up auth token during language change");
        sessionStorage.setItem('tempAuthToken', token);
        authTokenRef.current = token;
      }
      
      // Record language change time
      languageChangeTimeRef.current = Date.now();
    } else if (!isChangingLanguage) {
      // After language change completes, restore the token if needed
      const currentToken = localStorage.getItem('authToken');
      
      if (!currentToken) {
        if (authTokenRef.current) {
          console.log("GuestRoute: Restoring auth token from memory");
          localStorage.setItem('authToken', authTokenRef.current);
          forceRefresh();
        }
        
        const tempToken = sessionStorage.getItem('tempAuthToken');
        if (tempToken && !currentToken) {
          console.log("GuestRoute: Restoring auth token from session storage");
          localStorage.setItem('authToken', tempToken);
          forceRefresh();
        }
      }
    }
  }, [isChangingLanguage, forceRefresh]);
  
  // Block redirects during language changes
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
      }, 2000); // Increased from 1500ms to 2000ms for more stability
      
      return () => clearTimeout(timer);
    }
  }, [isChangingLanguage]);
  
  // When language changes, update reference and block redirects
  useEffect(() => {
    if (language !== lastLanguageRef.current) {
      console.log(`GuestRoute: Language changed from ${lastLanguageRef.current} to ${language}`);
      lastLanguageRef.current = language as string;
      languageChangeTimeRef.current = Date.now();
      
      setCanRedirect(false);
      
      // Reset redirect status after language change settles
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          redirectInProgressRef.current = false;
          setCanRedirect(true);
          console.log("GuestRoute: Language change settled, redirects re-enabled");
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [language]);
  
  // Debug logging
  useEffect(() => {
    if (initialCheckRef.current) {
      console.log(`GuestRoute: Path: ${location.pathname}, isLoggedIn: ${isLoggedIn}, isLoading: ${isLoading}, canRedirect: ${canRedirect}`);
      console.log(`GuestRoute: Redirect target if logged in: ${from}, isChangingLanguage: ${isChangingLanguage}`);
      console.log(`GuestRoute: Language: ${language}, last language: ${lastLanguageRef.current}`);
      console.log(`GuestRoute: Token in localStorage: ${!!localStorage.getItem('authToken')}, in sessionStorage: ${!!sessionStorage.getItem('tempAuthToken')}`);
      initialCheckRef.current = false;
    }
  }, [location.pathname, isLoggedIn, isLoading, from, canRedirect, isChangingLanguage, language]);

  // In dev mode always allow access for testing
  if (process.env.NODE_ENV === 'development' && location.search.includes('bypass=guest')) {
    console.log("GuestRoute: Development mode bypass - allowing access to auth pages");
    return <Outlet />;
  }

  // If auth is loading or during initial render, wait
  if ((isLoading && !authCheckedRef.current) || initialCheckRef.current) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-950">
        <div className="text-white">Checking authentication...</div>
      </div>
    );
  }
  
  // Mark auth as checked
  authCheckedRef.current = true;

  // CRITICAL: Skip redirect during and shortly after language changes
  if (isChangingLanguage || (Date.now() - languageChangeTimeRef.current < 2000)) {
    console.log("GuestRoute: Language recently changed, deferring redirect decision");
    return <Outlet />; 
  }

  // Check for auth token one more time
  const sessionToken = sessionStorage.getItem('tempAuthToken');
  if (sessionToken && !localStorage.getItem('authToken')) {
    console.log("GuestRoute: Found token in session storage before redirect, restoring");
    localStorage.setItem('authToken', sessionToken);
    forceRefresh();
    return <Outlet />;
  }

  // If user is logged in, redirect to dashboard or requested page
  // But only redirect once to prevent loops and not during language changes
  if (isLoggedIn && !redirectInProgressRef.current && mountedRef.current && 
      canRedirect && !isChangingLanguage) {
    console.log(`GuestRoute: User is authenticated, redirecting to ${from}`);
    redirectInProgressRef.current = true;
    return <Navigate to={from} replace />;
  }
  
  // User is not logged in, show guest content (login/register form)
  console.log("GuestRoute: User is not authenticated, showing login form");
  redirectInProgressRef.current = false;
  return <Outlet />;
};

export default GuestRoute;
