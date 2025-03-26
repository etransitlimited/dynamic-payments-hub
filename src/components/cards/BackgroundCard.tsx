
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
  // Enhanced color gradients for better contrast on mobile
  const cardConfigs = [
    {
      className: `absolute ${cardSize} ${isMobile ? 
        'bg-gradient-to-br from-fuchsia-500 via-pink-600 to-orange-500' : 
        'bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700'} rounded-xl shadow-xl z-20`,
      style: { 
        transform: `translateZ(-20px) translateY(20px) rotate(-5deg)`,
        transformStyle: "preserve-3d" as const
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
      className: `absolute ${cardSize} ${isMobile ? 
        'bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500' : 
        'bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800'} rounded-xl shadow-xl z-10`,
      style: { 
        transform: `translateZ(-40px) translateY(40px) rotate(5deg)`,
        transformStyle: "preserve-3d" as const
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
