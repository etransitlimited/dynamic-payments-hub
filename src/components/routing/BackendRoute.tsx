
import React, { useEffect, memo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface BackendRouteProps {
  isLoggedIn: boolean;
}

const BackendRoute: React.FC<BackendRouteProps> = ({ isLoggedIn }) => {
  const location = useLocation();
  
  // Enhanced logging to debug route access issues
  useEffect(() => {
    if (isLoggedIn) {
      console.log("BackendRoute: User is logged in, granting access to:", location.pathname);
    } else {
      console.log("BackendRoute: User is not logged in, redirecting to login from:", location.pathname);
      console.log("BackendRoute: Auth state detail:", { isLoggedIn });
      
      // Log localStorage token state for debugging
      const token = localStorage.getItem('authToken');
      console.log("BackendRoute: Token in localStorage:", !!token);
    }
  }, [isLoggedIn, location.pathname]);
  
  // If user is not logged in, redirect to login page with a state parameter to redirect back after login
  if (!isLoggedIn) {
    console.log(`BackendRoute: Redirecting to login from ${location.pathname}`);
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location.pathname }}
      />
    );
  }
  
  // User is logged in, show content
  return <Outlet />;
};

// Memoize the component for better performance
export default memo(BackendRoute);
