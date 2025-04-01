
import React, { ReactNode, CSSProperties } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const StatsCard = ({ title, icon, children, className = "", style }: StatsCardProps) => {
  return (
    <Card className={`relative overflow-hidden stats-card ${className}`} style={style}>
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px] rounded-xl"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-sm font-medium text-white flex items-center">
          <span className="bg-purple-900/30 p-2 rounded-lg mr-2 text-purple-400">
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
