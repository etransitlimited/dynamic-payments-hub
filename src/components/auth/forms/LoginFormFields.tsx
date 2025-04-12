
import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { setUserInStorage } from "@/auth";
import { User } from "@/types/auth";

interface LoginFormFieldsProps {
  onLoginSuccess?: () => void;
  locale?: string;
  version?: "v1" | "v2";
}

const LoginFormFields: React.FC<LoginFormFieldsProps> = ({ 
  onLoginSuccess, 
  locale = "zh-CN",
  version = "v1"
}) => {
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { toast } = useToast();
  const { t } = useSafeTranslation();
  const { login } = useAuth();

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginIdentifier(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("登录尝试，标识符：", loginIdentifier);
      
      const usersResponse = await fetch('/src/data/mockUsers.json');
      const users = await usersResponse.json();
      
      // 同时支持用户名和邮箱登录
      const user: User = users.find(
        (u: User) => 
          u.email.toLowerCase() === loginIdentifier.toLowerCase() || 
          u.username.toLowerCase() === loginIdentifier.toLowerCase()
      ) || users[0];
      
      const mockToken = `mock_token_${Date.now()}`;
      
      setUserInStorage(user);
      login(mockToken);
      
      toast({
        title: String(t("auth.login.successTitle", "登录成功")),
        description: String(t("auth.login.welcomeBack", "欢迎回来, {name}", { name: user.name })),
        variant: "default",
      });
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("登录错误：", error);
      toast({
        title: String(t("auth.login.errorTitle", "登录失败")),
        description: String(t("auth.login.invalidCredentials", "无效的凭据")),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="loginIdentifier">
          {String(t("auth.emailOrUsername", "邮箱或用户名"))}
        </Label>
        <Input
          id="loginIdentifier"
          type="text"
          value={loginIdentifier}
          onChange={handleIdentifierChange}
          placeholder={String(t("auth.login.identifierPlaceholder", "输入邮箱或用户名"))}
          disabled={isProcessing}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="password">
          {String(t("auth.password", "密码"))}
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={String(t("auth.login.passwordPlaceholder", "输入密码"))}
          disabled={isProcessing}
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing 
          ? String(t("auth.login.processing", "处理中..."))
          : String(t("auth.login.button", "登录"))
        }
      </Button>
      
      <div className="flex justify-between text-sm text-gray-600">
        <Link to="/forgot-password" className="hover:underline">
          {String(t("auth.login.forgotPassword", "忘记密码?"))}
        </Link>
        <Link to="/register" className="hover:underline">
          {String(t("auth.login.noAccount", "还没有账户?"))}
        </Link>
      </div>
    </form>
  );
};

export default LoginFormFields;
