
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AuthTester from "@/components/auth/AuthTester";
import LoginFormFields from "./forms/LoginFormFields"; 

const LoginForm: React.FC = () => {
  const { t } = useSafeTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the redirect path from location state
  const from = location.state?.from || "/dashboard";
  
  useEffect(() => {
    console.log("LoginForm - Redirect target after login:", from);
    console.log("LoginForm - Current path:", location.pathname);
    console.log("LoginForm - Location state:", location.state);
  }, [from, location.pathname, location.state]);

  // Handle successful login
  const handleLoginSuccess = () => {
    console.log("LoginForm - Login successful, redirecting to:", from);
    // Navigate to the redirect path
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
