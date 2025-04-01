
import React, { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface RecordCardProps {
  title: string;
  description?: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const RecordCard = ({ title, description, icon, children, className = "" }: RecordCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className={`relative overflow-hidden bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/30 h-full ${className}`}>
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px] rounded-xl"></div>
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-70"></div>
        
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-purple-900/30 p-2 rounded-lg mr-2 text-purple-400">
              {icon}
            </span>
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-muted-foreground">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="relative z-10">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecordCard;
