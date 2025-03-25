
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle, ShieldCheck } from "lucide-react";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto pt-16 pb-28 px-4 relative z-10">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100">
            {t("hero.subtitle")}
          </p>
          <Button 
            className="bg-gradient-to-r from-blue-400 to-cyan-300 text-blue-900 text-lg px-8 py-6 rounded-lg hover:opacity-90 transition-all"
          >
            {t("hero.button")}
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block"
        >
          <div className="relative perspective-1000">
            <VirtualCardAnimation />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Virtual payment card animation component
const VirtualCardAnimation = () => {
  return (
    <div className="relative h-72 w-full max-w-md mx-auto">
      {/* Background glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
      
      {/* Main card */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 rounded-xl shadow-xl border border-blue-500/30 p-6 flex flex-col justify-between"
        initial={{ rotateY: 25, rotateX: 15 }}
        animate={{ 
          rotateY: [25, -5, 25],
          rotateX: [15, -5, 15]
        }}
        transition={{ 
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card chip */}
        <div className="flex justify-between items-start">
          <div className="w-12 h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md shadow-inner flex items-center justify-center overflow-hidden">
            <div className="w-full h-1/2 bg-gradient-to-r from-yellow-600/30 to-transparent grid grid-cols-3 gap-px">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-yellow-600/40 h-1"></div>
              ))}
            </div>
          </div>
          <motion.div 
            className="text-white text-xl font-mono font-bold"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            VIRTUAL
          </motion.div>
        </div>
        
        {/* Card number */}
        <div className="text-white/90 font-mono text-lg tracking-wider flex justify-between my-3">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            **** 
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            **** 
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            **** 
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            4289
          </motion.span>
        </div>
        
        {/* Card holder & expiry */}
        <div className="flex justify-between">
          <div className="text-white/80 font-mono text-sm">
            <div className="text-xs text-white/60 mb-1">CARD HOLDER</div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >
              JOHN DOE
            </motion.div>
          </div>
          <div className="text-white/80 font-mono text-sm">
            <div className="text-xs text-white/60 mb-1">EXPIRES</div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.5 }}
            >
              05/28
            </motion.div>
          </div>
        </div>
        
        {/* Security features visualization */}
        <motion.div 
          className="absolute bottom-2 right-6 text-cyan-300/70"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7] 
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <ShieldCheck size={24} />
        </motion.div>
      </motion.div>
      
      {/* Second card for depth effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-cyan-900 rounded-xl shadow-xl border border-cyan-500/30"
        style={{ 
          transformStyle: "preserve-3d",
          transform: "translateZ(-20px) translateX(10px) translateY(10px)" 
        }}
        initial={{ opacity: 0.7 }}
        animate={{ 
          opacity: [0.7, 0.6, 0.7],
        }}
        transition={{ 
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      ></motion.div>
      
      {/* Payment security badges */}
      <motion.div
        className="absolute -bottom-16 left-0 right-0 flex justify-center gap-4 text-white/80"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      >
        <div className="flex items-center gap-1 text-xs">
          <CheckCircle size={16} className="text-green-400" />
          <span>Secure</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <CreditCard size={16} className="text-blue-400" />
          <span>Instant Issue</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <ShieldCheck size={16} className="text-cyan-400" />
          <span>Protected</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
