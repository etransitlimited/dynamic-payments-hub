
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

interface AuthFooterProps {
  isLogin: boolean;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ isLogin }) => {
  const { t } = useLanguage();

  return (
    <div className="text-center text-blue-200 relative z-10">
      <span>{isLogin ? t("auth.dontHaveAccount") : t("auth.alreadyHaveAccount")}</span>{" "}
      <Link
        to={isLogin ? "/register" : "/login"}
        className="text-blue-300 hover:text-blue-200 underline transition-colors relative z-10"
      >
        {isLogin ? t("auth.registerButton") : t("auth.loginButton")}
      </Link>
    </div>
  );
};

export default AuthFooter;
