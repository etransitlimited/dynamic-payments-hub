
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
import { translationToString } from "@/utils/translationString";
// 导入API服务
import { userApi } from "@/modules/user/api/userApi";

// 登录请求参数类型
interface LoginRequest {
  identifier: string;
  password: string;
  device_info: {
    userAgent: string;
    screenWidth: number;
    screenHeight: number;
    timeZone: string;
    language: string;
  };
}

// 登录响应类型
interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

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
      console.log("登录尝试，标识符：", loginIdentifier);
      
      /**
       * 真实API调用示例 - 使用配置好的API服务
       * 注意：这里使用了userApi服务，它基于apiFactory创建
       * 遵循模块隔离原则，登录API定义在user模块中
       */
      /*
      const loginRequest: LoginRequest = {
        identifier: loginIdentifier,
        password: password,
        device_info: {
          userAgent: navigator.userAgent,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language
        }
      };
      
      // 使用API服务发起登录请求
      const response = await userApi.LOGINPost<LoginResponse>(loginRequest, {
        headers: {
          'X-Module-Scope': 'user_auth',   // 模块作用域标识
          'X-Client-Version': version,      // 组件版本
          'X-Client-Locale': locale,        // 客户端语言
          'X-Isolation-ID': `login_${Date.now()}` // 请求隔离ID
        }
      });
      
      // 处理登录响应
      const { user, token, refreshToken } = response;
      
      // 存储用户信息和令牌
      setUserInStorage(user);
      login(token, refreshToken);
      
      toast({
        title: translationToString(t("auth.login.successTitle", "登录成功")),
        description: translationToString(t("auth.login.welcomeBack", "欢迎回来, {name}", { name: user.name })),
        variant: "default",
      });
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      */
      
      // 使用模拟数据（开发环境）
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
        title: translationToString(t("auth.login.successTitle", "登录成功")),
        description: translationToString(t("auth.login.welcomeBack", "欢迎回来, {name}", { name: user.name })),
        variant: "default",
      });
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("登录错误：", error);
      toast({
        title: translationToString(t("auth.login.errorTitle", "登录失败")),
        description: translationToString(t("auth.login.invalidCredentials", "无效的凭据")),
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
          {translationToString(t("auth.emailOrUsername", "邮箱或用户名"))}
        </Label>
        <Input
          id="loginIdentifier"
          type="text"
          value={loginIdentifier}
          onChange={handleIdentifierChange}
          placeholder={translationToString(t("auth.login.identifierPlaceholder", "输入邮箱或用户名"))}
          disabled={isProcessing}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="password">
          {translationToString(t("auth.password", "密码"))}
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={translationToString(t("auth.login.passwordPlaceholder", "输入密码"))}
          disabled={isProcessing}
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing 
          ? translationToString(t("auth.login.processing", "处理中..."))
          : translationToString(t("auth.login.button", "登录"))
        }
      </Button>
      
      <div className="flex justify-between text-sm text-gray-600">
        <Link to="/forgot-password" className="hover:underline">
          {translationToString(t("auth.login.forgotPassword", "忘记密码?"))}
        </Link>
        <Link to="/register" className="hover:underline">
          {translationToString(t("auth.login.noAccount", "还没有账户?"))}
        </Link>
      </div>
    </form>
  );
};

export default LoginFormFields;
