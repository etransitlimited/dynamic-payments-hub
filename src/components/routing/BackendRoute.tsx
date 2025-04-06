
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
  }, [isLoggedIn, location.pathname]);
  
  // Force immediate check of authentication status
  const hasToken = !!localStorage.getItem('authToken');
  console.log(`BackendRoute: Direct token check: ${hasToken}`);
  
  // If user is not logged in and has no token, redirect to login page
  if (!isLoggedIn && !hasToken) {
    console.log(`BackendRoute: User not authenticated, redirecting to login with returnTo: ${location.pathname}`);
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location.pathname }}
      />
    );
  }
  
  // User is logged in or has a token, show protected content
  console.log("BackendRoute: User is authenticated, showing protected content");
  return <Outlet />;
};

export default BackendRoute;
