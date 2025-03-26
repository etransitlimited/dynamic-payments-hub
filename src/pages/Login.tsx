
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import ParticlesBackground from "@/components/ParticlesBackground";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单验证
    if (!email || !password) {
      toast({
        title: language === "zh-CN" ? "请填写所有字段" : language === "zh-TW" ? "請填寫所有字段" : "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // 模拟登录过程
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
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-[#061428] text-white">
      <ParticlesBackground />
      
      <div className="container max-w-md px-4 z-10">
        <Card className="bg-[#0a1f3b]/80 backdrop-blur-sm border-blue-900/30 text-blue-50 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-display text-center">
              {language === "zh-CN" ? "登录" : language === "zh-TW" ? "登錄" : "Login"}
            </CardTitle>
            <CardDescription className="text-blue-200">
              {language === "zh-CN" ? "输入您的信息以访问您的账户" : 
               language === "zh-TW" ? "輸入您的信息以訪問您的賬戶" : 
               "Enter your credentials to access your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
                disabled={isLoading}
              >
                {isLoading ? 
                  (language === "zh-CN" ? "登录中..." : language === "zh-TW" ? "登錄中..." : "Logging in...") : 
                  (language === "zh-CN" ? "登录" : language === "zh-TW" ? "登錄" : "Login")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-blue-300">
              {language === "zh-CN" ? "还没有账户?" : language === "zh-TW" ? "還沒有賬戶?" : "Don't have an account?"}{" "}
              <Link to="/register" className="text-blue-400 hover:text-blue-300">
                {language === "zh-CN" ? "注册" : language === "zh-TW" ? "註冊" : "Register"}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
