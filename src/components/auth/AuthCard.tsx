import React, { ReactNode, CSSProperties } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

const AuthCard = ({ title, description, children, footer }: AuthCardProps) => {
  const isMobile = useIsMobile();
  const { performanceTier } = usePerformance();

  // Card animation settings
  const getCardAnimation = () => {
    if (performanceTier === 'low') {
      return { y: [0] };
    }
    
    if (performanceTier === 'medium' || isMobile) {
      return { 
        y: [0, -5, 0, 5, 0], 
        scale: [1, 1.01, 1] 
      };
    }
    
    return { 
      y: [0, -10, 0, 10, 0], 
      scale: [1, 1.02, 1] 
    };
  };
  
  const animationDuration = {
    high: isMobile ? 10 : 8,
    medium: isMobile ? 12 : 10,
    low: 0
  }[performanceTier];

  return (
    <motion.div
      className="relative"
      animate={getCardAnimation()}
      transition={{ 
        duration: animationDuration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }}
      style={{ 
        transformStyle: "preserve-3d" as CSSProperties["transformStyle"],
        perspective: "800px",
      }}
    >
      {/* Background glow effect */}
      {performanceTier !== 'low' && (
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-3xl -z-10 transform scale-105"></div>
      )}
      
      {/* Yellow accent */}
      <div className={`absolute ${isMobile ? 'w-10 h-6' : 'w-12 h-8'} bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md right-4 top-16 z-20`} />
      
      <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 border-blue-900/30 text-blue-50 shadow-xl relative overflow-hidden backdrop-blur-sm">
        <div className="absolute right-0 bottom-0 w-full h-full bg-gradient-to-tl from-blue-400/10 to-transparent"></div>
        
        <CardHeader className="space-y-1 relative z-10">
          <CardTitle className="text-2xl font-display font-semibold tracking-tight">
            {title}
          </CardTitle>
          <CardDescription className="text-blue-200">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter className="flex flex-col justify-center border-t border-blue-700/30 pt-4">
          {footer}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AuthCard;
