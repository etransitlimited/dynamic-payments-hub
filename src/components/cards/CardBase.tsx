
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardBaseProps {
  className: string;
  style?: React.CSSProperties;
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
      className={className}
      style={style}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default CardBase;
