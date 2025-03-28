
import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthCard from '@/components/auth/AuthCard';
import RegisterForm from '@/components/auth/RegisterForm';
import AuthFooter from '@/components/auth/AuthFooter';
import { useLanguage } from '@/context/LanguageContext';

const Register = () => {
  const { t } = useLanguage();
  
  return (
    <AuthLayout>
      <AuthCard
        title={t('auth.register.title')}
        subtitle={t('auth.register.subtitle')}
      >
        <RegisterForm />
        <AuthFooter
          text={t('auth.register.haveAccount')}
          linkText={t('auth.register.loginNow')}
          linkHref="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default Register;
