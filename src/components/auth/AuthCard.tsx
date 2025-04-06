
import React from "react";
import { motion } from "framer-motion";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ 
  title, 
  description, 
  children, 
  footer 
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card with semi-transparent gradient background */}
      <motion.div
        className="bg-gradient-to-b from-blue-900/30 to-blue-950/40 backdrop-blur-sm rounded-xl shadow-2xl border border-blue-800/20 p-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
        
        {/* Header section */}
        <div className="text-center mb-6 relative z-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-blue-300 mt-1 text-sm">
            {description}
          </p>
        </div>
        
        {/* Content section */}
        {children}
        
        {/* Footer section if provided */}
        {footer && (
          <div className="mt-6 pt-4 border-t border-blue-800/20">
            {footer}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthCard;
