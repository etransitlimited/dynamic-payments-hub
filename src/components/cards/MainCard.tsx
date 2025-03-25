
import { motion } from "framer-motion";
import CardBase from "./CardBase";
import { useIsMobile } from "@/hooks/use-mobile";
import { CSSProperties } from "react";

const MainCard = () => {
  const isMobile = useIsMobile();
  const cardSize = isMobile ? "h-44 w-72" : "h-52 w-80";
  
  return (
    <CardBase
      className={`absolute ${cardSize} bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-xl shadow-xl p-6 z-30`}
      initial={{ rotateY: 0 }}
      animate={{ 
        rotateY: [0, 15, 0, -15, 0],
        y: [0, -10, 0]
      }}
      transition={{ 
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }}
      style={{ transformStyle: "preserve-3d" } as CSSProperties}
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
          <div className="text-xs text-white/70 mb-1">CARD NUMBER</div>
          <div className="text-white font-mono tracking-widest">
            **** **** **** 3829
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs text-white/70 mb-1">CARD HOLDER</div>
            <div className="text-white font-mono">JOHN DOE</div>
          </div>
          <div>
            <div className="text-xs text-white/70 mb-1">EXPIRES</div>
            <div className="text-white font-mono">12/25</div>
          </div>
        </div>
      </div>
    </CardBase>
  );
};

export default MainCard;
