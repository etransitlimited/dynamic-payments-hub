
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

interface AuthFooterProps {
  isLogin: boolean;
}

const AuthFooter = ({ isLogin }: AuthFooterProps) => {
  const { language } = useLanguage();
  
  return (
    <p className="text-sm text-blue-300">
      {isLogin 
        ? (language === "zh-CN" ? "还没有账户?" : language === "zh-TW" ? "還沒有賬戶?" : "Don't have an account?")
        : (language === "zh-CN" ? "已有账户?" : language === "zh-TW" ? "已有賬戶?" : "Already have an account?")}{" "}
      <Link 
        to={isLogin ? "/register" : "/login"} 
        className="text-blue-400 hover:text-blue-300 font-medium"
      >
        {isLogin 
          ? (language === "zh-CN" ? "注册" : language === "zh-TW" ? "註冊" : "Register")
          : (language === "zh-CN" ? "登录" : language === "zh-TW" ? "登錄" : "Login")}
      </Link>
    </p>
  );
};

export default AuthFooter;
