
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/context/TranslationProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const ForgotPasswordFormFields = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { translate: t, currentLanguage } = useTranslation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: t('auth.formErrors.emailRequired', 'Please enter your email'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate password reset email being sent
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('auth.resetLinkSent', 'Reset Link Sent'),
        description: t('auth.checkEmail', 'Please check your email'),
      });
      
      // Optionally redirect to login page after showing toast
      // setTimeout(() => navigate('/login'), 2000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-blue-100">
          {t('auth.email', 'Email')}
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Mail className="h-4 w-4 text-blue-200" />
          </div>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.email', 'Email')}
            className="pl-10 bg-blue-700/40 border-blue-600 text-white placeholder:text-blue-300"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-blue-500 hover:bg-blue-400 text-white"
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
          t('auth.resetButton', 'Send Reset Link')
        )}
      </Button>
    </form>
  );
};

export default ForgotPasswordFormFields;
