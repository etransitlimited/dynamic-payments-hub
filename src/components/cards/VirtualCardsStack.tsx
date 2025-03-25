
import { motion } from "framer-motion";
import { CreditCard, Wallet, ShieldCheck, Smartphone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Stack of virtual cards with animation - updated design
const VirtualCardsStack = () => {
  const isMobile = useIsMobile();
  
  // Calculate responsive sizes based on screen width
  const cardHeight = isMobile ? "h-48" : "h-60";
  
  return (
    <div className={`${isMobile ? 'h-72 mx-auto' : 'h-96'} relative perspective-1000 max-w-sm w-full z-30`}>
      {/* Card 1 - Main card - Updated gradient and details */}
      <motion.div
        className={`absolute top-0 left-0 right-0 ${cardHeight} bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-xl shadow-xl p-5 md:p-6 border border-blue-400/30 z-30`}
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
          {/* Card chip and type */}
          <div className="flex justify-between">
            <div className="flex space-x-2 items-start">
              {/* Holographic chip */}
              <motion.div 
                className={`${isMobile ? 'w-10 h-7' : 'w-12 h-8'} bg-gradient-to-br from-cyan-300 to-blue-500 rounded-md shadow-inner overflow-hidden relative`}
                whileHover={{ scale: 1.05 }}
              >
                {/* Chip details */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-px opacity-30">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-white/10 rounded-sm" />
                  ))}
                </div>
              </motion.div>
              
              {/* NFC symbol */}
              <motion.div 
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col space-y-0.5"
              >
                <div className="w-1.5 h-1.5 bg-cyan-300/70 rounded-full" />
                <div className="w-1.5 h-1.5 bg-cyan-300/50 rounded-full" />
                <div className="w-1.5 h-1.5 bg-cyan-300/30 rounded-full" />
              </motion.div>
            </div>
            
            {/* Virtual identifier with animation */}
            <motion.div 
              className="text-white font-mono text-sm flex items-center gap-2"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ShieldCheck size={isMobile ? 14 : 14} className="text-cyan-300" />
              <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>VIRTUAL</span>
            </motion.div>
          </div>
          
          {/* Card number with masked digits */}
          <div className="mt-4">
            <div className={`text-white/80 font-mono ${isMobile ? 'text-xs' : 'text-xs'} tracking-wide mb-1`}>CARD NUMBER</div>
            <div className={`text-white/90 font-mono ${isMobile ? 'text-base' : 'text-lg'} tracking-wider flex justify-between items-center`}>
              <motion.span 
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
              >****</motion.span>
              <motion.span 
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
              >****</motion.span>
              <motion.span 
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
              >****</motion.span>
              <motion.span 
                animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                className="text-cyan-200"
              >3829</motion.span>
            </div>
          </div>
          
          {/* Card holder and expiry information */}
          <div className="flex justify-between items-end mt-2">
            <div>
              <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/60 mb-1`}>CARD HOLDER</div>
              <div className={`text-white/90 font-mono ${isMobile ? 'text-sm' : 'text-sm'}`}>EMMA WILSON</div>
            </div>
            <div className="flex flex-col items-end">
              <div className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/60 mb-1`}>EXPIRES</div>
              <div className={`text-white/90 font-mono ${isMobile ? 'text-sm' : 'text-sm'}`}>11/26</div>
            </div>
          </div>
          
          {/* Network logo - updated with network animation */}
          <motion.div 
            className="absolute right-0 top-0 mt-1 mr-1"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex space-x-0.5">
              <div className="w-4 h-4 rounded-full bg-cyan-500/80 backdrop-blur-sm" />
              <div className="w-4 h-4 rounded-full bg-blue-500/80 backdrop-blur-sm translate-x-[-30%]" />
            </div>
          </motion.div>
          
          {/* Updated security pattern */}
          <div className="absolute left-0 bottom-0 w-full h-1/3 overflow-hidden opacity-10">
            <div className="absolute inset-0 w-full h-full">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute bg-white/20 rounded-full"
                  style={{
                    width: `${10 + Math.random() * 20}%`,
                    height: `${10 + Math.random() * 20}%`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0.1 + Math.random() * 0.2
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Card 2 - Updated gradient */}
      <motion.div
        className={`absolute top-0 left-0 right-0 ${cardHeight} bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-xl shadow-xl border border-indigo-500/30 z-20`}
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
            <div className={`${isMobile ? 'w-10 h-7' : 'w-10 h-8'} bg-gradient-to-br from-cyan-400/80 to-blue-600/80 rounded-md`}/>
            <Wallet size={isMobile ? 22 : 24} className="text-white/70" />
          </div>
        </div>
      </motion.div>
      
      {/* Card 3 - Updated gradient */}
      <motion.div
        className={`absolute top-0 left-0 right-0 ${cardHeight} bg-gradient-to-br from-purple-700 via-purple-800 to-blue-900 rounded-xl shadow-xl border border-purple-500/30 z-10`}
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
            <div className={`${isMobile ? 'w-10 h-7' : 'w-10 h-8'} bg-gradient-to-br from-cyan-400/60 to-blue-600/60 rounded-md`}/>
            <Smartphone size={isMobile ? 22 : 24} className="text-white/50" />
          </div>
        </div>
      </motion.div>
      
      {/* Decorative elements - Updated with new positions and styles */}
      <motion.div
        className="absolute -bottom-4 -right-4 z-40"
        animate={{ y: [0, -10, 0], rotateZ: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-600/40 to-blue-800/40 backdrop-blur-md border border-blue-400/20">
          <CreditCard size={isMobile ? 24 : 28} className="text-cyan-300" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute -bottom-2 -left-4 z-40"
        animate={{ y: [0, 10, 0], rotateZ: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
      >
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-cyan-600/40 to-cyan-800/40 backdrop-blur-md border border-cyan-400/20">
          <Wallet size={isMobile ? 20 : 22} className="text-white/80" />
        </div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-14 left-10 md:bottom-0 md:left-20 z-40"
        animate={{ y: [0, -8, 0], rotateZ: [0, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-indigo-600/40 to-indigo-800/40 backdrop-blur-md border border-indigo-400/20">
          <Smartphone size={isMobile ? 16 : 18} className="text-cyan-300/80" />
        </div>
      </motion.div>
      
      {/* Added glowing dots for visual interest */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300/70"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            zIndex: 5
          }}
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
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
