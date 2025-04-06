
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";

interface AuthFooterProps {
  isLogin: boolean;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ isLogin }) => {
  const { language } = useLanguage();

  const getFooterText = () => {
    if (isLogin) {
      return language === "zh-CN" ? "还没有账户?" : 
             language === "zh-TW" ? "還沒有賬戶?" : 
             language === "fr" ? "Vous n'avez pas de compte ?" :
             language === "es" ? "¿No tiene una cuenta?" :
             "Don't have an account?";
    } else {
      return language === "zh-CN" ? "已有账户?" : 
             language === "zh-TW" ? "已有賬戶?" : 
             language === "fr" ? "Vous avez déjà un compte ?" :
             language === "es" ? "¿Ya tiene una cuenta?" :
             "Already have an account?";
    }
  };

  const getLinkText = () => {
    if (isLogin) {
      return language === "zh-CN" ? "注册" : 
             language === "zh-TW" ? "註冊" : 
             language === "fr" ? "S'inscrire" :
             language === "es" ? "Registrarse" :
             "Register";
    } else {
      return language === "zh-CN" ? "登录" : 
             language === "zh-TW" ? "登錄" : 
             language === "fr" ? "Se connecter" :
             language === "es" ? "Iniciar sesión" :
             "Login";
    }
  };

  return (
    <div className="text-center text-blue-200 relative z-10">
      <span>{getFooterText()}</span>{" "}
      <Link
        to={isLogin ? "/register" : "/login"}
        className="text-blue-300 hover:text-blue-200 underline transition-colors relative z-10"
      >
        {getLinkText()}
      </Link>
    </div>
  );
};

export default AuthFooter;
