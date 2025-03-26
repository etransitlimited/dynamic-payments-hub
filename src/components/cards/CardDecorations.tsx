
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";

const CardDecorations = () => {
  const isMobile = useIsMobile();
  const { performanceTier, useGlowEffects } = usePerformance();
  
  // Adjust number of particles based on performance
  const particleCount = {
    high: isMobile ? 5 : 7,
    medium: isMobile ? 3 : 4,
    low: 0
  }[performanceTier];
  
  return (
    <>
      {/* Main icon - shown on medium and high performance only */}
      {performanceTier !== 'low' && (
        <motion.div
          className="absolute -bottom-4 -right-4 z-50"
          animate={{ 
            y: performanceTier === 'high' ? [0, -10, 0] : [0, -5, 0], 
            rotate: performanceTier === 'high' ? [0, -5, 0] : [0, -2, 0]
          }}
          transition={{ 
            duration: performanceTier === 'high' ? 5 : 7,
            repeat: Infinity 
          }}
        >
          <div className={`flex items-center justify-center w-16 h-16 rounded-full 
            bg-gradient-to-br from-blue-500/90 to-blue-700/90 backdrop-blur-md shadow-lg`}>
            <CreditCard size={28} className="text-white" />
          </div>
        </motion.div>
      )}
      
      {/* Glowing effects - only shown when performance allows */}
      {useGlowEffects && [...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5'} rounded-full 
          ${i % 2 === 0 ? 'bg-blue-300/80' : 'bg-cyan-400/80'}`}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            zIndex: 5,
            boxShadow: useGlowEffects 
              ? `0 0 ${isMobile ? '6px' : '8px'} 2px rgba(59, 130, 246, ${isMobile ? '0.5' : '0.4'})`
              : 'none'
          }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2 + Math.random() * (performanceTier === 'high' ? 3 : 2),
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </>
  );
};

export default CardDecorations;
