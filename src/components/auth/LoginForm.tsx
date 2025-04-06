
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import AuthTester from "@/components/auth/AuthTester";
import LoginFormFields from "./forms/LoginFormFields";
import { useAuth } from "@/hooks/use-auth";

const LoginForm: React.FC = () => {
  const { t } = useSafeTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();
  
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from || "/dashboard";
  
  console.log("LoginForm - Mounted with auth state:", { isLoggedIn, isLoading });
  console.log("LoginForm - Redirect target after login:", from);

  // Handle successful login by navigating to the redirect path
  const handleLoginSuccess = () => {
    console.log("LoginForm - Login successful, redirecting to:", from);
    navigate(from, { replace: true });
  };

  // If still detecting auth state, show loading
  if (isLoading) {
    return <div className="text-white">Checking authentication...</div>;
  }

  return (
    <div className="relative z-10 w-full">
      <LoginFormFields onLoginSuccess={handleLoginSuccess} />
      {/* Add AuthTester component for development */}
      {process.env.NODE_ENV !== 'production' && <AuthTester />}
    </div>
  );
};

export default LoginForm;
