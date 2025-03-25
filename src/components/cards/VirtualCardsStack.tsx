
import { motion } from "framer-motion";
import { CreditCard, Wallet, Smartphone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const VirtualCardsStack = () => {
  const isMobile = useIsMobile();
  
  const cardHeight = isMobile ? "h-52" : "h-64";
  
  return (
    <div className={`${isMobile ? 'h-72' : 'h-96'} relative mx-auto max-w-md`}>
      {/* 主卡片 */}
      <motion.div
        className={`absolute inset-x-0 ${cardHeight} bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-xl p-6 border border-cyan-400/30`}
        initial={{ y: 0 }}
        animate={{ 
          y: [0, -8, 0],
          rotateX: [0, 2, 0],
          rotateY: [0, -2, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="w-12 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md" />
            <span className="text-white/80 font-mono text-sm">VIRTUAL</span>
          </div>
          
          <div className="text-white/90 font-mono text-lg tracking-widest flex justify-between">
            <span>****</span>
            <span>****</span>
            <span>****</span>
            <span>4321</span>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs text-white/60 mb-1">CARD HOLDER</div>
              <div className="text-white/90 font-mono">JOHN DOE</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-white/60 mb-1">EXPIRES</div>
              <div className="text-white/90 font-mono">12/25</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 背景卡片 1 */}
      <motion.div
        className={`absolute inset-x-0 ${cardHeight} bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-xl border border-blue-500/30`}
        initial={{ y: 20, opacity: 0.8, rotate: -4 }}
        animate={{ 
          y: [20, 15, 20],
          rotate: [-4, -5, -4],
          opacity: [0.8, 0.7, 0.8]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      >
        <div className="p-6">
          <div className="flex justify-between">
            <div className="w-10 h-7 bg-gradient-to-br from-yellow-400/80 to-yellow-600/80 rounded-md" />
            <Wallet size={24} className="text-white/70" />
          </div>
        </div>
      </motion.div>

      {/* 背景卡片 2 */}
      <motion.div
        className={`absolute inset-x-0 ${cardHeight} bg-gradient-to-br from-indigo-700 to-purple-800 rounded-xl shadow-xl border border-indigo-500/30`}
        initial={{ y: 40, opacity: 0.6, rotate: 4 }}
        animate={{ 
          y: [40, 35, 40],
          rotate: [4, 5, 4],
          opacity: [0.6, 0.5, 0.6]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4
        }}
      >
        <div className="p-6">
          <div className="flex justify-between">
            <div className="w-10 h-7 bg-gradient-to-br from-yellow-400/60 to-yellow-600/60 rounded-md" />
            <Smartphone size={24} className="text-white/50" />
          </div>
        </div>
      </motion.div>

      {/* 漂浮图标 */}
      <motion.div
        className="absolute -bottom-4 right-4 md:-bottom-8 md:right-8"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-700/40 backdrop-blur-md border border-blue-400/20">
          <CreditCard size={isMobile ? 24 : 28} className="text-cyan-300" />
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-2 left-4 md:-bottom-4 md:left-8"
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      >
        <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-cyan-700/40 backdrop-blur-md border border-cyan-400/20">
          <Wallet size={isMobile ? 20 : 24} className="text-white/80" />
        </div>
      </motion.div>
    </div>
  );
};

export default VirtualCardsStack;
