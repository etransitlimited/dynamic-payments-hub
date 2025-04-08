
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import LoginFormFields from "./forms/LoginFormFields";
import { useAuth } from "@/hooks/use-auth";

const LoginForm: React.FC = () => {
  const { t } = useSafeTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();
  
  // Get redirect path from location state, or default to dashboard
  const from = location.state?.from || "/dashboard";
  
  console.log("LoginForm - Mounted with auth state:", { isLoggedIn, isLoading });
  console.log("LoginForm - Redirect target after login:", from);
  console.log("LoginForm - Token in localStorage:", localStorage.getItem('authToken'));

  // If already logged in, redirect to dashboard or original target
  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      console.log("User already logged in, redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate, from]);

  // Handle successful login by navigating to redirect path
  const handleLoginSuccess = () => {
    console.log("LoginForm - Login successful, redirecting to:", from);
    // Use slight delay to ensure auth state has updated
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 300);
  };

  // If still checking auth state, show simplified loading
  if (isLoading) {
    return <div className="flex justify-center py-4"><span className="text-blue-200">Loading...</span></div>;
  }

  return (
    <div className="relative z-10 w-full">
      <LoginFormFields onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginForm;
