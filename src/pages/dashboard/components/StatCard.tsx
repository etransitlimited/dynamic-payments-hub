
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <Card className={cn("shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-white">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-full", iconClassName)}>
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
  );
};

export default StatCard;
