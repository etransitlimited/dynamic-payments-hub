
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

const CardDecorations = () => {
  return (
    <>
      {/* Decorative elements */}
      <motion.div
        className="absolute -bottom-4 -right-4 z-50"
        animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/80 to-blue-700/80 backdrop-blur-md">
          <CreditCard size={28} className="text-white" />
        </div>
      </motion.div>
      
      {/* Glowing effects */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-cyan-400/80"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            zIndex: 5
          }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1]
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
