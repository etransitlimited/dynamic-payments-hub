
import CardBase from "./CardBase";
import { useIsMobile } from "@/hooks/use-mobile";
import { CSSProperties } from "react";

interface BackgroundCardProps {
  index: number;
}

const BackgroundCard = ({ index }: BackgroundCardProps) => {
  const isMobile = useIsMobile();
  const cardSize = isMobile ? "h-44 w-72" : "h-52 w-80";
  
  // More vibrant and distinct color gradients for background cards
  const cardConfigs = [
    {
      className: `absolute ${cardSize} ${isMobile ? 
        'bg-gradient-to-br from-[#FF6B6B] via-[#FF4081] to-[#FF1493]' : // Bright pink to magenta
        'bg-gradient-to-br from-[#6A5ACD] via-[#483D8B] to-[#4B0082]'} rounded-xl shadow-xl z-20`, // Deep slate blue to indigo
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
        'bg-gradient-to-br from-[#FFA500] via-[#FF8C00] to-[#FF4500]' : // Bright orange gradients
        'bg-gradient-to-br from-[#8B008B] via-[#9932CC] to-[#BA55D3]'} rounded-xl shadow-xl z-10`, // Deep purple to orchid
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
