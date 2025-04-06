
import React, { useEffect, useState } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import AuthCard from "@/components/auth/AuthCard";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSEO } from "@/utils/seo";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const { t, language } = useSafeTranslation();
  const location = useLocation();
  const { token } = useParams();
  const { getMetadata } = useSEO({});
  const metadata = getMetadata(location.pathname, language);
  const { toast } = useToast();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Add component render logging for debugging
  useEffect(() => {
    console.log("ResetPassword component mounted, language:", language);
    console.log("ResetPassword token:", token);
    return () => console.log("ResetPassword component unmounted");
  }, [language, token]);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!password || !confirmPassword) {
      toast({
        title: t('auth.formErrors.allFields', 'Please fill in all fields'),
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: t('auth.formErrors.passwordsMatch', 'Passwords don\'t match'),
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('auth.passwordResetSuccess', 'Password Reset Successful'),
        description: t('auth.passwordResetSuccessDesc', 'Your password has been reset successfully'),
      });
      
      // Redirect to login page after successful password reset
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }, 1500);
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
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors relative z-10"
            >
              {t('auth.backToLogin', 'Back to Login')}
            </Link>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-blue-100 text-sm font-medium">
              {t('auth.password', 'New Password')}
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-4 w-4 text-blue-300" />
              </div>
              <Input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-blue-950/60 border border-blue-800/50 text-white placeholder:text-blue-400/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-blue-100 text-sm font-medium">
              {t('auth.confirmPassword', 'Confirm Password')}
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-4 w-4 text-blue-300" />
              </div>
              <Input 
                type="password" 
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 bg-blue-950/60 border border-blue-800/50 text-white placeholder:text-blue-400/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 h-12 mt-2 font-medium text-base"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('auth.processing', 'Processing...')}
              </span>
            ) : (
              t('auth.resetButton', 'Reset Password')
            )}
          </Button>
        </form>
      </AuthCard>
    </>
  );
};

export default ResetPassword;
