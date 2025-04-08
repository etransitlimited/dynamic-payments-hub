
import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface BackendRouteProps {
  isLoggedIn?: boolean;
  children?: React.ReactNode; // Add children prop to interface
}

const BackendRoute: React.FC<BackendRouteProps> = ({ isLoggedIn = false, children }) => {
  const location = useLocation();
  const lastPathRef = useRef(location.pathname);
  const authCheckTimeRef = useRef(Date.now());
  // Use a stable ref to prevent unnecessary re-renders due to route changes
  const stableStateRef = useRef({ 
    from: location.pathname, 
    timestamp: Date.now() 
  });
  const mountedRef = useRef(true);
  const returnToPathRef = useRef(location.pathname);
  
  // Track mounted state
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Update stable state ref when path changes (but don't trigger re-renders)
  if (lastPathRef.current !== location.pathname && mountedRef.current) {
    console.log(`BackendRoute: Path changed from ${lastPathRef.current} to ${location.pathname}`);
    lastPathRef.current = location.pathname;
    authCheckTimeRef.current = Date.now();
    stableStateRef.current = {
      from: location.pathname,
      timestamp: authCheckTimeRef.current
    };
    returnToPathRef.current = location.pathname;
  }
  
  // More reliable check - check both prop and localStorage
  const token = localStorage.getItem('authToken');
  const isAuthenticated = isLoggedIn || !!token;
  
  // For development and testing, allow bypassing auth check
  if (process.env.NODE_ENV !== 'production' && 
      (location.search.includes('bypass=auth') || localStorage.getItem('bypassAuth'))) {
    console.log("BackendRoute: Auth bypass detected, allowing access to protected route");
    return children ? <>{children}</> : <Outlet />;
  }
  
  // If user is not logged in, redirect to login page with returnTo path
  if (!isAuthenticated) {
    console.log(`BackendRoute: User not authenticated, redirecting to login with returnTo: ${returnToPathRef.current}`);
    
    // Use a completely stable state object that won't change between renders
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: returnToPathRef.current, timestamp: Date.now() }}
      />
    );
  }
  
  // User is logged in, show protected content
  console.log("BackendRoute: User is authenticated, showing protected content");
  return children ? <>{children}</> : <Outlet />;
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(BackendRoute, (prevProps, nextProps) => {
  // Only re-render if authentication status changes
  return prevProps.isLoggedIn === nextProps.isLoggedIn;
});
