
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const CardDecorations = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {/* Decorative elements - enhanced for mobile */}
      <motion.div
        className="absolute -bottom-4 -right-4 z-50"
        animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className={`flex items-center justify-center w-16 h-16 rounded-full ${
          isMobile ? 'bg-gradient-to-br from-cyan-500/90 to-cyan-700/90' : 'bg-gradient-to-br from-blue-500/80 to-blue-700/80'
        } backdrop-blur-md`}>
          <CreditCard size={28} className="text-white" />
        </div>
      </motion.div>
      
      {/* Glowing effects - brighter on mobile */}
      {[...Array(isMobile ? 7 : 5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${isMobile ? 'w-3 h-3' : 'w-2 h-2'} rounded-full ${
            isMobile ? 'bg-yellow-300/90' : 'bg-cyan-400/80'
          }`}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            zIndex: 5,
            boxShadow: isMobile ? '0 0 8px 2px rgba(236, 252, 203, 0.6)' : 'none'
          }}
          animate={{ 
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </>
  );
};

export default CardDecorations;
