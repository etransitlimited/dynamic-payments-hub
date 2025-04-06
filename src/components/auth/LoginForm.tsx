
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import AuthTester from "@/components/auth/AuthTester";
import LoginFormFields from "./forms/LoginFormFields";

const LoginForm: React.FC = () => {
  const { t } = useSafeTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from || "/dashboard";
  
  useEffect(() => {
    console.log("LoginForm - Mounted");
    console.log("LoginForm - Redirect target after login:", from);
    console.log("LoginForm - Location state:", location.state);
  }, [from, location.state]);

  // Handle successful login by navigating to the redirect path
  const handleLoginSuccess = () => {
    console.log("LoginForm - Login successful, redirecting to:", from);
    navigate(from, { replace: true });
  };

  return (
    <div className="relative z-10 w-full">
      <LoginFormFields onLoginSuccess={handleLoginSuccess} />
      {/* Add AuthTester component for development */}
      {process.env.NODE_ENV !== 'production' && <AuthTester />}
    </div>
  );
};

export default LoginForm;
