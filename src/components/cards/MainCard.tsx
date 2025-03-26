
import { motion } from "framer-motion";
import CardBase from "./CardBase";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";
import { CSSProperties } from "react";

const MainCard = () => {
  const isMobile = useIsMobile();
  const { performanceTier } = usePerformance();
  
  // Adjusted card size for better proportions on mobile and iPad Mini
  const cardSize = isMobile 
    ? window.innerWidth < 600 
      ? "h-44 w-[280px]" 
      : "h-48 w-[320px]" // Larger size for iPad Mini
    : "h-60 w-96";
  
  // Simplified animation settings based on performance tier
  const getCardAnimation = () => {
    if (performanceTier === 'low') {
      return { 
        rotateY: [0], 
        y: [0], 
        scale: [1] 
      };
    }
    
    if (performanceTier === 'medium' || isMobile) {
      return { 
        rotateY: [0, 3, 0, -3, 0], 
        y: [0, -3, 0], 
        scale: [1, 1.01, 1] 
      };
    }
    
    return { 
      rotateY: [0, 15, 0, -15, 0], 
      y: [0, -10, 0], 
      scale: [1, 1.03, 1] 
    };
  };
  
  // Optimized animation duration based on device and performance
  const animationDuration = {
    high: isMobile ? 10 : 8,
    medium: isMobile ? 12 : 10,
    low: 0
  }[performanceTier];

  return (
    <CardBase
      className={`absolute ${cardSize} bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 rounded-xl shadow-xl p-4 sm:p-6 z-30`}
      initial={{ rotateY: 0, scale: 1 }}
      animate={getCardAnimation()}
      transition={{ 
        duration: animationDuration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }}
      style={{ 
        transformStyle: "preserve-3d" as const,
        perspective: "800px",
        boxShadow: performanceTier === 'high'
          ? "0 12px 30px -5px rgba(59, 130, 246, 0.55)"
          : "0 10px 20px -5px rgba(59, 130, 246, 0.45)"
      } as CSSProperties}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between">
          <div className={`${isMobile && window.innerWidth < 600 ? 'w-10 h-6' : 'w-12 h-8'} bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md`} />
          <div className="flex space-x-1">
            <div className={`${isMobile && window.innerWidth < 600 ? 'w-5 h-5' : 'w-6 h-6'} bg-blue-400 rounded-full opacity-70`} />
            <div className={`${isMobile && window.innerWidth < 600 ? 'w-5 h-5' : 'w-6 h-6'} bg-blue-600 rounded-full opacity-70 -ml-3`} />
          </div>
        </div>
        
        <div className="mt-2 sm:mt-4">
          <div className={`text-xs text-white/80 mb-1 font-medium`}>CARD NUMBER</div>
          <div className={`text-white font-mono tracking-widest ${isMobile && window.innerWidth < 600 ? 'text-xs' : 'text-sm'} font-semibold`}>
            **** **** **** 3829
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className={`text-xs text-white/80 mb-1 font-medium`}>CARD HOLDER</div>
            <div className={`text-white font-mono ${isMobile && window.innerWidth < 600 ? 'text-xs' : 'text-sm'} font-semibold`}>JOHN DOE</div>
          </div>
          <div>
            <div className={`text-xs text-white/80 mb-1 font-medium`}>EXPIRES</div>
            <div className={`text-white font-mono ${isMobile && window.innerWidth < 600 ? 'text-xs' : 'text-sm'} font-semibold`}>12/25</div>
          </div>
        </div>
      </div>
    </CardBase>
  );
};

export default MainCard;
