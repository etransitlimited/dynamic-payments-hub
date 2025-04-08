
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import LoginFormFields from "./forms/LoginFormFields";
import { useAuth } from "@/hooks/use-auth";

const LoginForm: React.FC = () => {
  const { t } = useSafeTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useAuth();
  
  // 从 location state 获取重定向路径，如果没有则默认为 dashboard
  const from = location.state?.from || "/dashboard";
  
  console.log("LoginForm - Mounted with auth state:", { isLoggedIn, isLoading });
  console.log("LoginForm - Redirect target after login:", from);
  console.log("LoginForm - Token in localStorage:", localStorage.getItem('authToken'));

  // 如果已经登录，重定向到 dashboard 或原始目标
  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      console.log("User already logged in, redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate, from]);

  // 成功登录后通过导航到重定向路径来处理
  const handleLoginSuccess = () => {
    console.log("LoginForm - Login successful, redirecting to:", from);
    // 使用轻微延迟确保认证状态已更新
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 300);
  };

  // 如果仍在检测认证状态，显示简化的加载
  if (isLoading) {
    return <div className="flex justify-center py-4"><span className="text-blue-200">Loading...</span></div>;
  }

  return (
    <div className="relative z-10 w-full">
      <LoginFormFields onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginForm;
