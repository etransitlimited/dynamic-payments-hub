
import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

interface GuestRouteProps {
  isLoggedIn?: boolean;
}

// GuestRoute is for routes only accessible when not logged in
const GuestRoute: React.FC<GuestRouteProps> = ({ isLoggedIn: propIsLoggedIn }) => {
  const location = useLocation();
  const { isLoggedIn: authIsLoggedIn, isLoading } = useAuth();
  const redirectInProgressRef = useRef(false);
  const mountedRef = useRef(true);
  const authCheckedRef = useRef(false);
  
  // Use prop or auth hook's login state
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : authIsLoggedIn;
  
  // Get redirect target from location state, or default to dashboard
  const from = location.state?.from || "/dashboard";
  
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  useEffect(() => {
    if (mountedRef.current) {
      console.log(`GuestRoute: Current path: ${location.pathname}, isLoggedIn: ${isLoggedIn}, isLoading: ${isLoading}`);
      console.log("GuestRoute: Redirect target if logged in:", from);
      // Avoid excessive localStorage access in logs
      if (!authCheckedRef.current) {
        console.log("GuestRoute: localStorage token:", localStorage.getItem('authToken'));
      }
    }
  }, [location.pathname, isLoggedIn, isLoading, from]);

  // In dev mode always allow access for testing
  if (process.env.NODE_ENV === 'development' && location.search.includes('bypass=guest')) {
    console.log("GuestRoute: Development mode - allowing access to auth pages");
    return <Outlet />;
  }

  // If auth is loading, show loading component only during initial load
  if (isLoading && !authCheckedRef.current) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-950">
        <div className="text-white">Checking authentication...</div>
      </div>
    );
  }
  
  // Mark auth as checked
  authCheckedRef.current = true;

  // If user is logged in, redirect to dashboard or requested page
  // But only redirect once to prevent loops
  if (isLoggedIn && !redirectInProgressRef.current && mountedRef.current) {
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
