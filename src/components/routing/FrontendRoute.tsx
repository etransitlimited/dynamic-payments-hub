
import React from "react";
import { Outlet } from "react-router-dom";

interface FrontendRouteProps {
  isLoggedIn: boolean;
}

const FrontendRoute: React.FC<FrontendRouteProps> = () => {
  return <Outlet />;
};

export default FrontendRoute;
