
import React, { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RecordCardProps {
  title: string;
  description?: string;
  icon: ReactNode;
  children: ReactNode;
}

const RecordCard = ({ title, description, icon, children }: RecordCardProps) => {
  return (
    <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-green-500/20 p-2 rounded-full mr-2">
            {icon}
          </span>
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-blue-200/80">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default RecordCard;
