
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

interface FrontendRouteProps {
  isLoggedIn: boolean;
}

// FrontendRoute is used for public routes that don't require authentication
// but may behave differently if the user is authenticated
const FrontendRoute: React.FC<FrontendRouteProps> = ({ isLoggedIn }) => {
  const location = useLocation();
  
  // Add logging for debugging frontend routes
  useEffect(() => {
    console.log("FrontendRoute: path:", location.pathname, "isLoggedIn:", isLoggedIn);
    
    // Log localStorage token state for debugging
    const token = localStorage.getItem('authToken');
    console.log("FrontendRoute: Token in localStorage:", !!token);
  }, [isLoggedIn, location.pathname]);
  
  return <Outlet />;
};

export default FrontendRoute;
