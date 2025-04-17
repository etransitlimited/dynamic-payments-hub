
import React, { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/context/TranslationProvider";

interface BackendRouteProps {
  isLoggedIn?: boolean;
}

// BackendRoute is for routes only accessible when logged in
const BackendRoute: React.FC<BackendRouteProps> = ({ isLoggedIn: propIsLoggedIn }) => {
  const location = useLocation();
  const { isLoggedIn: authIsLoggedIn, isLoading } = useAuth();
  const { language } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  const [canRedirect, setCanRedirect] = useState(true);
  const redirectInProgressRef = useRef(false);
  const lastPathRef = useRef<string | null>(null);
  const mountedRef = useRef(true);
  const authCheckedRef = useRef(false);
  const languageChangeTimeRef = useRef<number>(0);
  const initialCheckRef = useRef(true);
  const authTokenRef = useRef<string | null>(null);
  const languageChangeLockTimeRef = useRef<number>(0);

  // Use prop or auth hook's login state
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : authIsLoggedIn;
  
  // Track mounted state
  useEffect(() => {
    mountedRef.current = true;
    
    // Try to get last path from storage (for language change restoration)
    const storedPath = localStorage.getItem('lastPath');
    if (storedPath) {
      lastPathRef.current = storedPath;
    }
    
    // Check for auth token on mount
    const token = localStorage.getItem('authToken');
    if (token) {
      authTokenRef.current = token;
    }
    
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Fix: CRITICAL - Keep token in both localStorage and sessionStorage during language changes
  useEffect(() => {
    // During language changes, preserve the authentication state
    if (isChangingLanguage) {
      // Store the current path first
      if (location.pathname) {
        localStorage.setItem('lastPath', location.pathname);
      }
      
      // Save token to sessionStorage as backup during language change
      const token = localStorage.getItem('authToken') || authTokenRef.current;
      if (token) {
        console.log("BackendRoute: Backing up auth token during language change");
        sessionStorage.setItem('tempAuthToken', token);
        authTokenRef.current = token;
      }
      
      // Record language change time
      languageChangeTimeRef.current = Date.now();
      languageChangeLockTimeRef.current = Date.now() + 3000; // Lock for 3 seconds
    } else if (!isChangingLanguage && sessionStorage.getItem('tempAuthToken')) {
      // After language change completes, restore the token if needed
      const tempToken = sessionStorage.getItem('tempAuthToken');
      const currentToken = localStorage.getItem('authToken');
      
      if (tempToken && (!currentToken || tempToken !== currentToken)) {
        console.log("BackendRoute: Restoring auth token after language change");
        localStorage.setItem('authToken', tempToken);
        authTokenRef.current = tempToken;
      }
    }
  }, [isChangingLanguage, location.pathname]);

  // Block redirects during language changes and for a period after
  useEffect(() => {
    if (isChangingLanguage) {
      setCanRedirect(false);
      console.log("BackendRoute: Language changing, blocking redirects");
      languageChangeLockTimeRef.current = Date.now() + 3000; // Lock for 3 seconds
      
      const timer = setTimeout(() => {
        if (mountedRef.current && Date.now() > languageChangeLockTimeRef.current) {
          setCanRedirect(true);
          console.log("BackendRoute: Language change settled, redirects enabled");
        }
      }, 2500); // Increased from 2000ms to 2500ms for more stability
      
      return () => clearTimeout(timer);
    } else if (!canRedirect && Date.now() > languageChangeLockTimeRef.current) {
      // Re-enable redirects after lock period has passed
      setCanRedirect(true);
    }
  }, [isChangingLanguage, canRedirect]);

  // Debug logging
  useEffect(() => {
    if (initialCheckRef.current) {
      console.log(`BackendRoute: Path: ${location.pathname}, isLoggedIn: ${isLoggedIn}, isLoading: ${isLoading}, canRedirect: ${canRedirect}`);
      console.log(`BackendRoute: Language: ${language}, changing: ${isChangingLanguage}`);
      console.log(`BackendRoute: Token in localStorage: ${!!localStorage.getItem('authToken')}, in sessionStorage: ${!!sessionStorage.getItem('tempAuthToken')}`);
      initialCheckRef.current = false;
    }
  }, [location.pathname, isLoggedIn, isLoading, language, canRedirect, isChangingLanguage]);

  // Check for and restore auth token on every render
  useEffect(() => {
    // Check if we have a token in sessionStorage but not in localStorage
    const tempToken = sessionStorage.getItem('tempAuthToken');
    const currentToken = localStorage.getItem('authToken');
    
    if (tempToken && !currentToken) {
      console.log("BackendRoute: Found token in sessionStorage, restoring to localStorage");
      localStorage.setItem('authToken', tempToken);
      
      // Don't redirect immediately, wait for auth state to update
      setTimeout(() => {
        if (mountedRef.current) {
          authCheckedRef.current = true;
        }
      }, 500);
    }
  });

  // If in development mode with bypass, allow access
  if (process.env.NODE_ENV === 'development' && location.search.includes('bypass=auth')) {
    return <Outlet />;
  }

  // When auth is loading or during initial render, wait
  if ((isLoading && !authCheckedRef.current) || initialCheckRef.current) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-950">
        <div className="text-white">Checking authentication...</div>
      </div>
    );
  }

  // CRITICAL: Skip redirect during and for period after language changes
  const recentLanguageChange = Date.now() < languageChangeLockTimeRef.current;
  if (isChangingLanguage || recentLanguageChange) {
    console.log("BackendRoute: Language recently changed, deferring redirect decision");
    authCheckedRef.current = true;
    return <Outlet />; 
  }

  // CRITICAL: After language change completes, check if we need to restore auth
  if (!isLoggedIn && !isChangingLanguage && (sessionStorage.getItem('tempAuthToken') || authTokenRef.current)) {
    console.log("BackendRoute: Language change detected, attempting to restore auth");
    
    if (authTokenRef.current && !localStorage.getItem('authToken')) {
      console.log("BackendRoute: Restoring auth token from memory reference");
      localStorage.setItem('authToken', authTokenRef.current);
    } else if (sessionStorage.getItem('tempAuthToken') && !localStorage.getItem('authToken')) {
      console.log("BackendRoute: Restoring auth token from session storage");
      const tempToken = sessionStorage.getItem('tempAuthToken');
      if (tempToken) localStorage.setItem('authToken', tempToken);
    }
    
    // Wait to avoid redirect, outlet will continue showing current content
    return <Outlet />;
  }

  // If user is not logged in, redirect to login
  if (!isLoggedIn && canRedirect && !redirectInProgressRef.current && !isChangingLanguage) {
    console.log("BackendRoute: User not authenticated, redirecting to login");
    redirectInProgressRef.current = true;
    
    // Store current path before redirecting
    if (location.pathname) {
      localStorage.setItem('lastPath', location.pathname);
    }
    
    // Pass current location to redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // User is logged in or language is changing, show backend content
  authCheckedRef.current = true;
  redirectInProgressRef.current = false;
  return <Outlet />;
};

export default BackendRoute;
