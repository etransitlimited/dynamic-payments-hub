
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import AuthFooter from "@/components/auth/AuthFooter";

const Login = () => {
  const { language } = useLanguage();

  // Get title and description based on language
  const getTitle = () => {
    return language === "zh-CN" ? "登录" : language === "zh-TW" ? "登錄" : "Login";
  };
  
  const getDescription = () => {
    return language === "zh-CN" ? "输入您的信息以访问您的账户" : 
           language === "zh-TW" ? "輸入您的信息以訪問您的賬戶" : 
           "Enter your credentials to access your account";
  };

  return (
    <AuthCard
      title={getTitle()}
      description={getDescription()}
      footer={<AuthFooter isLogin={true} />}
    >
      <LoginForm />
    </AuthCard>
  );
};

export default Login;
