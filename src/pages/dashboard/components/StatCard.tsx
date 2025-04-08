
import React, { memo, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface StatCardProps {
  title: React.ReactNode;
  value: string;
  change: React.ReactNode;
  compareText: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
  isPositive?: boolean;
  valuePrefix?: string; // Add this prop
  valueSuffix?: string; // Add this prop
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  compareText,
  icon,
  className = "",
  iconClassName = "",
  isPositive,
  valuePrefix = "", // Default to empty string
  valueSuffix = "" // Default to empty string
}) => {
  const { language } = useSafeTranslation();
  
  // Generate a stable key based on content and language for motion animations
  const animationKey = useMemo(() => 
    `stat-${typeof title === 'string' ? title : 'card'}-${language}-${value}`, 
    [title, language, value]
  );
  
  // Determine change color based on positive/negative value
  const changeColor = isPositive ? "text-green-400" : "text-red-400";
  
  return (
    <Card 
      className={`border-purple-900/30 backdrop-blur-md shadow-lg relative overflow-hidden group transition-all duration-300 h-full ${className}`}
      data-language={language}
    >
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600/70 to-purple-600/20"></div>
      
      {/* Animated glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 group-hover:duration-500"></div>
      
      <CardContent className="p-4 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-300">
            {title}
          </h3>
          <div className={`w-8 h-8 rounded-full ${iconClassName} flex items-center justify-center`}>
            {icon}
          </div>
        </div>
        
        <div className="space-y-1">
          <motion.div 
            key={`value-${animationKey}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, duration: 0.4 }}
            className="text-xl font-bold text-white"
          >
            {valuePrefix}{value}{valueSuffix}
          </motion.div>
          
          <div className="flex items-center text-xs">
            <span className={`font-medium ${changeColor} mr-1`}>
              {change}
            </span>
            <span className="text-gray-400">{compareText}</span>
          </div>
        </div>
        
        {/* Animated underline on hover */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-purple-300 group-hover:w-full transition-all duration-300"></div>
      </CardContent>
    </Card>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(StatCard);
