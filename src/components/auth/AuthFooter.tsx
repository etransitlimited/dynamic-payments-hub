
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/context/TranslationProvider";
import TranslatedText from "@/components/translation/TranslatedText";

interface AuthFooterProps {
  isLogin: boolean;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ isLogin }) => {
  const { translate: t } = useTranslation();
  
  // Enhanced debugging for the component mount and props
  useEffect(() => {
    console.log(`AuthFooter mounting with isLogin=${isLogin}`);
    console.log(`AuthFooter target path: ${isLogin ? "/register" : "/login"}`);
    
    return () => {
      console.log(`AuthFooter unmounting with isLogin=${isLogin}`);
    };
  }, [isLogin]);

  // Use a direct Link component instead of navigation hooks
  const targetPath = isLogin ? "/register" : "/login";
  
  return (
    <div className="text-center text-blue-200 relative z-10 mt-6">
      <span className="opacity-90">
        <TranslatedText 
          keyName={isLogin ? "auth.dontHaveAccount" : "auth.alreadyHaveAccount"} 
          fallback={isLogin ? "Don't have an account?" : "Already have an account?"} 
        />
      </span>{" "}
      <Link
        to={targetPath}
        className="text-blue-300 hover:text-blue-200 underline transition-colors relative z-10 bg-transparent border-none cursor-pointer"
        data-testid={isLogin ? "register-link" : "login-link"}
      >
        <TranslatedText 
          keyName={isLogin ? "auth.registerButton" : "auth.loginButton"} 
          fallback={isLogin ? "Register" : "Login"} 
        />
      </Link>
    </div>
  );
};

export default AuthFooter;
