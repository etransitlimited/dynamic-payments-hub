
import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/context/TranslationProvider";

interface FrontendRouteProps {
  isLoggedIn: boolean;
}

// FrontendRoute用于不需要身份验证的公共路由
// 但如果用户已认证，可能表现不同
const FrontendRoute: React.FC<FrontendRouteProps> = ({ isLoggedIn }) => {
  const location = useLocation();
  const { language } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  const initialRenderRef = useRef(true);
  
  // 添加日志用于调试前端路由
  useEffect(() => {
    console.log("FrontendRoute: 路径:", location.pathname, "isLoggedIn:", isLoggedIn);
    
    // 记录localStorage令牌状态用于调试
    const token = localStorage.getItem('authToken');
    console.log("FrontendRoute: localStorage中的Token:", !!token);
    
    // 检查sessionStorage中的备份Token
    const sessionToken = sessionStorage.getItem('tempAuthToken');
    if (sessionToken && !token && !isChangingLanguage) {
      console.log("FrontendRoute: 从sessionStorage恢复Token");
      localStorage.setItem('authToken', sessionToken);
    }
    
    // 仅在首次渲染时记录详细信息
    if (initialRenderRef.current) {
      console.log(`FrontendRoute: 当前语言: ${language}, 语言更改中: ${isChangingLanguage}`);
      initialRenderRef.current = false;
    }
  }, [isLoggedIn, location.pathname, language, isChangingLanguage]);
  
  return <Outlet />;
};

export default FrontendRoute;
