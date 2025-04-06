
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface GuestRouteProps {
  isLoggedIn: boolean;
}

// GuestRoute is for routes that should only be accessible when NOT logged in
const GuestRoute: React.FC<GuestRouteProps> = ({ isLoggedIn }) => {
  const location = useLocation();
  // Get redirect destination from location state, or default to dashboard
  const from = location.state?.from || "/dashboard";
  
  console.log(`GuestRoute: Current path: ${location.pathname}, isLoggedIn: ${isLoggedIn}`);
  console.log("GuestRoute: Redirect target if logged in:", from);
  console.log("GuestRoute: localStorage token:", localStorage.getItem('authToken'));

  // Always allow access to auth pages for testing purposes
  // This way users can access login/register even when logged in
  if (process.env.NODE_ENV !== 'production') {
    console.log("GuestRoute: Development mode - allowing access to auth pages even when logged in");
    return <Outlet />;
  }

  // If user is already logged in, redirect to dashboard or requested page
  if (isLoggedIn) {
    console.log(`GuestRoute: User is authenticated, redirecting to ${from}`);
    return <Navigate to={from} replace />;
  }
  
  // User is not logged in, show guest content (login/register forms)
  console.log("GuestRoute: User is not authenticated, showing login form");
  return <Outlet />;
};

export default GuestRoute;
