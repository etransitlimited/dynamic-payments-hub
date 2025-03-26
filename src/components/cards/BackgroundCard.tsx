
import CardBase from "./CardBase";
import { useIsMobile } from "@/hooks/use-mobile";
import { CSSProperties } from "react";

interface BackgroundCardProps {
  index: number;
}

const BackgroundCard = ({ index }: BackgroundCardProps) => {
  const isMobile = useIsMobile();
  const cardSize = isMobile ? "h-44 w-72" : "h-52 w-80";
  
  // Different configurations based on card position
  // Using blue color scheme for both cards
  const cardConfigs = [
    {
      className: `absolute ${cardSize} bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-xl shadow-xl z-20`,
      style: { 
        transform: `translateZ(-20px) translateY(20px) rotate(-5deg)`,
        transformStyle: "preserve-3d" as const,
        boxShadow: "0 8px 20px -3px rgba(59, 130, 246, 0.4)"
      } as CSSProperties,
      initial: { opacity: 0.8 },
      animate: {
        opacity: [0.8, 0.7, 0.8],
        rotate: [-5, -7, -5]
      },
      transition: { 
        duration: 7,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    {
      className: `absolute ${cardSize} bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 rounded-xl shadow-xl z-10`,
      style: { 
        transform: `translateZ(-40px) translateY(40px) rotate(5deg)`,
        transformStyle: "preserve-3d" as const,
        boxShadow: "0 6px 15px -2px rgba(59, 130, 246, 0.3)"
      } as CSSProperties,
      initial: { opacity: 0.6 },
      animate: {
        opacity: [0.6, 0.5, 0.6],
        rotate: [5, 7, 5]
      },
      transition: { 
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  ];
  
  // Use the card configuration based on index, or default to first config
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
