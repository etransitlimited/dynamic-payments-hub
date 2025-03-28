
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
    <Card className={cn("shadow-lg shadow-blue-900/20 backdrop-blur-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
        <div className={cn("p-2 rounded-full", iconClassName)}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
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
