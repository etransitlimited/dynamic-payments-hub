
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/context/TranslationProvider";

interface AuthFooterProps {
  isLogin?: boolean;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ isLogin = false }) => {
  const { translate: t } = useTranslation();
  
  return (
    <div className="text-center my-4 text-blue-200 text-sm relative z-10">
      {isLogin ? (
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-1">
          <span>{t('auth.dontHaveAccount', "Don't have an account?")}</span>
          <Link 
            to="/register" 
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            {t('auth.registerButton', 'Register')}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-1">
          <span>{t('auth.alreadyHaveAccount', 'Already have an account?')}</span>
          <Link 
            to="/login" 
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            {t('auth.loginButton', 'Login')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthFooter;
