
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/context/TranslationProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock } from "lucide-react";

const LoginFormFields = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { translate: t } = useTranslation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: t('auth.fillAllFields', 'Please fill in all fields'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('auth.loginSuccessful', 'Login successful'),
        description: t('auth.welcomeBack', 'Welcome back'),
      });
      navigate("/");
    }, 1500);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
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
          />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between">
          <Label htmlFor="password" className="text-sm font-medium text-blue-100">
            {t('auth.password', 'Password')}
          </Label>
          <Link to="/forgot-password" className="text-sm text-blue-300 hover:text-blue-200 z-10 relative">
            {t('auth.forgotPasswordLink', 'Forgot Password?')}
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="h-4 w-4 text-blue-200" />
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.password', 'Password')}
            className="pl-10 bg-blue-700/40 border-blue-600 text-white placeholder:text-blue-300"
          />
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 mt-2"
        disabled={isLoading}
      >
        {isLoading ? t('auth.processing', 'Processing...') : t('auth.loginButton', 'Login')}
      </Button>
    </form>
  );
};

export default LoginFormFields;
