
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
    };
  }, []);

  // Block redirects during language changes
  useEffect(() => {
    if (isChangingLanguage) {
      setCanRedirect(false);
      console.log("BackendRoute: Language changing, blocking redirects");
      
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          setCanRedirect(true);
          console.log("BackendRoute: Language change settled, redirects enabled");
        }
      }, 800);
      
      return () => clearTimeout(timer);
    } else {
      // Ensure redirect is re-enabled when language change completes
      if (!canRedirect && mountedRef.current) {
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

  // During language change, avoid redirects
  if (isChangingLanguage) {
    console.log("BackendRoute: Language is changing, deferring redirect");
    return <Outlet />;
  }

  // If user is not logged in, redirect to login but only if not actively changing language
  if (!isLoggedIn && canRedirect && !redirectInProgressRef.current && !isChangingLanguage) {
    console.log("BackendRoute: User not authenticated, redirecting to login");
    redirectInProgressRef.current = true;
    
    // Reset redirect flag after a delay
    setTimeout(() => {
      redirectInProgressRef.current = false;
    }, 500);
    
    // Pass current location to redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // User is logged in or language is changing, show backend content
  console.log("BackendRoute: User is authenticated or language changing, showing protected content");
  redirectInProgressRef.current = false;
  return <Outlet />;
};

export default BackendRoute;
