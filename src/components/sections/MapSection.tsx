
import React, { useMemo, memo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import PlatformLogo from "@/components/map/PlatformLogo";
import { PlatformType } from "@/components/map/PlatformLogo";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";

// Core list of platforms - will be filtered based on performance
const allPlatforms: PlatformType[] = [
  "Amazon", 
  "eBay",
  "Etsy",
  "AliExpress", 
  "TikTok", 
  "Temu", 
  "Walmart",
  "Google Ads", 
  "Facebook Ads", 
  "Stripe", 
  "PayPal", 
  "Google Pay",
  "Apple Pay",
  "Godaddy",
  "WeChat Pay", 
  "Alipay",
  "Shopify", 
  "YouTube",
  "Twitter",
  "Other"
];

// Memoized platform item component
const PlatformItem = memo(({ 
  platform, 
  index, 
  isMobile, 
  performanceTier 
}: { 
  platform: PlatformType, 
  index: number, 
  isMobile: boolean,
  performanceTier: string
}) => {
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
      <span className="text-xs sm:text-xs md:text-sm text-blue-200 font-medium text-center line-clamp-1 px-1">
        {platform}
      </span>
    </motion.div>
  );
});

PlatformItem.displayName = 'PlatformItem';

const MapSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { performanceTier, maxAnimatedElements } = usePerformance();

  // Filter platforms based on performance tier
  const platforms = useMemo(() => {
    const platformCount = {
      high: allPlatforms.length,
      medium: Math.min(allPlatforms.length, 15),
      low: Math.min(allPlatforms.length, 10)
    }[performanceTier];
    
    return allPlatforms.slice(0, platformCount);
  }, [performanceTier]);

  // Determine if we should use animations based on performance tier
  const useAnimation = performanceTier !== 'low';
  
  // Define grid layout based on performance and screen size
  const gridClasses = {
    high: "grid-cols-3 sm:grid-cols-4 md:grid-cols-5",
    medium: "grid-cols-3 sm:grid-cols-4 md:grid-cols-5",
    low: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
  }[performanceTier];

  return (
    <section className="py-8 md:py-16 relative z-10">
      <div className="container mx-auto px-3 md:px-4">
        {useAnimation ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 md:mb-10"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-3 md:mb-4 text-blue-100">
              {t("globalCoverage")}
            </h2>
            <p className="text-sm md:text-base text-blue-300 max-w-2xl mx-auto">
              {t("binDistribution")}
            </p>
          </motion.div>
        ) : (
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-3 md:mb-4 text-blue-100">
              {t("globalCoverage")}
            </h2>
            <p className="text-sm md:text-base text-blue-300 max-w-2xl mx-auto">
              {t("binDistribution")}
            </p>
          </div>
        )}
        
        {useAnimation ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0F2440] border border-blue-500/20 rounded-lg shadow-xl overflow-hidden p-5 sm:p-6 md:p-8"
          >
            <div className={`grid ${gridClasses} gap-3 sm:gap-4 md:gap-5 lg:gap-6`}>
              {platforms.map((platform, index) => (
                <PlatformItem
                  key={platform}
                  platform={platform}
                  index={index}
                  isMobile={isMobile}
                  performanceTier={performanceTier}
                />
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-6 md:mt-8 lg:mt-10 text-xs sm:text-sm text-blue-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <p>{t("supportedMerchants")}</p>
            </motion.div>
          </motion.div>
        ) : (
          <div className="bg-[#0F2440] border border-blue-500/20 rounded-lg shadow-xl overflow-hidden p-5 sm:p-6 md:p-8">
            <div className={`grid ${gridClasses} gap-3 sm:gap-4 md:gap-5 lg:gap-6`}>
              {platforms.map((platform, index) => (
                <PlatformItem
                  key={platform}
                  platform={platform}
                  index={index}
                  isMobile={isMobile}
                  performanceTier={performanceTier}
                />
              ))}
            </div>
            
            <div className="text-center mt-6 md:mt-8 lg:mt-10 text-xs sm:text-sm text-blue-300">
              <p>{t("supportedMerchants")}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(MapSection);
