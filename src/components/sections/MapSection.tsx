
import React, { memo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformance } from "@/hooks/use-performance";
import { usePlatformFilter } from "@/hooks/use-platform-filter";
import PlatformItem from "@/components/map/PlatformItem";

const MapSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { performanceTier } = usePerformance();
  const { platforms, gridClasses } = usePlatformFilter({ performanceTier });

  // Determine if we should use animations based on performance tier
  const useAnimation = performanceTier !== 'low';
  
  return (
    <section className="py-6 sm:py-12 md:py-16 relative z-10">
      <div className="container mx-auto px-3 md:px-4">
        {useAnimation ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-4 sm:mb-6 md:mb-10"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-2 sm:mb-3 md:mb-4 text-blue-100">
              {t("globalCoverage")}
            </h2>
            <p className="text-sm md:text-base text-blue-300 max-w-2xl mx-auto">
              {t("binDistribution")}
            </p>
          </motion.div>
        ) : (
          <div className="text-center mb-4 sm:mb-6 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-2 sm:mb-3 md:mb-4 text-blue-100">
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
            className="bg-[#0F2440] border border-blue-500/20 rounded-lg shadow-xl overflow-hidden p-4 sm:p-5 md:p-8"
          >
            <div className={`grid ${gridClasses} gap-2 sm:gap-3 md:gap-5 lg:gap-6`}>
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
              className="text-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 text-xs sm:text-sm text-blue-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <p>{t("supportedMerchants")}</p>
            </motion.div>
          </motion.div>
        ) : (
          <div className="bg-[#0F2440] border border-blue-500/20 rounded-lg shadow-xl overflow-hidden p-4 sm:p-5 md:p-8">
            <div className={`grid ${gridClasses} gap-2 sm:gap-3 md:gap-5 lg:gap-6`}>
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
            
            <div className="text-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 text-xs sm:text-sm text-blue-300">
              <p>{t("supportedMerchants")}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(MapSection);
