
import React from "react";
import { cn } from "@/lib/utils";
import { usePerformance } from "@/hooks/use-performance";

interface StatsCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const StatsCard = ({ title, icon, children, className }: StatsCardProps) => {
  const { useGlowEffects, useShadowEffects } = usePerformance();
  
  return (
    <div 
      className={cn(
        "bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-900/50 rounded-lg p-4",
        useShadowEffects ? "shadow-lg shadow-blue-900/10" : "",
        useGlowEffects ? "hover:shadow-[0_0_8px_rgba(0,123,255,0.15)] transition-all duration-300" : "",
        className
      )}
    >
      <div className="flex items-center mb-2">
        <span className="mr-2">{icon}</span>
        <h3 className="text-sm font-medium text-blue-200">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default StatsCard;
