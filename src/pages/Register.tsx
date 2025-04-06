
import React, { useEffect } from "react";
import { useTranslation } from "@/context/TranslationProvider";
import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthFooter from "@/components/auth/AuthFooter";
import { useLocation } from "react-router-dom";
import { useSEO } from "@/utils/seo";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { translate: t, currentLanguage } = useTranslation();
  const location = useLocation();
  const { getMetadata } = useSEO({});
  const metadata = getMetadata(location.pathname, currentLanguage);
  
  // Add component render logging for debugging
  useEffect(() => {
    console.log("Register component mounted, language:", currentLanguage);
    return () => console.log("Register component unmounted");
  }, [currentLanguage]);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        {metadata.meta.map((meta, index) => (
          <meta key={`meta-${index}`} {...meta} />
        ))}
        {metadata.script.map((script, index) => (
          <script key={`script-${index}`} {...script} />
        ))}
      </Helmet>
      <AuthCard
        title={t('auth.register.title', 'Register')}
        description={t('auth.register.description', 'Enter your information to create an account')}
        footer={<AuthFooter isLogin={false} />}
      >
        <RegisterForm />
      </AuthCard>
    </>
  );
};

export default Register;
