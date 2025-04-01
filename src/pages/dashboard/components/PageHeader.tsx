
import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  className?: string;
}

const PageHeader = ({ title, className }: PageHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center mb-6"
    >
      <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-700 rounded-full mr-3"></div>
      <h1 className={`text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 ${className || ''}`}>{title}</h1>
    </motion.div>
  );
};

export default PageHeader;
