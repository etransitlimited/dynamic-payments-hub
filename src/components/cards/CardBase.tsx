
import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface CardBaseProps {
  className: string;
  style?: CSSProperties;
  initial?: any;
  animate?: any;
  transition?: any;
  children?: ReactNode;
}

const CardBase = ({
  className,
  style,
  initial,
  animate,
  transition,
  children
}: CardBaseProps) => {
  return (
    <motion.div
      className={`${className} backdrop-blur-lg relative overflow-hidden`}
      style={{
        ...style,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: style?.transform || "translateZ(0)",
        boxShadow: "0 20px 40px -5px rgba(59, 130, 246, 0.3), 0 10px 20px -5px rgba(59, 130, 246, 0.2)"
      }}
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
      }}
    >
      {/* Enhanced blue glass overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-blue-900/20 rounded-xl pointer-events-none" />
      
      {/* Stronger light reflections */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-xl pointer-events-none" />
      
      {/* Bottom edge highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-400/30 pointer-events-none" />
      
      {/* Side edge highlights */}
      <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-blue-400/30 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-blue-400/30 pointer-events-none" />
      
      {/* Diagonal light reflection */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rotate-45 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      {children}
    </motion.div>
  );
};

export default CardBase;
