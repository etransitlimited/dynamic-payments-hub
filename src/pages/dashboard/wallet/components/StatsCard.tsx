
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const StatsCard = ({ title, icon, children, className = "" }: StatsCardProps) => {
  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-sm font-medium text-white flex items-center">
          <span className="bg-opacity-20 p-2 rounded-full mr-2">
            {icon}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 pt-0">
        {children}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
