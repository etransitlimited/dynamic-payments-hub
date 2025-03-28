
import React, { ReactNode } from "react";
import { GlassCard as Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RecordCardProps {
  title: string;
  description?: string;
  icon: ReactNode;
  children: ReactNode;
}

const RecordCard = ({ title, description, icon, children }: RecordCardProps) => {
  return (
    <Card>
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
