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
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";
import { CSSProperties } from "react";
import Header from "@/components/Header";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { performanceTier } = usePerformance();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: language === "zh-CN" ? "注册成功" : language === "zh-TW" ? "註冊成功" : "Registration successful",
        description: language === "zh-CN" ? "您的账户已创建" : language === "zh-TW" ? "您的賬戶已創建" : "Your account has been created",
      });
      navigate("/login");
    }, 1500);
  };

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

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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
            {performanceTier !== 'low' && (
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-3xl -z-10 transform scale-105"></div>
            )}
            
            <div className={`absolute ${isMobile ? 'w-16 h-10' : 'w-20 h-12'} bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 z-20`} />
            
            <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 border-blue-900/30 text-blue-50 shadow-xl relative overflow-hidden backdrop-blur-sm">
              <div className="absolute right-0 bottom-0 w-full h-full bg-gradient-to-tl from-blue-400/10 to-transparent"></div>
              
              <CardHeader className="space-y-1 relative z-10">
                <CardTitle className="text-2xl font-display font-semibold tracking-tight">
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
                    <Label htmlFor="email" className="text-blue-100 font-medium">
                      {language === "zh-CN" ? "电子邮件" : language === "zh-TW" ? "電子郵件" : "Email"}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={language === "zh-CN" ? "your@email.com" : language === "zh-TW" ? "your@email.com" : "your@email.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-blue-950/70 border-blue-800/50 text-white placeholder:text-blue-300/40 focus:border-blue-400"
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-blue-100 font-medium">
                      {language === "zh-CN" ? "密码" : language === "zh-TW" ? "密碼" : "Password"}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-blue-950/70 border-blue-800/50 text-white placeholder:text-blue-300/40 focus:border-blue-400 pr-10"
                        autoComplete="new-password"
                      />
                      <button 
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200 focus:outline-none"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-blue-100 font-medium">
                      {language === "zh-CN" ? "确认密码" : language === "zh-TW" ? "確認密碼" : "Confirm Password"}
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-blue-950/70 border-blue-800/50 text-white placeholder:text-blue-300/40 focus:border-blue-400 pr-10"
                        autoComplete="new-password"
                      />
                      <button 
                        type="button"
                        onClick={toggleShowConfirmPassword}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200 focus:outline-none"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      className="data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
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
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 mt-2 font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? 
                      (language === "zh-CN" ? "注册中..." : language === "zh-TW" ? "註冊中..." : "Registering...") : 
                      (language === "zh-CN" ? "注册" : language === "zh-TW" ? "註冊" : "Register")}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t border-blue-700/30 pt-4">
                <p className="text-sm text-blue-300">
                  {language === "zh-CN" ? "已有账户?" : language === "zh-TW" ? "已有賬戶?" : "Already have an account?"}{" "}
                  <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                    {language === "zh-CN" ? "登录" : language === "zh-TW" ? "登錄" : "Login"}
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

export default Register;
