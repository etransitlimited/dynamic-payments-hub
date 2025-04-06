
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/context/TranslationProvider";
import TranslatedText from "@/components/translation/TranslatedText";

interface AuthFooterProps {
  isLogin: boolean;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ isLogin }) => {
  const { translate: t } = useTranslation();

  return (
    <div className="text-center text-blue-200 relative z-10">
      <span className="opacity-90">
        <TranslatedText 
          keyName={isLogin ? "auth.dontHaveAccount" : "auth.alreadyHaveAccount"} 
          fallback={isLogin ? "Don't have an account?" : "Already have an account?"} 
        />
      </span>{" "}
      <Link
        to={isLogin ? "/register" : "/login"}
        className="text-blue-300 hover:text-blue-200 underline transition-colors relative z-10"
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
