
import CardBase from "./CardBase";
import { useIsMobile } from "@/hooks/use-mobile";
import { CSSProperties } from "react";

interface BackgroundCardProps {
  index: number;
}

const BackgroundCard = ({ index }: BackgroundCardProps) => {
  const isMobile = useIsMobile();
  // Ensured background cards maintain proper proportion with main card
  const cardSize = isMobile ? "h-48 w-80" : "h-60 w-96";
  
  const cardConfigs = [
    {
      className: `absolute ${cardSize} bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-xl shadow-xl z-20`,
      style: { 
        transform: `translateZ(-25px) translateY(25px) rotate(-6deg)`, // Adjusted for better proportions
        transformStyle: "preserve-3d" as const,
        perspective: "600px", // Balanced perspective
        boxShadow: "0 10px 20px -3px rgba(59, 130, 246, 0.45)"
      } as CSSProperties,
      initial: { opacity: 0.8, scale: 0.97 },
      animate: {
        opacity: [0.8, 0.7, 0.8],
        rotate: [-6, -8, -6], // More balanced rotation
        scale: [0.97, 0.99, 0.97] // Adjusted for better proportion
      },
      transition: { 
        duration: 7, // Slightly faster for more natural movement
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    {
      className: `absolute ${cardSize} bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 rounded-xl shadow-xl z-10`,
      style: { 
        transform: `translateZ(-40px) translateY(45px) rotate(6deg)`, // Balanced position
        transformStyle: "preserve-3d" as const,
        perspective: "600px", // Balanced perspective
        boxShadow: "0 8px 18px -2px rgba(59, 130, 246, 0.35)"
      } as CSSProperties,
      initial: { opacity: 0.6, scale: 0.95 },
      animate: {
        opacity: [0.6, 0.5, 0.6],
        rotate: [6, 8, 6], // More balanced rotation
        scale: [0.95, 0.97, 0.95] // Better proportioned scaling
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
