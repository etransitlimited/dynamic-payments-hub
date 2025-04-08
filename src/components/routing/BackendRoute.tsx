
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
  
  // Use prop or auth hook's login state
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : authIsLoggedIn;
  
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Log route changes
  useEffect(() => {
    if (lastPathRef.current !== location.pathname && mountedRef.current) {
      console.log(`BackendRoute: Path changed from ${lastPathRef.current} to ${location.pathname}`);
      lastPathRef.current = location.pathname;
    }
  }, [location.pathname]);
  
  // For dev and testing, allow bypassing auth
  if (process.env.NODE_ENV !== 'production' && 
      (location.search.includes('bypass=auth') || localStorage.getItem('bypassAuth'))) {
    console.log("BackendRoute: Auth bypass detected, allowing access to protected route");
    return <Outlet />;
  }
  
  // If auth state is loading, show loading indicator
  if (isLoading) {
    console.log("BackendRoute: Auth is loading, waiting for auth state");
    return (
      <div className="flex h-screen items-center justify-center bg-charcoal">
        <div className="text-white">Loading authentication...</div>
      </div>
    );
  }
  
  // If user is not logged in, redirect to login page with returnTo path
  if (!isLoggedIn && !redirectInProgressRef.current) {
    console.log(`BackendRoute: User not authenticated, redirecting to login with returnTo: ${location.pathname}`);
    redirectInProgressRef.current = true;
    
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location.pathname, timestamp: Date.now() }}
      />
    );
  }
  
  // User is logged in, show protected content
  console.log("BackendRoute: User is authenticated, showing protected content");
  redirectInProgressRef.current = false;
  return <Outlet />;
};

export default BackendRoute;
