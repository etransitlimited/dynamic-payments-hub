
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
      {/* Card with simpler background */}
      <motion.div
        className="bg-gradient-to-b from-blue-900/30 to-blue-950/40 backdrop-blur-sm rounded-xl shadow-xl border border-blue-800/20 p-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header section */}
        <div className="text-center mb-6 relative z-10">
          <h2 className="text-2xl font-bold text-white">
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
