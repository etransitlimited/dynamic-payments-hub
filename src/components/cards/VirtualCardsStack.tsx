
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Stack of virtual cards with animation
const VirtualCardsStack = () => {
  const isMobile = useIsMobile();
  
  // Calculate responsive sizes based on screen width
  const cardSize = isMobile ? "h-44 w-72" : "h-52 w-80";
  
  return (
    <div className="relative h-80 w-full perspective-1000">
      {/* Card 1 - Main card */}
      <motion.div
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
        style={{ transformStyle: "preserve-3d" }}
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
      </motion.div>
      
      {/* Card 2 */}
      <motion.div
        className={`absolute ${cardSize} bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 rounded-xl shadow-xl z-20`}
        style={{ 
          transformStyle: "preserve-3d",
          transform: `translateZ(-20px) translateY(20px) rotate(-5deg)` 
        }}
        initial={{ opacity: 0.8 }}
        animate={{
          opacity: [0.8, 0.7, 0.8],
          rotate: [-5, -7, -5]
        }}
        transition={{ 
          duration: 7,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Card 3 */}
      <motion.div
        className={`absolute ${cardSize} bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-xl shadow-xl z-10`}
        style={{ 
          transformStyle: "preserve-3d",
          transform: `translateZ(-40px) translateY(40px) rotate(5deg)` 
        }}
        initial={{ opacity: 0.6 }}
        animate={{
          opacity: [0.6, 0.5, 0.6],
          rotate: [5, 7, 5]
        }}
        transition={{ 
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
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
    </div>
  );
};

export default VirtualCardsStack;
