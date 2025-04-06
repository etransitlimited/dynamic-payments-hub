
import React, { useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

// Lazy load components for better performance
const ParticlesBackground = lazy(() => import("@/components/ParticlesBackground"));
const Header = lazy(() => import("@/components/Header"));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="absolute inset-0 bg-[#061428] flex items-center justify-center">
    <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
);

const AuthLayout = () => {
  // Add component render logging for debugging
  useEffect(() => {
    console.log("AuthLayout component mounted");
    return () => console.log("AuthLayout component unmounted");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-[#061428] text-white overflow-hidden">
      <Suspense fallback={LoadingFallback()}>
        <ParticlesBackground />
        <Header />
      </Suspense>
      
      <div className="container flex flex-col items-center justify-center px-4 z-10 mt-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
