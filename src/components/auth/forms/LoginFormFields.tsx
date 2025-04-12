
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

interface LoginFormFieldsProps {
  onLoginSuccess?: () => void;
  locale?: string;
  version: "v1" | "v2";
}

const LoginFormFields: React.FC<LoginFormFieldsProps> = ({ 
  onLoginSuccess, 
  locale = "en",
  version = "v1" 
}) => {
  // 使用行为状态
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "username">("email");
  
  // 系统钩子
  const { toast } = useToast();
  const { t } = useSafeTranslation();
  const { login } = useAuth();

  // 判断登录标识符类型 (邮箱/用户名)
  const detectIdentifierType = (value: string): "email" | "username" => {
    return value.includes('@') ? "email" : "username";
  };

  // 处理标识符输入变化
  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoginIdentifier(value);
    setLoginMethod(detectIdentifierType(value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Login attempt with:", { 
        [loginMethod]: loginIdentifier, 
        password,
        loginMethod 
      });
      
      const mockToken = `mock_token_${Date.now()}`;
      
      const usersResponse = await fetch('/src/data/mockUsers.json');
      const users = await usersResponse.json();
      
      // 根据登录方式查找用户
      const user: User = users.find(
        (u: User) => loginMethod === "email" 
          ? u.email.toLowerCase() === loginIdentifier.toLowerCase()
          : u.username.toLowerCase() === loginIdentifier.toLowerCase()
      ) || users[0];
      
      setUserInStorage(user);
      
      login(mockToken);
      
      toast({
        title: t("auth.loginSuccess", "登录成功"),
        description: t("auth.welcomeBack", "欢迎回来, {name}", { name: user.name }),
        variant: "default",
      });
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: t("auth.loginError", "登录失败"),
        description: t("auth.invalidCredentials", "无效的凭据"),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // 生成输入框的标签文本
  const getInputLabel = () => {
    return loginMethod === "email" 
      ? t("auth.emailOrUsername", "邮箱或用户名") 
      : t("auth.emailOrUsername", "邮箱或用户名");
  };
  
  // 生成输入框的占位符文本
  const getInputPlaceholder = () => {
    return loginMethod === "email" 
      ? "mail@example.com / username" 
      : "username / mail@example.com";
  };

  // 表单组件类名前缀 (遵循隔离规范)
  const classPrefix = "auth_login";

  return (
    <form onSubmit={handleSubmit} className={`${classPrefix}_form grid gap-4`}>
      <div className={`${classPrefix}_field grid gap-2`}>
        <Label htmlFor="loginIdentifier">{getInputLabel()}</Label>
        <Input
          id="loginIdentifier"
          type="text"
          autoCapitalize="none"
          autoComplete="username"
          value={loginIdentifier}
          onChange={handleIdentifierChange}
          disabled={isProcessing}
          placeholder={getInputPlaceholder()}
          className={`${classPrefix}_input`}
        />
      </div>
      <div className={`${classPrefix}_field grid gap-2`}>
        <Label htmlFor="password">{t("auth.password", "密码")}</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isProcessing}
          className={`${classPrefix}_input`}
        />
      </div>
      <Button disabled={isProcessing} className={`${classPrefix}_button`}>
        {isProcessing ? t("auth.processing", "处理中...") : t("auth.loginButton", "登录")}
      </Button>
      <div className={`${classPrefix}_links text-sm text-gray-500`}>
        <Link to="/forgot-password" className={`${classPrefix}_forgot hover:text-gray-700 underline underline-offset-2`}>
          {t("auth.forgotPasswordLink", "忘记密码?")}
        </Link>
      </div>
      <div className={`${classPrefix}_register text-sm text-gray-500`}>
        {t("auth.dontHaveAccount", "还没有账户?")}
        <Link to="/register" className={`${classPrefix}_register-link hover:text-gray-700 underline underline-offset-2 ml-1`}>
          {t("auth.registerButton", "注册")}
        </Link>
      </div>
    </form>
  );
};

export default LoginFormFields;
