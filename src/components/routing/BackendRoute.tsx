
import React, { useEffect } from "react";
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
    }
  }, [isLoggedIn, location.pathname]);
  
  // If user is not logged in, redirect to login page with a state parameter to redirect back after login
  return isLoggedIn ? (
    <Outlet /> 
  ) : (
    <Navigate 
      to="/login" 
      replace 
      state={{ from: location.pathname }}  // Store the current location for redirecting back after login
    />
  );
};

export default BackendRoute;
