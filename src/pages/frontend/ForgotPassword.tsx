
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
      <AuthCard title={t('auth.forgotPassword')}>
        <p className="text-center text-muted-foreground mb-6">{t('auth.resetPasswordDescription')}</p>
        <ForgotPasswordForm />
        <AuthFooter 
          question={t('auth.checkEmail')}
          linkText={t('auth.backToLogin')}
          linkHref="/login"
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPassword;
