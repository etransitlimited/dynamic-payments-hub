
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GuestRoute from "./GuestRoute";
import FrontendRoute from "./FrontendRoute";
import BackendRoute from "./BackendRoute";
import { PageLoading } from "./LoadingComponents";
import { useAuth } from "@/hooks/use-auth";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import AuthLayout from "@/components/auth/AuthLayout";

const RouteComponents = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Routes>
      {/* Guest Routes with AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route element={<GuestRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Temporarily comment out other guest routes until we create those components */}
          {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> 
          <Route path="/invitation/:token" element={<InvitationPage />} /> */}
        </Route>
      </Route>

      {/* Frontend Routes */}
      <Route element={<FrontendRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Temporarily comment out other frontend routes */}
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} /> */}
      </Route>

      {/* Backend Routes (Dashboard) - Temporarily disabled */}
      <Route element={<BackendRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/dashboard" element={<Navigate to="/login" replace />} />
        {/* <Route path="/cards" element={<Cards />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/analytics" element={<Analytics />} /> */}
      </Route>

      {/* Not Found Route */}
      <Route path="/404" element={<div>Page Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default RouteComponents;
