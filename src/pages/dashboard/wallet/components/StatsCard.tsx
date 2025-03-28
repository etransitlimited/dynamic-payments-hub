
import React, { ReactNode } from "react";
import { GlassCard as Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const StatsCard = ({ title, icon, children }: StatsCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center text-lg">
          <span className="bg-blue-500/20 p-2 rounded-full mr-2">
            {icon}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
