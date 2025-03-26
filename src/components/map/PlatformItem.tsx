
import React, { memo } from "react";
import { motion } from "framer-motion";
import PlatformLogo, { PlatformType } from "./PlatformLogo";

interface PlatformItemProps {
  platform: PlatformType;
  index: number;
  isMobile: boolean;
  performanceTier: string;
}

const PlatformItem = memo(({ 
  platform, 
  index, 
  isMobile, 
  performanceTier 
}: PlatformItemProps) => {
  // Calculate dynamic logo size based on screen size
  const logoSize = isMobile ? 30 : 28;
  
  // Determine animation complexity based on performance
  const getMotionProps = () => {
    if (performanceTier === 'low') {
      return {
        initial: undefined,
        animate: undefined,
        whileHover: undefined,
        transition: undefined
      };
    }
    
    return {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      whileHover: { 
        scale: isMobile ? 1.03 : 1.05,
        transition: { duration: 0.2 } 
      },
      transition: { 
        duration: 0.3, 
        delay: isMobile ? index * 0.01 : index * 0.03, // Further reduced delay
        type: "spring",
        stiffness: 100
      }
    };
  };

  const motionProps = getMotionProps();

  return (
    <motion.div
      {...motionProps}
      className="flex flex-col items-center"
    >
      <div className="w-16 h-16 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 flex items-center justify-center bg-[#1A2A3F]/80 rounded-lg shadow-lg mb-2">
        <PlatformLogo 
          platform={platform} 
          size={logoSize} 
          className="transition-all" 
        />
      </div>
      <span className="text-xs sm:text-xs md:text-sm text-blue-100 font-medium text-center line-clamp-1 px-1 tracking-tight font-display">
        {platform}
      </span>
    </motion.div>
  );
});

PlatformItem.displayName = 'PlatformItem';

export default PlatformItem;
