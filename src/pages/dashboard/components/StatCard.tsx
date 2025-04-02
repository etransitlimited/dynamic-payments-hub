
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: React.ReactNode;
  value: string;
  change: string;
  compareText: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  compareText, 
  icon,
  className = "",
  iconClassName = ""
}) => {
  const isPositive = change.startsWith('+');
  
  return (
    <motion.div
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="perspective-1000"
    >
      <Card className={`border-purple-900/30 backdrop-blur-md overflow-hidden shadow-lg relative group transition-all duration-300 hover:shadow-[0_10px_40px_-15px_rgba(139,92,246,0.3)] h-full rounded-xl ${className}`}>
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
        <CardContent className="p-4 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconClassName}`}>
              {icon}
            </div>
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors duration-300">
              <ArrowUpRight className="h-3.5 w-3.5 text-gray-300" />
            </div>
          </div>
          
          <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
          
          <div className="flex items-end justify-between">
            <div className="text-xl font-bold text-white">{value}</div>
            <div className={`text-xs px-2 py-1 rounded-full flex items-center ${
              isPositive ? 'bg-green-900/30 text-green-300 border border-green-700/30' : 'bg-red-900/30 text-red-300 border border-red-700/30'
            }`}>
              {change}
              <span className="ml-1 text-[10px] text-gray-400">{compareText}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
