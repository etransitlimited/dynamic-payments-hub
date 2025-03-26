
import CardBase from "./CardBase";
import { useIsMobile } from "@/hooks/use-mobile";
import { CSSProperties } from "react";

interface BackgroundCardProps {
  index: number;
}

const BackgroundCard = ({ index }: BackgroundCardProps) => {
  const isMobile = useIsMobile();
  const cardSize = isMobile ? "h-52 w-80" : "h-64 w-96"; // Increased size to match MainCard
  
  const cardConfigs = [
    {
      className: `absolute ${cardSize} bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-xl shadow-xl z-20`,
      style: { 
        transform: `translateZ(-30px) translateY(30px) rotate(-7deg)`, // Enhanced 3D effect
        transformStyle: "preserve-3d" as const,
        perspective: "800px", // Added perspective
        boxShadow: "0 12px 25px -3px rgba(59, 130, 246, 0.5)"
      } as CSSProperties,
      initial: { opacity: 0.8, scale: 0.98 },
      animate: {
        opacity: [0.8, 0.7, 0.8],
        rotate: [-7, -9, -7],
        scale: [0.98, 1, 0.98] // Added subtle scaling
      },
      transition: { 
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    {
      className: `absolute ${cardSize} bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 rounded-xl shadow-xl z-10`,
      style: { 
        transform: `translateZ(-50px) translateY(50px) rotate(7deg)`, // Enhanced 3D effect
        transformStyle: "preserve-3d" as const,
        perspective: "800px", // Added perspective
        boxShadow: "0 10px 20px -2px rgba(59, 130, 246, 0.4)"
      } as CSSProperties,
      initial: { opacity: 0.6, scale: 0.96 },
      animate: {
        opacity: [0.6, 0.5, 0.6],
        rotate: [7, 9, 7],
        scale: [0.96, 0.99, 0.96] // Added subtle scaling
      },
      transition: { 
        duration: 9,
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
