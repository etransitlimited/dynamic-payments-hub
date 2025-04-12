
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
      
      // 使用模拟数据（开发环境）
      // 使用默认值作为模拟用户数据，确保登录总是成功
      const mockUser: User = {
        id: "user-1",
        name: "测试用户",
        email: "test@example.com",
        username: "testuser",
        role: "user",
        avatar: "/assets/avatars/avatar-1.png",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const mockToken = `mock_token_${Date.now()}`;
      
      // 等待一秒模拟网络请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 保存用户信息和令牌
      setUserInStorage(mockUser);
      login(mockToken);
      
      toast({
        title: translationToString(t("auth.login.successTitle"), "登录成功"),
        description: translationToString(t("auth.login.welcomeBack", { name: mockUser.name }), `欢迎回来, ${mockUser.name}`),
        variant: "default",
      });
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("登录错误：", error);
      toast({
        title: translationToString(t("auth.login.errorTitle"), "登录失败"),
        description: translationToString(t("auth.login.invalidCredentials"), "无效的凭据"),
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
          {translationToString(t("auth.emailOrUsername"), "邮箱或用户名")}
        </Label>
        <Input
          id="loginIdentifier"
          type="text"
          value={loginIdentifier}
          onChange={handleIdentifierChange}
          placeholder={translationToString(t("auth.login.identifierPlaceholder"), "输入邮箱或用户名")}
          disabled={isProcessing}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="password">
          {translationToString(t("auth.password"), "密码")}
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={translationToString(t("auth.login.passwordPlaceholder"), "输入密码")}
          disabled={isProcessing}
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing 
          ? translationToString(t("auth.login.processing"), "处理中...")
          : translationToString(t("auth.login.button"), "登录")
        }
      </Button>
      
      <div className="flex justify-between text-sm text-gray-600">
        <Link to="/forgot-password" className="hover:underline">
          {translationToString(t("auth.login.forgotPassword"), "忘记密码?")}
        </Link>
        <Link to="/register" className="hover:underline">
          {translationToString(t("auth.login.noAccount"), "还没有账户?")}
        </Link>
      </div>
    </form>
  );
};

export default LoginFormFields;
