import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { setUserInStorage } from "@/auth";
import { User } from "@/types/auth";

const LoginFormFields: React.FC<{ onLoginSuccess?: () => void }> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { t } = useSafeTranslation();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Login attempt with:", { email, password });
      
      const mockToken = `mock_token_${Date.now()}`;
      
      const usersResponse = await fetch('/src/data/mockUsers.json');
      const users = await usersResponse.json();
      
      const user: User = users.find((u: User) => u.email.toLowerCase() === email.toLowerCase()) || users[0];
      
      setUserInStorage(user);
      
      login(mockToken);
      
      toast({
        title: t("auth.loginSuccess"),
        description: t("auth.welcomeBack", "Welcome back, {name}", { name: user.name }),
        variant: "default",
      });
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: t("auth.loginError"),
        description: t("auth.invalidCredentials"),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">{t("auth.email")}</Label>
        <Input
          id="email"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isProcessing}
          placeholder="mail@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">{t("auth.password")}</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isProcessing}
        />
      </div>
      <Button disabled={isProcessing}>
        {isProcessing ? t("auth.processing") : t("auth.loginButton")}
      </Button>
      <div className="text-sm text-gray-500">
        <Link to="/forgot-password" className="hover:text-gray-700 underline underline-offset-2">
          {t("auth.forgotPasswordLink")}
        </Link>
      </div>
      <div className="text-sm text-gray-500">
        {t("auth.dontHaveAccount")}{" "}
        <Link to="/register" className="hover:text-gray-700 underline underline-offset-2">
          {t("auth.registerButton")}
        </Link>
      </div>
    </form>
  );
};

export default LoginFormFields;
