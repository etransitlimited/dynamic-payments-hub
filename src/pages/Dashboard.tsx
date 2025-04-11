
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import { useAuth } from "@/hooks/use-auth";

const Dashboard = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // 记录渲染
  console.log("Dashboard组件渲染中，登录状态:", isLoggedIn, "加载中:", isLoading);
  
  // 检查身份验证状态
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      console.log("用户未登录，重定向到登录页面");
      navigate("/login", { state: { from: "/dashboard" } });
    }
  }, [isLoggedIn, isLoading, navigate]);
  
  // 如果还在加载或未登录，显示加载中
  if (isLoading || !isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-950">
        <div className="text-white">正在验证身份...</div>
      </div>
    );
  }
  
  // 返回实际的仪表板组件
  return <DashboardHome />;
};

export default Dashboard;
