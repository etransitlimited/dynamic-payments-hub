
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
        description={t('auth.register.registerDescription')}
        footer={
          <AuthFooter 
            isLogin={false}
          />
        }
      >
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default Register;
