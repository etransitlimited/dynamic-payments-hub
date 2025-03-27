
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();

  const getEmailLabel = () => {
    return language === "zh-CN" ? "电子邮件" : 
           language === "zh-TW" ? "電子郵件" : 
           language === "fr" ? "E-mail" :
           language === "es" ? "Correo electrónico" :
           "Email";
  };

  const getSubmitButtonText = () => {
    return language === "zh-CN" ? "发送重置链接" : 
           language === "zh-TW" ? "發送重置鏈接" : 
           language === "fr" ? "Envoyer le lien de réinitialisation" :
           language === "es" ? "Enviar enlace de restablecimiento" :
           "Send Reset Link";
  };

  const getBackToLoginText = () => {
    return language === "zh-CN" ? "返回登录" : 
           language === "zh-TW" ? "返回登錄" : 
           language === "fr" ? "Retour à la connexion" :
           language === "es" ? "Volver al inicio de sesión" :
           "Back to Login";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: language === "zh-CN" ? "请输入电子邮件" : 
               language === "zh-TW" ? "請輸入電子郵件" : 
               "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate password reset email being sent
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: language === "zh-CN" ? "重置链接已发送" : 
               language === "zh-TW" ? "重置鏈接已發送" : 
               language === "fr" ? "Lien de réinitialisation envoyé" :
               language === "es" ? "Enlace de restablecimiento enviado" :
               "Reset Link Sent",
        description: language === "zh-CN" ? "请检查您的电子邮件" : 
                     language === "zh-TW" ? "請檢查您的電子郵件" : 
                     language === "fr" ? "Veuillez vérifier votre e-mail" :
                     language === "es" ? "Por favor, revise su correo electrónico" :
                     "Please check your email",
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-blue-100">
          {getEmailLabel()}
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Mail className="h-4 w-4 text-blue-200" />
          </div>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={getEmailLabel()}
            className="pl-10 bg-blue-700/40 border-blue-600 placeholder:text-blue-300 text-white"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-blue-500 hover:bg-blue-400 text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {language === "zh-CN" ? "处理中..." : 
             language === "zh-TW" ? "處理中..." : 
             language === "fr" ? "Traitement..." :
             language === "es" ? "Procesando..." :
             "Processing..."}
          </span>
        ) : (
          getSubmitButtonText()
        )}
      </Button>

      <div className="text-center">
        <Button
          type="button"
          variant="link"
          className="text-blue-300 hover:text-blue-200"
          onClick={() => navigate("/login")}
        >
          {getBackToLoginText()}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
