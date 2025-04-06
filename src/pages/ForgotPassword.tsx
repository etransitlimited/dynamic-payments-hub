
import React, { useEffect } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import AuthCard from "@/components/auth/AuthCard";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Link } from "react-router-dom";
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
        footer={
          <div className="text-center text-blue-200 relative z-10">
            <Link
              to="/login"
              className="text-blue-300 hover:text-blue-200 underline transition-colors relative z-10"
            >
              {t('auth.backToLogin', 'Back to Login')}
            </Link>
          </div>
        }
      >
        <ForgotPasswordForm />
      </AuthCard>
    </>
  );
};

export default ForgotPassword;
