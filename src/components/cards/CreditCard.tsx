import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";
import OptimizedImage from "@/components/OptimizedImage";
import { CSSProperties } from "react";
import { motion } from "framer-motion";

interface CreditCardProps {
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  className?: string;
}

const CreditCard = ({
  cardNumber = "**** **** **** 3829",
  cardHolder = "JOHN DOE",
  expiryDate = "12/25",
  className = "",
}: CreditCardProps) => {
  const isMobile = useIsMobile();
  const { performanceTier } = usePerformance();
  
  const cardSize = isMobile 
    ? window.innerWidth < 600 
      ? "h-44 w-[280px]" 
      : "h-48 w-[320px]" // Larger size for iPad Mini
    : "h-60 w-96";

  const isLowPerformance = performanceTier === 'low';
  
  return (
    <motion.div
      className={`${cardSize} bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 rounded-xl shadow-xl p-4 sm:p-6 ${className} relative`}
      initial={{ scale: 1 }}
      animate={{ 
        rotateY: isLowPerformance ? [0] : performanceTier === 'medium' ? [0, 3, 0, -3, 0] : [0, 15, 0, -15, 0],
        y: isLowPerformance ? [0] : performanceTier === 'medium' ? [0, -3, 0] : [0, -10, 0],
        scale: isLowPerformance ? [1] : performanceTier === 'medium' ? [1, 1.01, 1] : [1, 1.03, 1]
      }}
      transition={{
        duration: isLowPerformance ? 0 : performanceTier === 'medium' ? (isMobile ? 12 : 10) : (isMobile ? 10 : 8),
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }}
      style={{ 
        transformStyle: "preserve-3d" as const,
        perspective: "800px",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        boxShadow: performanceTier === 'high'
          ? "0 12px 30px -5px rgba(59, 130, 246, 0.55)"
          : "0 10px 20px -5px rgba(59, 130, 246, 0.45)"
      } as CSSProperties}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-col h-full justify-between">
        {/* Top Section - Bank Logo */}
        <div className="flex items-start">
          <div className={`${isMobile && window.innerWidth < 600 ? 'w-14 h-4' : 'w-20 h-5'} relative`}>
            <AspectRatio ratio={3 / 0.8}>
              <OptimizedImage
                src="/lovable-uploads/47003b38-e99e-468a-a1da-52124948df0d.png"
                alt="Visa Card Logo"
                className="object-contain object-left"
                priority={true}
              />
            </AspectRatio>
          </div>
        </div>
        
        {/* Card Information at the bottom */}
        <div className="space-y-2">
          {/* Card Number */}
          <div>
            <div className={`text-xs text-white/80 mb-0.5 font-medium`}>CARD NUMBER</div>
            <div className={`text-white font-mono tracking-widest ${isMobile && window.innerWidth < 600 ? 'text-xs' : 'text-sm'} font-semibold`}>
              {cardNumber}
            </div>
          </div>
          
          {/* Card Holder and Expiry Date */}
          <div className="flex justify-between items-end">
            <div>
              <div className={`text-xs text-white/80 mb-0.5 font-medium`}>CARD HOLDER</div>
              <div className={`text-white font-mono ${isMobile && window.innerWidth < 600 ? 'text-xs' : 'text-sm'} font-semibold`}>{cardHolder}</div>
            </div>
            <div>
              <div className={`text-xs text-white/80 mb-0.5 font-medium`}>EXPIRES</div>
              <div className={`text-white font-mono ${isMobile && window.innerWidth < 600 ? 'text-xs' : 'text-sm'} font-semibold`}>{expiryDate}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chip - Now positioned on the right side, centered vertically */}
      <div 
        className={`${isMobile && window.innerWidth < 600 ? 'w-10 h-6' : 'w-12 h-8'} bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2`} 
      />
    </motion.div>
  );
};

export default CreditCard;
