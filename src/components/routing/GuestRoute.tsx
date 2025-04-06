
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface GuestRouteProps {
  isLoggedIn: boolean;
}

// GuestRoute is specifically for routes that should only be accessible when NOT logged in
// (like login, register, forgot password)
const GuestRoute: React.FC<GuestRouteProps> = ({ isLoggedIn }) => {
  const location = useLocation();
  
  // Add logging for debugging auth routes
  useEffect(() => {
    console.log("GuestRoute: path:", location.pathname, "isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
      console.log("GuestRoute: User is logged in, redirecting to dashboard");
    }
  }, [isLoggedIn, location.pathname]);

  // If user is logged in, redirect to dashboard, otherwise render the child routes
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default GuestRoute;
