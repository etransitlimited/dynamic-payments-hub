
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import AuthCard from "@/components/auth/AuthCard";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  const { language } = useLanguage();

  // Get title and description based on language
  const getTitle = () => {
    return language === "zh-CN" ? "重置密码" : 
           language === "zh-TW" ? "重置密碼" : 
           language === "fr" ? "Réinitialiser le mot de passe" :
           language === "es" ? "Restablecer contraseña" :
           "Reset Password";
  };
  
  const getDescription = () => {
    return language === "zh-CN" ? "我们将向您发送重置密码的链接" : 
           language === "zh-TW" ? "我們將向您發送重置密碼的鏈接" : 
           language === "fr" ? "Nous vous enverrons un lien pour réinitialiser votre mot de passe" :
           language === "es" ? "Le enviaremos un enlace para restablecer su contraseña" :
           "We'll send you a link to reset your password";
  };

  return (
    <AuthCard
      title={getTitle()}
      description={getDescription()}
      footer={null}
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
};

export default ForgotPassword;
