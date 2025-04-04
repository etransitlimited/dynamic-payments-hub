
import React from 'react';
import AuthCard from '@/components/auth/AuthCard';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const { t } = useLanguage();
  
  return (
    <AuthCard 
      title={t('auth.forgotPassword')}
      description={t('auth.resetPasswordDescription')}
      footer={
        <div className="text-center text-blue-200 relative z-10">
          <span>{t('auth.checkEmail')}</span>{" "}
          <Link
            to="/login"
            className="text-blue-300 hover:text-blue-200 underline transition-colors relative z-10"
          >
            {t('auth.backToLogin')}
          </Link>
        </div>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
};

export default ForgotPassword;
