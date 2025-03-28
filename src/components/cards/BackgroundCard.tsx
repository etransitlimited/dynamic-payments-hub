
import CardBase from "./CardBase";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";
import { CSSProperties } from "react";

interface BackgroundCardProps {
  index: number;
}

const BackgroundCard = ({ index }: BackgroundCardProps) => {
  const isMobile = useIsMobile();
  const { performanceTier } = usePerformance();
  
  // Optimized card sizes for different screen sizes
  const cardSize = isMobile 
    ? window.innerWidth < 600 
      ? "h-44 w-[280px]" 
      : "h-48 w-[320px]" // Larger size for iPad Mini
    : "h-60 w-96";
  
  // Simplified animation settings based on performance tier
  const animationDuration = {
    high: index === 0 ? 7 : 8,
    medium: index === 0 ? 10 : 12,
    low: 0 // No animation on low-performance devices
  }[performanceTier];
  
  // Reduced animation complexity and offsets for mobile
  const animationAmount = {
    high: { 
      rotate: isMobile ? [-3, -4, -3] : [-6, -8, -6], 
      scale: [0.97, 0.99, 0.97] 
    },
    medium: { 
      rotate: isMobile ? [-2, -3, -2] : [-4, -5, -4], 
      scale: [0.98, 0.99, 0.98] 
    },
    low: { 
      rotate: [0], 
      scale: [0.97] 
    }
  }[performanceTier];
  
  // Adjusted vertical and z-index offsets for different screen sizes
  const getOffsets = () => {
    if (!isMobile) {
      return {
        z0: "-10px", // First card behind main card
        y0: "25px",
        z1: "-20px", // Second card behind first card
        y1: "45px"
      };
    }
    
    // Smaller offsets for iPad Mini
    if (window.innerWidth >= 600) {
      return {
        z0: "-8px",
        y0: "20px",
        z1: "-16px",
        y1: "35px"
      };
    }
    
    // Smallest offsets for phones
    return {
      z0: "-5px",
      y0: "15px",
      z1: "-10px",
      y1: "30px"
    };
  };
  
  const offsets = getOffsets();
  
  const getZIndex = () => {
    // The main card should have the highest z-index
    // Background cards should have successively lower z-indices
    return 10 - (index + 1) * 2;
  };
  
  const cardConfigs = [
    {
      className: `absolute ${cardSize} bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-xl shadow-xl`,
      style: { 
        transform: `translateZ(${offsets.z0}) translateY(${offsets.y0}) rotate(-6deg)`,
        position: "absolute",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        zIndex: getZIndex()
      } as CSSProperties,
      initial: { opacity: 0.8, scale: 0.97 },
      animate: {
        opacity: performanceTier === 'high' ? [0.8, 0.7, 0.8] : 0.8,
        rotate: animationAmount.rotate,
        scale: animationAmount.scale
      },
      transition: { 
        duration: animationDuration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    {
      className: `absolute ${cardSize} bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 rounded-xl shadow-xl`,
      style: { 
        transform: `translateZ(${offsets.z1}) translateY(${offsets.y1}) rotate(6deg)`,
        position: "absolute",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        zIndex: getZIndex() - 1
      } as CSSProperties,
      initial: { opacity: 0.6, scale: 0.95 },
      animate: {
        opacity: performanceTier === 'high' ? [0.6, 0.5, 0.6] : 0.6,
        rotate: index === 0 ? animationAmount.rotate.map(r => -r) : [0],
        scale: animationAmount.scale
      },
      transition: { 
        duration: animationDuration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  ];
  
  const config = index < cardConfigs.length ? cardConfigs[index] : cardConfigs[0];
  
  return (
    <CardBase
      className={config.className}
      style={config.style}
      initial={config.initial}
      animate={config.animate}
      transition={config.transition}
    />
  );
};

export default BackgroundCard;
