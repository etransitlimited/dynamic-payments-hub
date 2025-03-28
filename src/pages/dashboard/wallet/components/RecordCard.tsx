
import React, { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RecordCardProps {
  title: string;
  description?: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const RecordCard = ({ title, description, icon, children, className = "" }: RecordCardProps) => {
  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-opacity-20 p-2 rounded-full mr-2">
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
