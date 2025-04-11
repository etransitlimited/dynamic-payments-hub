
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
  const loginAttemptedRef = useRef(false);
  const stableTokenRef = useRef<string | null>(null);
  const authCheckCountRef = useRef(0);

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
    
    // Cache token reference to prevent it from being lost
    stableTokenRef.current = localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
    
    return () => {
      mountedRef.current = false;
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Check for token consistently with retry mechanism
  useEffect(() => {
    // Skip if we've already done too many checks to prevent loops
    if (authCheckCountRef.current > 3) {
      return;
    }
    
    // If we have a token but the auth state doesn't reflect it
    const token = stableTokenRef.current || localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
    
    if (!loginAttemptedRef.current && token && !isLoggedIn && !isLoading) {
      console.log("BackendRoute: Found token but not logged in, restoring session");
      localStorage.setItem('authToken', token);
      stableTokenRef.current = token;
      loginAttemptedRef.current = true;
      authCheckCountRef.current++;
      
      // Don't force reload, just block redirects temporarily
      setCanRedirect(false);
      setTimeout(() => {
        if (mountedRef.current) {
          setCanRedirect(true);
        }
      }, 2000);
    }
  }, [isLoggedIn, isLoading]);

  // Handle auth token preservation during language changes
  useEffect(() => {
    // Save token when language changes to prevent it from being lost
    if (isChangingLanguage) {
      const token = localStorage.getItem('authToken');
      if (token) {
        console.log("BackendRoute: Preserving auth token during language change");
        // Store in session to avoid localStorage conflicts
        sessionStorage.setItem('tempAuthToken', token);
        stableTokenRef.current = token; // Keep token in memory
      }
      
      // Block redirects during language changes
      setCanRedirect(false);
      languageChangeTimeRef.current = Date.now();
    } 
    // When language change is complete
    else if (sessionStorage.getItem('tempAuthToken')) {
      // Restore token after language change
      const tempToken = sessionStorage.getItem('tempAuthToken');
      if (tempToken) {
        console.log("BackendRoute: Restoring auth token after language change");
        localStorage.setItem('authToken', tempToken);
        stableTokenRef.current = tempToken;
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
      }, 3000); // Increased from 2000ms to 3000ms for more stability
      
      return () => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
      };
    } else {
      // Only re-enable redirects if sufficient time has passed since last language change
      const timePassedSinceChange = Date.now() - languageChangeTimeRef.current;
      if (timePassedSinceChange > 3000 && !canRedirect && mountedRef.current) {
        setCanRedirect(true);
      }
    }
  }, [isChangingLanguage, canRedirect]);

  // Always check for token in localStorage on mount and route changes
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
      stableTokenRef.current = token;
      
      if (token && !isLoggedIn && !isLoading) {
        // If we have a token but not logged in, block redirects temporarily
        setCanRedirect(false);
        setTimeout(() => {
          if (mountedRef.current) {
            setCanRedirect(true);
          }
        }, 2000);
      }
    };
    
    checkToken();
    
    // Also check whenever location changes
    return () => {
      checkToken();
    };
  }, [location.pathname, isLoggedIn, isLoading]);

  // Debugging
  useEffect(() => {
    console.log(`BackendRoute: Current path: ${location.pathname}, isLoggedIn: ${isLoggedIn}, isLoading: ${isLoading}, canRedirect: ${canRedirect}`);
    console.log(`BackendRoute: Language: ${language}, changing: ${isChangingLanguage}`);
    console.log(`BackendRoute: Previous path: ${lastPathRef.current || 'none'}`);
    console.log(`BackendRoute: Token in memory: ${!!stableTokenRef.current}`);
    
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

  // Fix: Always allow entry to dashboard during language changes or shortly after
  if (Date.now() - languageChangeTimeRef.current < 3500) {
    console.log("BackendRoute: Recent language change, allowing dashboard access temporarily");
    return <Outlet />;
  }

  // If we have a token in memory but auth state doesn't reflect it, keep showing content
  if (stableTokenRef.current && !isLoggedIn && !isLoading) {
    console.log("BackendRoute: Token exists but auth state doesn't reflect it");
    return <Outlet />;
  }

  // If user is not logged in, redirect to login but only if not actively changing language
  if (!isLoggedIn && canRedirect && !redirectInProgressRef.current && 
      !isChangingLanguage && Date.now() - languageChangeTimeRef.current > 3000) {
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
