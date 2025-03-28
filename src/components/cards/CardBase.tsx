
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
      className={`${className} backdrop-blur-lg relative`}
      style={{
        ...style,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: style?.transform || "translateZ(0)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 100, 0.1), 0 10px 10px -5px rgba(0, 0, 100, 0.04)"
      }}
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
      }}
    >
      {/* Blue glass overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-blue-900/10 rounded-xl pointer-events-none" />
      
      {/* Light reflections */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl pointer-events-none" />
      
      {children}
    </motion.div>
  );
};

export default CardBase;
