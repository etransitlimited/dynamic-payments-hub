
import { motion } from "framer-motion";
import { CreditCard, Wallet, Smartphone, RefreshCw } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Stack of virtual cards with animation
const VirtualCardsStack = () => {
  const isMobile = useIsMobile();
  
  // Calculate responsive sizes based on screen width
  const cardHeight = isMobile ? "h-48" : "h-60";
  
  return (
    <div className={`${isMobile ? 'h-72 mx-auto' : 'h-96'} relative perspective-1000 max-w-sm w-full`}>
      {/* Card 1 - Main card */}
      <motion.div
        className={`absolute top-0 left-0 right-0 ${cardHeight} bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-xl p-5 md:p-6 border border-cyan-400/30`}
        initial={{ rotateY: 0, rotateX: 0, y: 0 }}
        animate={{ 
          rotateY: [0, 15, 0, -15, 0],
          rotateX: [0, -10, 5, -5, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop"
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative h-full flex flex-col justify-between">
          {/* Card content */}
          <div className="flex justify-between">
            <motion.div 
              className={`${isMobile ? 'w-12 h-8' : 'w-12 h-9'} bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md shadow-inner`}
              whileHover={{ scale: 1.05 }}
            />
            <motion.div 
              className="text-white font-mono text-sm flex items-center gap-2"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <RefreshCw size={isMobile ? 14 : 14} className="text-cyan-300" />
              <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>VIRTUAL</span>
            </motion.div>
          </div>
          
          <div className={`text-white/90 font-mono ${isMobile ? 'text-base' : 'text-lg'} tracking-wider flex justify-between`}>
            <span>****</span>
            <span>****</span>
            <span>****</span>
            <span>3829</span>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/60 mb-1`}>CARD HOLDER</div>
              <div className={`text-white/90 font-mono ${isMobile ? 'text-sm' : 'text-sm'}`}>EMMA WILSON</div>
            </div>
            <div className="flex flex-col items-end">
              <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/60 mb-1`}>EXPIRES</div>
              <div className={`text-white/90 font-mono ${isMobile ? 'text-sm' : 'text-sm'}`}>11/26</div>
            </div>
          </div>
          
          {/* Animated security circles */}
          <motion.div 
            className="absolute right-0 bottom-0 flex gap-1"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} rounded-full bg-gradient-to-r from-cyan-300/30 to-blue-300/30 backdrop-blur-sm border border-white/10`}
                style={{ transformStyle: "preserve-3d", transform: `translateZ(${i * 2}px)` }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Card 2 */}
      <motion.div
        className={`absolute top-0 left-0 right-0 ${cardHeight} bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-xl border border-blue-500/30`}
        style={{ 
          transformStyle: "preserve-3d",
          transform: `translateZ(-20px) translateY(${isMobile ? '25px' : '40px'}) rotate(-5deg)` 
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
      >
        <div className="p-5 md:p-6">
          <div className="flex justify-between">
            <div className={`${isMobile ? 'w-10 h-7' : 'w-10 h-8'} bg-gradient-to-br from-yellow-400/80 to-yellow-600/80 rounded-md`}/>
            <Wallet size={isMobile ? 22 : 24} className="text-white/70" />
          </div>
        </div>
      </motion.div>
      
      {/* Card 3 */}
      <motion.div
        className={`absolute top-0 left-0 right-0 ${cardHeight} bg-gradient-to-br from-indigo-700 to-purple-800 rounded-xl shadow-xl border border-indigo-500/30`}
        style={{ 
          transformStyle: "preserve-3d",
          transform: `translateZ(-40px) translateY(${isMobile ? '50px' : '80px'}) rotate(5deg)` 
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
      >
        <div className="p-5 md:p-6">
          <div className="flex justify-between">
            <div className={`${isMobile ? 'w-10 h-7' : 'w-10 h-8'} bg-gradient-to-br from-yellow-400/60 to-yellow-600/60 rounded-md`}/>
            <Smartphone size={isMobile ? 22 : 24} className="text-white/50" />
          </div>
        </div>
      </motion.div>
      
      {/* Floating payment icons with adjusted positioning for better overall layout */}
      <motion.div
        className="absolute -bottom-4 right-0 md:bottom-0 md:-right-4 flex flex-col gap-4 md:gap-6"
        animate={{ y: [0, -15, 0], rotateZ: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-700/40 backdrop-blur-md border border-blue-400/20">
          <CreditCard size={isMobile ? 24 : 30} className="text-cyan-300" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute -bottom-2 left-0 md:bottom-20 md:left-4 flex flex-col gap-4 md:gap-6"
        animate={{ y: [0, 15, 0], rotateZ: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
      >
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-cyan-700/40 backdrop-blur-md border border-cyan-400/20">
          <Wallet size={isMobile ? 20 : 24} className="text-white/80" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-16 left-12 md:bottom-4 md:left-24 flex flex-col gap-4 md:gap-6"
        animate={{ y: [0, -10, 0], rotateZ: [0, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-700/40 backdrop-blur-md border border-indigo-400/20">
          <Smartphone size={isMobile ? 16 : 20} className="text-cyan-300/80" />
        </div>
      </motion.div>
    </div>
  );
};

export default VirtualCardsStack;
