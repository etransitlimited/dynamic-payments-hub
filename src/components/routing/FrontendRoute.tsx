
import React from "react";
import { Outlet } from "react-router-dom";

interface FrontendRouteProps {
  isLoggedIn: boolean;
}

// FrontendRoute is used for public routes that don't require authentication
// but may behave differently if the user is authenticated
const FrontendRoute: React.FC<FrontendRouteProps> = () => {
  return <Outlet />;
};

export default FrontendRoute;
