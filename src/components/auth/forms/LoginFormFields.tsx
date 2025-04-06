
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/context/TranslationProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useAuth } from "@/hooks/use-auth";

interface LoginFormFieldsProps {
  onLoginSuccess?: () => void;
}

const LoginFormFields: React.FC<LoginFormFieldsProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { translate: t } = useTranslation();
  const { toast } = useToast();
  const { login } = useAuth();

  useEffect(() => {
    console.log("LoginFormFields component mounted");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted with email:", email);
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: t('auth.fillAllFields', 'Please fill in all fields'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log("Attempting login with email:", email);
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new auth token
      const newToken = 'sample-auth-token-' + Date.now();
      
      // Use login function from useAuth
      login(newToken);
      
      toast({
        title: t('auth.loginSuccessful', 'Login successful'),
        description: t('auth.welcomeBack', 'Welcome back'),
      });
      
      // Force a short delay to ensure the token is properly set
      setTimeout(() => {
        // Call the success callback if provided
        if (onLoginSuccess) {
          console.log("Calling onLoginSuccess callback");
          onLoginSuccess();
        }
      }, 100);
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: t('auth.loginFailed', 'Login failed'),
        description: t('auth.checkCredentials', 'Please check your credentials and try again'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 relative z-10">
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
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-blue-950/50 border-blue-800/30 text-white placeholder:text-blue-400/50"
            aria-label={t('auth.email', 'Email')}
            autoFocus
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <Label htmlFor="password" className="text-sm font-medium text-blue-100">
            {t('auth.password', 'Password')}
          </Label>
          <Link to="/forgot-password" className="text-sm text-blue-300 hover:text-blue-200 z-10 relative">
            <TranslatedText keyName="auth.forgotPasswordLink" fallback="Forgot Password?" />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="h-4 w-4 text-blue-200" />
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.password', 'Password')}
            className="pl-10 bg-blue-950/50 border-blue-800/30 text-white placeholder:text-blue-400/50"
            aria-label={t('auth.password', 'Password')}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-200 hover:text-blue-100 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 mt-6 h-11"
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
          t('auth.loginButton', 'Login')
        )}
      </Button>
    </form>
  );
};

export default LoginFormFields;
