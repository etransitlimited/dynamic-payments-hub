
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/context/TranslationProvider";
import { Mail, Lock, User } from "lucide-react";

const RegisterFormFields = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { translate: t } = useTranslation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password || !confirmPassword) {
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

    if (!acceptTerms) {
      toast({
        title: t('auth.formErrors.acceptTerms', 'Please accept the terms and conditions'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('auth.registerSuccess.title', 'Registration successful'),
        description: t('auth.registerSuccess.description', 'Your account has been created'),
      });
      navigate("/login");
    }, 1500);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-5">
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
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-blue-950/60 border border-blue-800/50 text-white placeholder:text-blue-400/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            autoFocus
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-blue-100 text-sm font-medium">
          {t('auth.password', 'Password')}
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="h-4 w-4 text-blue-300" />
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 bg-blue-950/60 border border-blue-800/50 text-white placeholder:text-blue-400/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 bg-blue-950/60 border border-blue-800/50 text-white placeholder:text-blue-400/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 relative z-10">
        <Checkbox
          id="terms"
          checked={acceptTerms}
          onCheckedChange={(checked) => {
            if (typeof checked === 'boolean') {
              setAcceptTerms(checked);
            }
          }}
          className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-200 cursor-pointer"
        >
          {t('auth.acceptTerms', 'I accept the terms and conditions')}
        </label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 mt-4 h-12 font-medium text-base"
        disabled={isLoading}
      >
        {isLoading ? t('auth.processing', 'Processing...') : t('auth.registerButton', 'Register')}
      </Button>
    </form>
  );
};

export default RegisterFormFields;
