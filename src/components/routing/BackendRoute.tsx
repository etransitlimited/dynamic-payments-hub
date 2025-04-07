
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface BackendRouteProps {
  isLoggedIn: boolean;
}

const BackendRoute: React.FC<BackendRouteProps> = ({ isLoggedIn }) => {
  const location = useLocation();
  
  useEffect(() => {
    console.log(`BackendRoute: Current path: ${location.pathname}, isLoggedIn: ${isLoggedIn}`);
    console.log("BackendRoute: localStorage token:", localStorage.getItem('authToken'));
  }, [location.pathname, isLoggedIn]);
  
  // For development and testing, allow bypassing auth check
  if (process.env.NODE_ENV !== 'production' && 
      (location.search.includes('bypass=auth') || localStorage.getItem('bypassAuth'))) {
    console.log("BackendRoute: Auth bypass detected, allowing access to protected route");
    return <Outlet />;
  }
  
  // If user is not logged in, redirect to login page with returnTo path
  if (!isLoggedIn) {
    console.log(`BackendRoute: User not authenticated, redirecting to login with returnTo: ${location.pathname}`);
    // Use state to remember where user was trying to go
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location.pathname }}
      />
    );
  }
  
  // User is logged in, show protected content
  console.log("BackendRoute: User is authenticated, showing protected content");
  return <Outlet />;
};

export default BackendRoute;
