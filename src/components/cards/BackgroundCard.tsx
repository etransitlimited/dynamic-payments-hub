
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
        z0: "-25px",
        y0: "25px",
        z1: "-40px",
        y1: "45px"
      };
    }
    
    // Smaller offsets for iPad Mini
    if (window.innerWidth >= 600) {
      return {
        z0: "-20px",
        y0: "20px",
        z1: "-30px",
        y1: "35px"
      };
    }
    
    // Smallest offsets for phones
    return {
      z0: "-15px",
      y0: "15px",
      z1: "-25px",
      y1: "30px"
    };
  };
  
  const mobileOffsets = getOffsets();
  
  // Enhanced glass effect colors based on index
  const glassColors = [
    {
      from: "from-blue-400/30",
      via: "via-blue-500/20",
      to: "to-blue-700/30",
      glow: "rgba(59, 130, 246, 0.45)"
    },
    {
      from: "from-blue-300/30",
      via: "via-blue-400/20",
      to: "to-blue-600/30",
      glow: "rgba(59, 130, 246, 0.35)"
    }
  ];
  
  const currentColors = index < glassColors.length ? glassColors[index] : glassColors[0];
  
  const cardConfigs = [
    {
      className: `absolute ${cardSize} bg-gradient-to-br ${currentColors.from} ${currentColors.via} ${currentColors.to} rounded-xl shadow-xl z-20 backdrop-blur-md border border-blue-400/30`,
      style: { 
        transform: `translateZ(${mobileOffsets.z0}) translateY(${mobileOffsets.y0}) rotate(-6deg)`,
        transformStyle: "preserve-3d" as const,
        perspective: "600px",
        boxShadow: performanceTier === 'high' 
          ? `0 10px 20px -3px ${currentColors.glow}` 
          : `0 10px 15px -3px rgba(59, 130, 246, 0.35)`
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
      className: `absolute ${cardSize} bg-gradient-to-br ${glassColors[1].from} ${glassColors[1].via} ${glassColors[1].to} rounded-xl shadow-xl z-10 backdrop-blur-md border border-blue-300/30`,
      style: { 
        transform: `translateZ(${mobileOffsets.z1}) translateY(${mobileOffsets.y1}) rotate(6deg)`,
        transformStyle: "preserve-3d" as const,
        perspective: "600px",
        boxShadow: performanceTier === 'high' 
          ? `0 8px 18px -2px ${glassColors[1].glow}` 
          : "0 8px 15px -2px rgba(59, 130, 246, 0.25)"
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
