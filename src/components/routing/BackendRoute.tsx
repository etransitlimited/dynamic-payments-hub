
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface BackendRouteProps {
  isLoggedIn: boolean;
}

const BackendRoute: React.FC<BackendRouteProps> = ({ isLoggedIn }) => {
  // If user is not logged in, redirect to login page, otherwise render the child routes
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default BackendRoute;
