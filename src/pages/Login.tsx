
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import AuthFooter from "@/components/auth/AuthFooter";

const Login = () => {
  const { t } = useLanguage();

  return (
    <AuthCard
      title={t('auth.login.title')}
      description={t('auth.login.description')}
      footer={<AuthFooter isLogin={true} />}
    >
      <LoginForm />
    </AuthCard>
  );
};

export default Login;
