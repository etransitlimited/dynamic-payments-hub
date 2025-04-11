
import React, { lazy, Suspense, memo, useEffect } from "react";
import { motion } from "framer-motion";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

// Lazy load the header component
const Header = lazy(() => import("@/components/Header"));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="fixed inset-0 bg-[#061428] flex items-center justify-center">
    <div className="text-blue-400">Loading...</div>
  </div>
);

const AuthLayout = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // 自动检查是否已登录，若已登录则导航至仪表板
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      console.log("用户已登录，重定向到仪表板");
      navigate("/dashboard");
    }
  }, [isLoggedIn, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-[#061428] text-white">
      <Suspense fallback={<LoadingFallback />}>
        <Header />
      </Suspense>
      
      <div className="container flex flex-col items-center justify-center px-4 z-10 mt-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          key={location.pathname} // Re-render animation when path changes
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default memo(AuthLayout);
