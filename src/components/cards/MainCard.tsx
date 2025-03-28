
import CardBase from "./CardBase";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";
import { CSSProperties } from "react";
import CreditCard from "./CreditCard";

const MainCard = () => {
  const isMobile = useIsMobile();
  const { performanceTier } = usePerformance();
  
  const cardSize = isMobile 
    ? window.innerWidth < 600 
      ? "h-44 w-[280px]" 
      : "h-48 w-[320px]" // Larger size for iPad Mini
    : "h-60 w-96";
  
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
  
  const animationDuration = {
    high: isMobile ? 10 : 8,
    medium: isMobile ? 12 : 10,
    low: 0
  }[performanceTier];

  return (
    <CardBase
      className={`absolute ${cardSize}`}
      initial={{ rotateY: 0, scale: 1 }}
      animate={getCardAnimation()}
      transition={{ 
        duration: animationDuration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }}
      style={{ 
        position: "absolute",
        transformStyle: "preserve-3d" as const,
        perspective: "800px",
        zIndex: 20 // Ensure main card is on top
      } as CSSProperties}
    >
      <CreditCard />
    </CardBase>
  );
};

export default MainCard;
