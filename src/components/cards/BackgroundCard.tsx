
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
  
  // Ensured background cards maintain proper proportion with main card
  const cardSize = isMobile ? "h-48 w-80" : "h-60 w-96";
  
  // Simplified animation settings based on performance tier
  const animationDuration = {
    high: index === 0 ? 7 : 8,
    medium: index === 0 ? 10 : 12,
    low: 0 // No animation on low-performance devices
  }[performanceTier];
  
  // Reduced animation complexity for lower performance tiers
  const animationAmount = {
    high: { rotate: [-6, -8, -6], scale: [0.97, 0.99, 0.97] },
    medium: { rotate: [-4, -5, -4], scale: [0.98, 0.99, 0.98] },
    low: { rotate: [0], scale: [0.97] }
  }[performanceTier];
  
  const cardConfigs = [
    {
      className: `absolute ${cardSize} bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-xl shadow-xl z-20`,
      style: { 
        transform: `translateZ(-25px) translateY(25px) rotate(-6deg)`,
        transformStyle: "preserve-3d" as const,
        perspective: "600px",
        boxShadow: performanceTier === 'high' 
          ? "0 10px 20px -3px rgba(59, 130, 246, 0.45)" 
          : "0 10px 15px -3px rgba(59, 130, 246, 0.35)"
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
      className: `absolute ${cardSize} bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 rounded-xl shadow-xl z-10`,
      style: { 
        transform: `translateZ(-40px) translateY(45px) rotate(6deg)`,
        transformStyle: "preserve-3d" as const,
        perspective: "600px",
        boxShadow: performanceTier === 'high' 
          ? "0 8px 18px -2px rgba(59, 130, 246, 0.35)" 
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
