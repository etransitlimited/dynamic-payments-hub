
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import ParticlesBackground from "@/components/ParticlesBackground";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单验证
    if (!email || !password || !confirmPassword) {
      toast({
        title: language === "zh-CN" ? "请填写所有字段" : language === "zh-TW" ? "請填寫所有字段" : "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: language === "zh-CN" ? "密码不匹配" : language === "zh-TW" ? "密碼不匹配" : "Passwords don't match",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: language === "zh-CN" ? "请接受条款和条件" : language === "zh-TW" ? "請接受條款和條件" : "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // 模拟注册过程
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: language === "zh-CN" ? "注册成功" : language === "zh-TW" ? "註冊成功" : "Registration successful",
        description: language === "zh-CN" ? "您的账户已创建" : language === "zh-TW" ? "您的賬戶已創建" : "Your account has been created",
      });
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-[#061428] text-white">
      <ParticlesBackground />
      
      <div className="container max-w-md px-4 z-10">
        <Card className="bg-[#0a1f3b]/80 backdrop-blur-sm border-blue-900/30 text-blue-50 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-display text-center">
              {language === "zh-CN" ? "创建账户" : language === "zh-TW" ? "創建賬戶" : "Create an account"}
            </CardTitle>
            <CardDescription className="text-blue-200">
              {language === "zh-CN" ? "输入您的信息以创建账户" : 
               language === "zh-TW" ? "輸入您的信息以創建賬戶" : 
               "Enter your information to create an account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
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
                <Label htmlFor="password" className="text-blue-100">
                  {language === "zh-CN" ? "密码" : language === "zh-TW" ? "密碼" : "Password"}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-blue-950/50 border-blue-800/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-blue-100">
                  {language === "zh-CN" ? "确认密码" : language === "zh-TW" ? "確認密碼" : "Confirm Password"}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-blue-950/50 border-blue-800/30"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-200"
                >
                  {language === "zh-CN" ? "我接受条款和条件" : 
                   language === "zh-TW" ? "我接受條款和條件" : 
                   "I accept the terms and conditions"}
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
                disabled={isLoading}
              >
                {isLoading ? 
                  (language === "zh-CN" ? "注册中..." : language === "zh-TW" ? "註冊中..." : "Registering...") : 
                  (language === "zh-CN" ? "注册" : language === "zh-TW" ? "註冊" : "Register")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-blue-300">
              {language === "zh-CN" ? "已有账户?" : language === "zh-TW" ? "已有賬戶?" : "Already have an account?"}{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300">
                {language === "zh-CN" ? "登录" : language === "zh-TW" ? "登錄" : "Login"}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
