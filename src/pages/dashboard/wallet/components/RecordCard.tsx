
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
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center">
          <span className={`${title.includes("Deposit") ? "bg-green-500/20" : "bg-blue-500/20"} p-2 rounded-full mr-2`}>
            {icon}
          </span>
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-blue-200/80">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="relative z-10">
        {children}
      </CardContent>
    </Card>
  );
};

export default RecordCard;
