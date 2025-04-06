
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface BackendRouteProps {
  isLoggedIn: boolean;
}

const BackendRoute: React.FC<BackendRouteProps> = ({ isLoggedIn }) => {
  const location = useLocation();
  
  useEffect(() => {
    console.log(`BackendRoute: Current path: ${location.pathname}, isLoggedIn: ${isLoggedIn}`);
    console.log("BackendRoute: localStorage token exists:", !!localStorage.getItem('authToken'));
  }, [isLoggedIn, location.pathname]);
  
  // If user is not logged in, redirect to login page with the current path in state
  if (!isLoggedIn) {
    console.log(`BackendRoute: User not logged in, redirecting to login with return path: ${location.pathname}`);
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location.pathname }}
      />
    );
  }
  
  // User is logged in, show requested content
  console.log("BackendRoute: User is logged in, showing protected content");
  return <Outlet />;
};

export default BackendRoute;
