
import React, { useEffect } from "react";
import { useTranslation } from "@/context/TranslationProvider";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import AuthFooter from "@/components/auth/AuthFooter";
import { useLocation } from "react-router-dom";
import { useSEO } from "@/utils/seo";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { translate: t, currentLanguage } = useTranslation();
  const location = useLocation();
  const { getMetadata } = useSEO({});
  const metadata = getMetadata(location.pathname, currentLanguage);

  // Add component render logging for debugging
  useEffect(() => {
    console.log("Login component mounted, language:", currentLanguage);
    console.log("Login route detected, should show register link");
    return () => console.log("Login component unmounted");
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
        title={t('auth.login.title', 'Login')}
        description={t('auth.login.description', 'Enter your credentials to access your account')}
        footer={<AuthFooter isLogin={true} />}
      >
        <LoginForm />
      </AuthCard>
    </>
  );
};

export default Login;
