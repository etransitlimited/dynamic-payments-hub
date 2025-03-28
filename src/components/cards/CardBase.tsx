
import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface CardBaseProps {
  className: string;
  style?: CSSProperties;
  initial?: any;
  animate?: any;
  transition?: any;
  children?: ReactNode;
  withGrid?: boolean;
}

const CardBase = ({
  className,
  style,
  initial,
  animate,
  transition,
  children,
  withGrid = false
}: CardBaseProps) => {
  return (
    <motion.div
      className={`${className} backdrop-blur-sm`}
      style={{
        ...style,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden"
      }}
      initial={initial}
      animate={animate}
      transition={transition}
      whileHover={{ scale: 1.02 }}
    >
      {withGrid && (
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default CardBase;
