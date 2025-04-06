
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/context/TranslationProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

interface ForgotPasswordFormFieldsProps {
  onResetSuccess?: () => void;
}

const ForgotPasswordFormFields: React.FC<ForgotPasswordFormFieldsProps> = ({ 
  onResetSuccess 
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { translate: t } = useTranslation();
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
    
    try {
      // Simulate password reset email being sent with reduced timeout for better performance
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: t('auth.resetLinkSent', 'Reset Link Sent'),
        description: t('auth.checkEmail', 'Please check your email'),
      });
      
      // Call onResetSuccess if provided
      if (onResetSuccess) {
        onResetSuccess();
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: t('auth.resetError', 'Reset Error'),
        description: t('auth.resetErrorDescription', 'Failed to send reset link. Please try again.'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-blue-100 text-sm font-medium">
          {t('auth.email', 'Email')}
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Mail className="h-4 w-4 text-blue-300" />
          </div>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="pl-10 bg-blue-950/60 border border-blue-800/50 text-white placeholder:text-blue-400/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            autoFocus
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 h-12 font-medium text-base"
        disabled={isLoading}
      >
        {isLoading ? t('auth.processing', 'Processing...') : t('auth.resetButton', 'Send Reset Link')}
      </Button>
    </form>
  );
};

export default ForgotPasswordFormFields;
