
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
        description={t('auth.login.loginDescription')}
        footer={
          <AuthFooter 
            isLogin={true}
          />
        }
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;
