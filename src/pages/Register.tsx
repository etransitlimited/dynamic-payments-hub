
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthFooter from "@/components/auth/AuthFooter";

const Register = () => {
  const { language } = useLanguage();

  // Get title and description based on language
  const getTitle = () => {
    return language === "zh-CN" ? "创建账户" : language === "zh-TW" ? "創建賬戶" : "Create an account";
  };
  
  const getDescription = () => {
    return language === "zh-CN" ? "输入您的信息以创建账户" : 
           language === "zh-TW" ? "輸入您的信息以創建賬戶" : 
           "Enter your information to create an account";
  };

  return (
    <AuthLayout>
      <AuthCard
        title={getTitle()}
        description={getDescription()}
        footer={<AuthFooter isLogin={false} />}
      >
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default Register;
