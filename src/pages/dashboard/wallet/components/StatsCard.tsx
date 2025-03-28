
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
        "relative overflow-hidden rounded-lg p-4",
        useShadowEffects ? "shadow-lg shadow-blue-900/10" : "",
        useGlowEffects ? "hover:shadow-[0_0_15px_rgba(0,123,255,0.2)] transition-all duration-300" : "",
        className
      )}
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="relative z-10">
        <div className="flex items-center mb-2">
          <span className="mr-2">{icon}</span>
          <h3 className="text-sm font-medium text-blue-200">{title}</h3>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default StatsCard;
