
import React, { useEffect } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthFooter from "@/components/auth/AuthFooter";
import { useLocation } from "react-router-dom";
import { useSEO } from "@/utils/seo";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { t, language } = useSafeTranslation();
  const location = useLocation();
  const { getMetadata } = useSEO({});
  const metadata = getMetadata(location.pathname, language);
  
  // Enhanced logging for debugging
  useEffect(() => {
    console.log("Register component mounted, language:", language);
    console.log("Register route detected at path:", location.pathname);
    console.log("Register component rendering with isLogin=false for AuthFooter");
    return () => console.log("Register component unmounted");
  }, [language, location.pathname]);

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
