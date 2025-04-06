
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AuthTester from "@/components/auth/AuthTester";
import LoginFormFields from "./forms/LoginFormFields"; // Import the fields component instead

const LoginForm: React.FC = () => {
  const { t } = useSafeTranslation();
  const location = useLocation();
  
  // Get the redirect path from location state
  const from = location.state?.from || "/dashboard";
  
  console.log("LoginForm - Redirect target after login:", from);

  return (
    <div className="relative z-10 w-full">
      <LoginFormFields />
      {/* Add AuthTester component for development */}
      {process.env.NODE_ENV !== 'production' && <AuthTester />}
    </div>
  );
};

export default LoginForm;
