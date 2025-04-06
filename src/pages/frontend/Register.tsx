
import React from 'react';
import AuthCard from '@/components/auth/AuthCard';
import RegisterForm from '@/components/auth/RegisterForm';
import AuthFooter from '@/components/auth/AuthFooter';
import { useLanguage } from '@/context/LanguageContext';

const Register = () => {
  const { t } = useLanguage();
  
  return (
    <AuthCard 
      title={t('auth.register.title')}
      description={t('auth.register.description')}
      footer={
        <AuthFooter 
          isLogin={false}
        />
      }
    >
      <RegisterForm />
    </AuthCard>
  );
};

export default Register;
