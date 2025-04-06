import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GuestRoute from "./GuestRoute";
import FrontendRoute from "./FrontendRoute";
import BackendRoute from "./BackendRoute";
import { PageLoading } from "./LoadingComponents";
import { useAuth } from "@/hooks/use-auth";

// Lazy-loaded components
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const Contact = lazy(() => import("@/pages/Contact"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const InvitationPage = lazy(() => import("@/pages/InvitationPage"));

// Dashboard and related routes
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Cards = lazy(() => import("@/pages/dashboard/Cards"));
const Transactions = lazy(() => import("@/pages/dashboard/Transactions"));
const Wallet = lazy(() => import("@/pages/dashboard/Wallet"));
const AccountSettings = lazy(() => import("@/pages/dashboard/AccountSettings"));
const Analytics = lazy(() => import("@/pages/dashboard/Analytics"));

const RouteComponents = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Routes>
      {/* Frontend Routes */}
      <Route element={<FrontendRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Route>

      {/* Guest Routes */}
      <Route element={<GuestRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/invitation/:token" element={<InvitationPage />} />
      </Route>

      {/* Backend Routes (Dashboard) */}
      <Route element={<BackendRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>

      {/* Not Found Route */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default RouteComponents;
