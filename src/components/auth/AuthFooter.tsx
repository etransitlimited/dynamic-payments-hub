
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface AuthFooterProps {
  isLogin: boolean;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ isLogin }) => {
  const { t } = useSafeTranslation();
  
  // Enhanced debugging for the component mount and props
  useEffect(() => {
    console.log(`AuthFooter mounting with isLogin=${isLogin}`);
    console.log(`AuthFooter target path: ${isLogin ? "/register" : "/login"}`);
    
    return () => {
      console.log(`AuthFooter unmounting with isLogin=${isLogin}`);
    };
  }, [isLogin]);

  // Use Link component for direct navigation without page reload
  const targetPath = isLogin ? "/register" : "/login";
  const textKey = isLogin ? "auth.dontHaveAccount" : "auth.alreadyHaveAccount";
  const buttonKey = isLogin ? "auth.registerButton" : "auth.loginButton";
  const fallbackText = isLogin ? "Don't have an account?" : "Already have an account?";
  const fallbackButton = isLogin ? "Register" : "Login";
  const testId = isLogin ? "register-link" : "login-link";
  
  return (
    <div className="text-center text-blue-200 relative z-10 mt-6">
      <span className="opacity-90">
        {t(textKey, fallbackText)}
      </span>{" "}
      <Link
        to={targetPath}
        className="text-blue-300 hover:text-blue-200 underline transition-colors relative z-10 bg-transparent border-none cursor-pointer"
        data-testid={testId}
      >
        {t(buttonKey, fallbackButton)}
      </Link>
    </div>
  );
};

export default AuthFooter;
