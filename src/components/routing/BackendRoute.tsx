
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
    }
  }, [isChangingLanguage]);

  // Debugging
  useEffect(() => {
    console.log(`BackendRoute: Current path: ${location.pathname}, isLoggedIn: ${isLoggedIn}, isLoading: ${isLoading}`);
    console.log(`BackendRoute: Language: ${language}, canRedirect: ${canRedirect}`);
    console.log(`BackendRoute: Previous path: ${lastPathRef.current || 'none'}`);
  }, [location.pathname, isLoggedIn, isLoading, language, canRedirect]);

  // If in development mode with bypass, allow access
  if (process.env.NODE_ENV === 'development' && location.search.includes('bypass=auth')) {
    console.log("BackendRoute: Development mode bypass - allowing access to protected pages");
    return <Outlet />;
  }

  // When auth is loading, show loading component
  if (isLoading) {
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

  // If user is not logged in, redirect to login
  if (!isLoggedIn && canRedirect && !redirectInProgressRef.current) {
    console.log("BackendRoute: User not authenticated, redirecting to login");
    redirectInProgressRef.current = true;
    
    // Reset redirect flag after a delay
    setTimeout(() => {
      redirectInProgressRef.current = false;
    }, 500);
    
    // Pass current location to redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // User is logged in, show backend content
  console.log("BackendRoute: User is authenticated, showing protected content");
  redirectInProgressRef.current = false;
  return <Outlet />;
};

export default BackendRoute;
