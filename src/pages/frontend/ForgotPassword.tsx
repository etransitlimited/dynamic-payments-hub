
import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthCard from '@/components/auth/AuthCard';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import AuthFooter from '@/components/auth/AuthFooter';
import { useLanguage } from '@/context/LanguageContext';

const ForgotPassword = () => {
  const { t } = useLanguage();
  
  return (
    <AuthLayout>
      <AuthCard
        title={t('auth.forgotPassword.title')}
        subtitle={t('auth.forgotPassword.subtitle')}
      >
        <ForgotPasswordForm />
        <AuthFooter
          text={t('auth.forgotPassword.rememberPassword')}
          linkText={t('auth.forgotPassword.loginNow')}
          linkHref="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPassword;
