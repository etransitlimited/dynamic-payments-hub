
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const StatsCard = ({ title, icon, children }: StatsCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-[#0F2643]/90 to-[#091B34]/90 border-blue-800/30 shadow-lg shadow-blue-900/20 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 w-full backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-white flex items-center text-lg">
          <span className="bg-blue-500/20 p-2 rounded-full mr-2">
            {icon}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        {children}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
