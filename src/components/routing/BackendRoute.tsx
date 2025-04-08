
import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface BackendRouteProps {
  isLoggedIn: boolean;
}

const BackendRoute: React.FC<BackendRouteProps> = ({ isLoggedIn }) => {
  const location = useLocation();
  const lastPathRef = useRef(location.pathname);
  const authCheckTimeRef = useRef(Date.now());
  
  useEffect(() => {
    if (lastPathRef.current !== location.pathname) {
      console.log(`BackendRoute: Path changed from ${lastPathRef.current} to ${location.pathname}`);
      lastPathRef.current = location.pathname;
      authCheckTimeRef.current = Date.now();
    }
  }, [location.pathname]);
  
  useEffect(() => {
    console.log(`BackendRoute: Auth check at path: ${location.pathname}, isLoggedIn: ${isLoggedIn}`);
    console.log("BackendRoute: localStorage token:", localStorage.getItem('authToken'));
  }, [location.pathname, isLoggedIn]);
  
  // More reliable check - check both prop and localStorage
  const token = localStorage.getItem('authToken');
  const isAuthenticated = isLoggedIn || !!token;
  
  // For development and testing, allow bypassing auth check
  if (process.env.NODE_ENV !== 'production' && 
      (location.search.includes('bypass=auth') || localStorage.getItem('bypassAuth'))) {
    console.log("BackendRoute: Auth bypass detected, allowing access to protected route");
    return <Outlet />;
  }
  
  // If user is not logged in, redirect to login page with returnTo path
  if (!isAuthenticated) {
    console.log(`BackendRoute: User not authenticated, redirecting to login with returnTo: ${location.pathname}`);
    
    // Create a more stable state object that won't trigger navigation loops
    const stableState = {
      from: location.pathname,
      timestamp: authCheckTimeRef.current
    };
    
    // Use state to remember where user was trying to go
    return (
      <Navigate 
        to="/login" 
        replace 
        state={stableState}
      />
    );
  }
  
  // User is logged in, show protected content
  console.log("BackendRoute: User is authenticated, showing protected content");
  return <Outlet />;
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(BackendRoute, (prevProps, nextProps) => {
  // Only re-render if authentication status changes
  return prevProps.isLoggedIn === nextProps.isLoggedIn;
});
