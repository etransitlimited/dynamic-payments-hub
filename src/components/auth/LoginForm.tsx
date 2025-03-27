
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: language === "zh-CN" ? "请填写所有字段" : language === "zh-TW" ? "請填寫所有字段" : "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: language === "zh-CN" ? "登录成功" : language === "zh-TW" ? "登錄成功" : "Login successful",
        description: language === "zh-CN" ? "欢迎回来" : language === "zh-TW" ? "歡迎回來" : "Welcome back",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-blue-100">
          {language === "zh-CN" ? "电子邮件" : language === "zh-TW" ? "電子郵件" : "Email"}
        </Label>
        <Input
          id="email"
          type="email"
          placeholder={language === "zh-CN" ? "your@email.com" : language === "zh-TW" ? "your@email.com" : "your@email.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-blue-950/50 border-blue-800/30 placeholder:text-blue-400/50"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-blue-100">
            {language === "zh-CN" ? "密码" : language === "zh-TW" ? "密碼" : "Password"}
          </Label>
          <Link to="/forgot-password" className="text-xs text-blue-300 hover:text-blue-200">
            {language === "zh-CN" ? "忘记密码?" : language === "zh-TW" ? "忘記密碼?" : "Forgot password?"}
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-blue-950/50 border-blue-800/30"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 mt-2"
        disabled={isLoading}
      >
        {isLoading ? 
          (language === "zh-CN" ? "登录中..." : language === "zh-TW" ? "登錄中..." : "Logging in...") : 
          (language === "zh-CN" ? "登录" : language === "zh-TW" ? "登錄" : "Login")}
      </Button>
    </form>
  );
};

export default LoginForm;
