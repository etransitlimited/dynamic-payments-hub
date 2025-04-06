
import React, { useEffect } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import AuthCard from "@/components/auth/AuthCard";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSEO } from "@/utils/seo";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const { t, language } = useSafeTranslation();
  const location = useLocation();
  const { token } = useParams();
  const { getMetadata } = useSEO({});
  const metadata = getMetadata(location.pathname, language);
  
  // Add component render logging for debugging
  useEffect(() => {
    console.log("ResetPassword component mounted, language:", language);
    console.log("ResetPassword token:", token);
    return () => console.log("ResetPassword component unmounted");
  }, [language, token]);

  // Simple form with new password fields
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password reset logic here
    console.log("Password reset submitted for token:", token);
  };

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
        title={t('auth.resetPassword', 'Reset Password')}
        description={t('auth.resetPasswordDescription', 'Enter your new password')}
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              {t('auth.password', 'New Password')}
            </label>
            <input 
              type="password" 
              id="password" 
              className="w-full p-2 border rounded" 
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              {t('auth.confirmPassword', 'Confirm Password')}
            </label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="w-full p-2 border rounded" 
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            {t('auth.resetButton', 'Reset Password')}
          </Button>
        </form>
      </AuthCard>
    </>
  );
};

export default ResetPassword;
