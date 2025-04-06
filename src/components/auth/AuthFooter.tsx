
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/context/TranslationProvider";
import TranslatedText from "@/components/translation/TranslatedText";

interface AuthFooterProps {
  isLogin: boolean;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ isLogin }) => {
  const { translate: t } = useTranslation();
  const navigate = useNavigate();
  
  // Add more detailed component render logging for debugging
  useEffect(() => {
    console.log(`AuthFooter rendering with isLogin: ${isLogin}`);
    console.log(`AuthFooter will navigate to: ${isLogin ? "/register" : "/login"} when clicked`);
  }, [isLogin]);
  
  // Use a direct navigation handler with immediate callback
  const handleNavigation = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const path = isLogin ? "/register" : "/login";
    console.log(`AuthFooter: Navigating to ${path}`);
    navigate(path, { replace: true });
  }, [isLogin, navigate]);

  return (
    <div className="text-center text-blue-200 relative z-10 mt-6">
      <span className="opacity-90">
        <TranslatedText 
          keyName={isLogin ? "auth.dontHaveAccount" : "auth.alreadyHaveAccount"} 
          fallback={isLogin ? "Don't have an account?" : "Already have an account?"} 
        />
      </span>{" "}
      <button
        onClick={handleNavigation}
        className="text-blue-300 hover:text-blue-200 underline transition-colors relative z-10 bg-transparent border-none cursor-pointer"
        data-testid={isLogin ? "register-link" : "login-link"}
        type="button"
      >
        <TranslatedText 
          keyName={isLogin ? "auth.registerButton" : "auth.loginButton"} 
          fallback={isLogin ? "Register" : "Login"} 
        />
      </button>
    </div>
  );
};

export default AuthFooter;
