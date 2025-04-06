
import React, { useEffect } from "react";
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
  
  useEffect(() => {
    console.log("LoginForm - Mounted with auth state:", { isLoggedIn, isLoading });
    console.log("LoginForm - Redirect target after login:", from);
    console.log("LoginForm - Location state:", location.state);
    console.log("LoginForm - localStorage token:", localStorage.getItem('authToken'));
  }, [from, location.state, isLoggedIn, isLoading]);

  // If already logged in, redirect immediately
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if ((isLoggedIn || token) && !isLoading) {
      console.log("LoginForm - Already logged in, redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate, from]);

  // Handle successful login by navigating to the redirect path
  const handleLoginSuccess = () => {
    console.log("LoginForm - Login successful, redirecting to:", from);
    
    // Small delay to ensure state updates are processed
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 100);
  };

  // If still detecting auth state, show nothing to prevent flash
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
