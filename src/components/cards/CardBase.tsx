
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
      {children}
    </motion.div>
  );
};

export default CardBase;
