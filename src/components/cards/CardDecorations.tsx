
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const CardDecorations = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {/* Decorative elements - enhanced with blue theme */}
      <motion.div
        className="absolute -bottom-4 -right-4 z-50"
        animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className={`flex items-center justify-center w-16 h-16 rounded-full 
          bg-gradient-to-br from-blue-500/90 to-blue-700/90 backdrop-blur-md shadow-lg`}>
          <CreditCard size={28} className="text-white" />
        </div>
      </motion.div>
      
      {/* Glowing effects - blue theme */}
      {[...Array(isMobile ? 7 : 5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${isMobile ? 'w-3 h-3' : 'w-2 h-2'} rounded-full 
          ${i % 2 === 0 ? 'bg-blue-300/90' : 'bg-cyan-400/90'}`}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            zIndex: 5,
            boxShadow: `0 0 8px 2px rgba(59, 130, 246, ${isMobile ? '0.6' : '0.4'})`
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
