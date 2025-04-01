
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  compareText: string;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

const StatCard = ({ 
  title, 
  value, 
  change, 
  compareText, 
  icon, 
  className,
  iconClassName
}: StatCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className={cn(
        "h-full border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative group", 
        className
      )}>
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        
        {/* Purple gradient glow effect */}
        <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-0 group-hover:opacity-75"></div>
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-white">
            {title}
          </CardTitle>
          <div className={cn("p-2 bg-purple-900/30 rounded-lg", iconClassName)}>
            {icon}
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="flex items-center mt-1">
            <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
            <p className="text-xs text-green-400">
              {change} {compareText}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
