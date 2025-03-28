
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
      <AuthCard title={t('auth.register.title')}>
        <p className="text-center text-muted-foreground mb-6">{t('auth.register.registerDescription')}</p>
        <RegisterForm />
        <AuthFooter 
          question={t('auth.register.alreadyHaveAccount')}
          linkText={t('auth.login')}
          linkHref="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default Register;
