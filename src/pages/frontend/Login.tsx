
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
      <AuthCard title={t('auth.login.title')}>
        <p className="text-center text-muted-foreground mb-6">{t('auth.login.loginDescription')}</p>
        <LoginForm />
        <AuthFooter 
          question={t('auth.login.dontHaveAccount')}
          linkText={t('auth.register')}
          linkHref="/register"
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;
