
import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/LoginForm';
import AuthFooter from '@/components/auth/AuthFooter';
import { useLanguage } from '@/context/LanguageContext';

const Login = () => {
  const { t } = useLanguage();
  
  return (
    <AuthLayout>
      <AuthCard
        title={t('auth.login.title')}
        subtitle={t('auth.login.subtitle')}
      >
        <LoginForm />
        <AuthFooter
          text={t('auth.login.noAccount')}
          linkText={t('auth.login.registerNow')}
          linkHref="/register"
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;
