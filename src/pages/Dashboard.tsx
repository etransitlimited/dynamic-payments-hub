
import React from "react";
import { Navigate } from "react-router-dom";
import DashboardHome from "@/pages/dashboard/DashboardHome";

const Dashboard = () => {
  // Return the actual dashboard component instead of redirecting
  return <DashboardHome />;
};

export default Dashboard;
