
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
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const languageChangeTimeRef = useRef<number>(0);

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
    
    return () => {
      mountedRef.current = false;
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Handle auth token preservation during language changes
  useEffect(() => {
    // Save token when language changes to prevent it from being lost
    if (isChangingLanguage) {
      const token = localStorage.getItem('authToken');
      if (token) {
        console.log("BackendRoute: Preserving auth token during language change");
        // Store in session to avoid localStorage conflicts
        sessionStorage.setItem('tempAuthToken', token);
      }
    } else if (sessionStorage.getItem('tempAuthToken')) {
      // Restore token after language change is complete
      const tempToken = sessionStorage.getItem('tempAuthToken');
      if (tempToken) {
        console.log("BackendRoute: Restoring auth token after language change");
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
      console.log("BackendRoute: Language changing, blocking redirects");
      
      // Clear any existing timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      debounceTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setCanRedirect(true);
          console.log("BackendRoute: Language change settled, redirects enabled");
        }
      }, 1500); // Increased from 1000ms to 1500ms for more stability
      
      return () => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
      };
    } else {
      // Only re-enable redirects if sufficient time has passed since last language change
      const timePassedSinceChange = Date.now() - languageChangeTimeRef.current;
      if (timePassedSinceChange > 1500 && !canRedirect && mountedRef.current) {
        setCanRedirect(true);
      }
    }
  }, [isChangingLanguage, canRedirect]);

  // Debugging
  useEffect(() => {
    console.log(`BackendRoute: Current path: ${location.pathname}, isLoggedIn: ${isLoggedIn}, isLoading: ${isLoading}, canRedirect: ${canRedirect}`);
    console.log(`BackendRoute: Language: ${language}, changing: ${isChangingLanguage}`);
    console.log(`BackendRoute: Previous path: ${lastPathRef.current || 'none'}`);
    
    // Avoid excessive localStorage access in logs
    if (!authCheckedRef.current) {
      console.log("BackendRoute: localStorage token:", localStorage.getItem('authToken'));
      authCheckedRef.current = true;
    }
  }, [location.pathname, isLoggedIn, isLoading, language, canRedirect, isChangingLanguage]);

  // If in development mode with bypass, allow access
  if (process.env.NODE_ENV === 'development' && location.search.includes('bypass=auth')) {
    console.log("BackendRoute: Development mode bypass - allowing access to protected pages");
    return <Outlet />;
  }

  // When auth is loading, show loading component
  if (isLoading && !authCheckedRef.current) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-950">
        <div className="text-white">Checking authentication...</div>
      </div>
    );
  }

  // Critical fix: During language change, NEVER redirect even if not logged in
  if (isChangingLanguage) {
    console.log("BackendRoute: Language is changing, deferring redirect");
    return <Outlet />;
  }

  // If user is not logged in, redirect to login but only if not actively changing language
  // Important fix: Added additional check for language change time
  if (!isLoggedIn && canRedirect && !redirectInProgressRef.current && 
      !isChangingLanguage && Date.now() - languageChangeTimeRef.current > 1500) {
    console.log("BackendRoute: User not authenticated, redirecting to login");
    redirectInProgressRef.current = true;
    
    // Reset redirect flag after a delay
    setTimeout(() => {
      if (mountedRef.current) {
        redirectInProgressRef.current = false;
      }
    }, 500);
    
    // Fix: Store current path first before redirecting
    if (location.pathname && location.pathname !== '/login') {
      localStorage.setItem('lastPath', location.pathname);
    }
    
    // Pass current location to redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // User is logged in or language is changing, show backend content
  console.log("BackendRoute: User is authenticated or language changing, showing protected content");
  redirectInProgressRef.current = false;
  return <Outlet />;
};

export default BackendRoute;
