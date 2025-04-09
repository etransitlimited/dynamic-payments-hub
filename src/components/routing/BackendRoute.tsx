
import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

interface BackendRouteProps {
  isLoggedIn?: boolean;
}

const BackendRoute: React.FC<BackendRouteProps> = ({ isLoggedIn: propIsLoggedIn }) => {
  const location = useLocation();
  const lastPathRef = useRef(location.pathname);
  const { isLoggedIn: authIsLoggedIn, isLoading } = useAuth();
  const mountedRef = useRef(true);
  const redirectInProgressRef = useRef(false);
  const authCheckedRef = useRef(false);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use prop or auth hook's login state
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : authIsLoggedIn;
  
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
  
  // Log route changes but avoid repeated logs for the same path
  useEffect(() => {
    if (lastPathRef.current !== location.pathname && mountedRef.current) {
      console.log(`BackendRoute: Path changed from ${lastPathRef.current} to ${location.pathname}`);
      lastPathRef.current = location.pathname;
      // Reset auth check flag on actual path change
      authCheckedRef.current = false;
      // Also reset redirect flag on path change
      redirectInProgressRef.current = false;
    }
  }, [location.pathname]);
  
  // For dev and testing, allow bypassing auth
  if (process.env.NODE_ENV !== 'production' && 
      (location.search.includes('bypass=auth') || localStorage.getItem('bypassAuth'))) {
    console.log("BackendRoute: Auth bypass detected, allowing access to protected route");
    return <Outlet />;
  }
  
  // If auth state is loading, show loading indicator only during initial load
  if (isLoading && !authCheckedRef.current) {
    console.log("BackendRoute: Auth is loading, waiting for auth state");
    return (
      <div className="flex h-screen items-center justify-center bg-charcoal">
        <div className="text-white">Loading authentication...</div>
      </div>
    );
  }
  
  // Mark that we've checked auth
  authCheckedRef.current = true;
  
  // If user is not logged in, redirect to login page with returnTo path
  // But only do this once per route to prevent loops
  if (!isLoggedIn && !redirectInProgressRef.current && !location.pathname.startsWith('/login')) {
    console.log(`BackendRoute: User not authenticated, redirecting to login with returnTo: ${location.pathname}`);
    redirectInProgressRef.current = true;
    
    // Clear any existing timeout
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }
    
    // Add a small delay to avoid navigation conflicts during language changes
    redirectTimeoutRef.current = setTimeout(() => {
      redirectInProgressRef.current = true;
    }, 50);
    
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location.pathname, timestamp: Date.now() }}
      />
    );
  }
  
  // User is logged in, show protected content
  // Reset redirect flag when successfully showing content
  console.log("BackendRoute: User is authenticated, showing protected content");
  return <Outlet />;
};

export default BackendRoute;
