
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
import { translationToString } from "@/utils/translationString";

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
      // 模拟延迟，真实环境可删除
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("登录尝试，标识符：", loginIdentifier);
      
      /**
       * 真实接口调用示例（已注释）
       * 按照模块隔离原则，登录API应该放在user模块下
       */
      /*
      const loginResult = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Module-Scope': 'user_auth', // 模块作用域标识
          'X-Client-Version': version,    // 组件版本
          'X-Client-Locale': locale,      // 客户端语言
          'X-Isolation-ID': `login_${Date.now()}` // 请求隔离ID
        },
        body: JSON.stringify({
          identifier: loginIdentifier, // 用户名或邮箱
          password: password,          // 密码
          device_info: {              // 设备信息
            userAgent: navigator.userAgent,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language
          }
        })
      });
      
      const responseData = await loginResult.json();
      
      // 假设返回格式：{ code: 0, data: { user: {...}, token: "..." }, message: "" }
      if (responseData.code !== 0) {
        throw new Error(responseData.message || '登录失败');
      }
      
      // 获取用户信息和令牌
      const { user, token } = responseData.data;
      
      // 存储用户信息和令牌
      setUserInStorage(user);
      login(token);
      */
      
      // 使用模拟数据（开发环境）
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
      
      // 使用translationToString确保翻译结果是字符串类型
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
