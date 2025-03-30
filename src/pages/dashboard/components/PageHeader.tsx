
import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <div className="flex items-center mb-6">
      <motion.div 
        className="w-2 h-8 bg-gradient-to-b from-purple-300 to-purple-600 rounded-full mr-3 shadow-lg shadow-purple-500/40"
        initial={{ height: 0 }}
        animate={{ height: "2rem" }}
        transition={{ duration: 0.3 }}
      />
      <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent drop-shadow-sm">{title}</h1>
    </div>
  );
};

export default PageHeader;
