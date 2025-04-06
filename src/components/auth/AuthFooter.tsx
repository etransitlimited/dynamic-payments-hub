
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/context/TranslationProvider";

interface AuthFooterProps {
  isLogin: boolean;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ isLogin }) => {
  const { translate: t } = useTranslation();

  return (
    <div className="text-center text-blue-200 relative z-10">
      <span>{isLogin ? t("auth.dontHaveAccount", "Don't have an account?") : t("auth.alreadyHaveAccount", "Already have an account?")}</span>{" "}
      <Link
        to={isLogin ? "/register" : "/login"}
        className="text-blue-300 hover:text-blue-200 underline transition-colors relative z-10"
      >
        {isLogin ? t("auth.registerButton", "Register") : t("auth.loginButton", "Login")}
      </Link>
    </div>
  );
};

export default AuthFooter;
