
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import MapSection from "@/components/sections/MapSection";
import UseCases from "@/components/sections/UseCases";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/sections/Footer";
import { useAuth } from "@/hooks/use-auth";

const Index: React.FC = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  // 确保身份验证状态加载完成后，如果已登录则自动导航到仪表板
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      console.log("用户已登录，重定向到仪表板");
      navigate("/dashboard");
    }
  }, [isLoggedIn, isLoading, navigate]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-950 to-black text-white">
      {/* 快速导航按钮 - 固定在页面顶部 */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {!isLoggedIn ? (
          <>
            <Button asChild variant="outline" className="bg-blue-700/50 hover:bg-blue-600 border-blue-500 text-white">
              <Link to="/login">登录</Link>
            </Button>
            <Button asChild className="bg-blue-500 hover:bg-blue-400 text-white">
              <Link to="/register">注册</Link>
            </Button>
          </>
        ) : (
          <Button asChild className="bg-blue-500 hover:bg-blue-400 text-white">
            <Link to="/dashboard">进入仪表板</Link>
          </Button>
        )}
      </div>

      <Hero />
      <Features />
      <MapSection />
      <UseCases />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
