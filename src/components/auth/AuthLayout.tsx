
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  // Add component render logging for debugging
  useEffect(() => {
    console.log("AuthLayout component mounted");
    return () => console.log("AuthLayout component unmounted");
  }, []);

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
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
