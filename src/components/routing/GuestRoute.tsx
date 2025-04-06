
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface GuestRouteProps {
  isLoggedIn: boolean;
}

// GuestRoute is specifically for routes that should only be accessible when NOT logged in
// (like login, register, forgot password)
const GuestRoute: React.FC<GuestRouteProps> = ({ isLoggedIn }) => {
  const location = useLocation();
  const from = location.state?.from || "/dashboard";
  
  // Add logging for debugging auth routes
  useEffect(() => {
    console.log("GuestRoute: path:", location.pathname, "isLoggedIn:", isLoggedIn);
    console.log("GuestRoute: Redirect target if logged in:", from);
    
    if (isLoggedIn) {
      console.log("GuestRoute: User is logged in, redirecting to:", from);
    } else {
      console.log("GuestRoute: User is not logged in, showing guest content");
    }
  }, [isLoggedIn, location.pathname, from]);

  // If user is logged in, redirect to the 'from' path (or dashboard by default), otherwise render the child routes
  return isLoggedIn ? <Navigate to={from} replace /> : <Outlet />;
};

export default GuestRoute;
