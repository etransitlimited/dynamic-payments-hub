
import React, { useEffect, useRef } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import AuthFooter from "@/components/auth/AuthFooter";
import { useLocation, useNavigate } from "react-router-dom";
import { useSEO } from "@/utils/seo";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/use-auth";

const Login = () => {
  const { t, language } = useSafeTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { getMetadata } = useSEO({});
  const metadata = getMetadata(location.pathname, language);
  const { isLoggedIn } = useAuth();
  const returnToPathRef = useRef<string | null>(null);
  
  // On mount, store returnTo path to avoid losing it during language changes
  useEffect(() => {
    if (location.state && typeof location.state === 'object' && 'from' in location.state) {
      const fromPath = location.state.from as string;
      console.log(`Login: Storing return path: ${fromPath}`);
      returnToPathRef.current = fromPath;
    }
  }, []);
  
  // Redirect to returnTo path if user is already logged in
  useEffect(() => {
    if (isLoggedIn && returnToPathRef.current) {
      console.log(`Login: Already logged in, redirecting to: ${returnToPathRef.current}`);
      navigate(returnToPathRef.current, { replace: true });
    } else if (isLoggedIn) {
      console.log('Login: Already logged in, redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    }
  }, [isLoggedIn, navigate]);

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
