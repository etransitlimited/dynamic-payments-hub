
import { motion } from "framer-motion";
import CardBase from "./CardBase";
import { useIsMobile } from "@/hooks/use-mobile";
import { CSSProperties } from "react";

const MainCard = () => {
  const isMobile = useIsMobile();
  const cardSize = isMobile ? "h-44 w-72" : "h-52 w-80";
  
  // Simplified animations for mobile
  const cardAnimation = isMobile 
    ? { 
        rotateY: [0, 5, 0, -5, 0], // Reduced rotation range
        y: [0, -5, 0] // Reduced movement
      }
    : { 
        rotateY: [0, 15, 0, -15, 0],
        y: [0, -10, 0]
      };
  
  // Slower animation for mobile to reduce GPU usage
  const animationDuration = isMobile ? 10 : 8;

  // Improved gradient for mobile visibility
  const cardGradient = isMobile
    ? "bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600" // Brighter, more contrasting colors for mobile
    : "bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600";
  
  return (
    <CardBase
      className={`absolute ${cardSize} ${cardGradient} rounded-xl shadow-xl p-6 z-30`}
      initial={{ rotateY: 0 }}
      animate={cardAnimation}
      transition={{ 
        duration: animationDuration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }}
      style={{ transformStyle: "preserve-3d" as const } as CSSProperties}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between">
          <div className="w-12 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md" />
          <div className="flex space-x-1">
            <div className="w-6 h-6 bg-cyan-500 rounded-full opacity-70" />
            <div className="w-6 h-6 bg-blue-500 rounded-full opacity-70 -ml-3" />
          </div>
        </div>
        
        <div className="mt-4">
          <div className={`text-xs text-white/70 mb-1`}>CARD NUMBER</div>
          <div className={`text-white font-mono tracking-widest ${isMobile ? 'text-sm' : ''}`}>
            **** **** **** 3829
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className={`text-xs text-white/70 mb-1`}>CARD HOLDER</div>
            <div className={`text-white font-mono ${isMobile ? 'text-sm' : ''}`}>JOHN DOE</div>
          </div>
          <div>
            <div className={`text-xs text-white/70 mb-1`}>EXPIRES</div>
            <div className={`text-white font-mono ${isMobile ? 'text-sm' : ''}`}>12/25</div>
          </div>
        </div>
      </div>
    </CardBase>
  );
};

export default MainCard;
