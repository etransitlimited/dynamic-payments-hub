
import React, { useEffect } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import AuthCard from "@/components/auth/AuthCard";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useLocation } from "react-router-dom";
import { useSEO } from "@/utils/seo";
import { Helmet } from "react-helmet-async";

const ForgotPassword = () => {
  const { t, language } = useSafeTranslation();
  const location = useLocation();
  const { getMetadata } = useSEO({});
  const metadata = getMetadata(location.pathname, language);
  
  // Add component render logging for debugging
  useEffect(() => {
    console.log("ForgotPassword component mounted, language:", language);
    return () => console.log("ForgotPassword component unmounted");
  }, [language]);

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
        title={t('auth.forgotPassword.title', 'Forgot Password')}
        description={t('auth.forgotPassword.description', 'We\'ll send you a link to reset your password')}
        footer={<div />} // Provide an empty footer to satisfy the type requirement
      >
        <ForgotPasswordForm />
      </AuthCard>
    </>
  );
};

export default ForgotPassword;

