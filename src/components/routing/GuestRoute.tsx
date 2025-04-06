
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface GuestRouteProps {
  isLoggedIn: boolean;
}

// GuestRoute is specifically for routes that should only be accessible when NOT logged in
// (like login, register, forgot password)
const GuestRoute: React.FC<GuestRouteProps> = ({ isLoggedIn }) => {
  // If user is logged in, redirect to dashboard, otherwise render the child routes
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default GuestRoute;
