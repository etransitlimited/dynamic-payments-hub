import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import ParticlesBackground from "@/components/ParticlesBackground";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";
import { CSSProperties } from "react";
import Header from "@/components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { performanceTier } = usePerformance();

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

  // Card animation settings
  const getCardAnimation = () => {
    if (performanceTier === 'low') {
      return { y: [0] };
    }
    
    if (performanceTier === 'medium' || isMobile) {
      return { 
        y: [0, -5, 0, 5, 0], 
        scale: [1, 1.01, 1] 
      };
    }
    
    return { 
      y: [0, -10, 0, 10, 0], 
      scale: [1, 1.02, 1] 
    };
  };
  
  const animationDuration = {
    high: isMobile ? 10 : 8,
    medium: isMobile ? 12 : 10,
    low: 0
  }[performanceTier];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-[#061428] text-white overflow-hidden">
      <ParticlesBackground />
      <Header />
      
      <div className="container flex flex-col items-center justify-center px-4 z-10 mt-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={getCardAnimation()}
            transition={{ 
              duration: animationDuration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{ 
              transformStyle: "preserve-3d" as CSSProperties["transformStyle"],
              perspective: "800px",
            }}
          >
            {/* Background glow effect */}
            {performanceTier !== 'low' && (
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-3xl -z-10 transform scale-105"></div>
            )}
            
            {/* Yellow accent */}
            <div className={`absolute ${isMobile ? 'w-10 h-6' : 'w-12 h-8'} bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md right-4 top-16 z-20`} />
            
            <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 border-blue-900/30 text-blue-50 shadow-xl relative overflow-hidden backdrop-blur-sm">
              <div className="absolute right-0 bottom-0 w-full h-full bg-gradient-to-tl from-blue-400/10 to-transparent"></div>
              
              <CardHeader className="space-y-1 relative z-10">
                <CardTitle className="text-2xl font-display font-semibold tracking-tight">
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
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? 
                      (language === "zh-CN" ? "登录中..." : language === "zh-TW" ? "登錄中..." : "Logging in...") : 
                      (language === "zh-CN" ? "登录" : language === "zh-TW" ? "登錄" : "Login")}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t border-blue-700/30 pt-4">
                <p className="text-sm text-blue-300">
                  {language === "zh-CN" ? "还没有账户?" : language === "zh-TW" ? "還沒有賬戶?" : "Don't have an account?"}{" "}
                  <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                    {language === "zh-CN" ? "注册" : language === "zh-TW" ? "註冊" : "Register"}
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
