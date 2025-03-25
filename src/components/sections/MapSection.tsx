
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import PlatformLogo from "@/components/map/PlatformLogo";
import { PlatformType } from "@/components/map/PlatformLogo";
import { useIsMobile } from "@/hooks/use-mobile";

const platforms: PlatformType[] = [
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

const MapSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // Calculate dynamic logo size based on screen size
  const getLogoSize = () => {
    return isMobile ? 18 : 28;
  };

  return (
    <section className="py-8 md:py-16 relative z-10">
      <div className="container mx-auto px-3 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5 md:mb-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-display mb-2 md:mb-4 text-blue-100">
            {t("globalCoverage")}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-blue-300 max-w-2xl mx-auto">
            {t("binDistribution")}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-[#0F2440] border border-blue-500/20 rounded-lg shadow-xl overflow-hidden p-3 sm:p-4 md:p-6 lg:p-8"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: isMobile ? index * 0.03 : index * 0.05, // Further reduced delay for mobile
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: isMobile ? 1.03 : 1.05,
                  transition: { duration: 0.2 } 
                }}
                className="flex flex-col items-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-[#1A2A3F]/80 rounded-md sm:rounded-lg md:rounded-xl shadow-lg mb-1 sm:mb-2">
                  <PlatformLogo 
                    platform={platform} 
                    size={getLogoSize()} 
                    className="transition-all" 
                  />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm text-blue-200 font-medium text-center line-clamp-1">
                  {platform}
                </span>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-4 md:mt-6 lg:mt-8 text-blue-300 text-[10px] sm:text-xs md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p>{t("supportedMerchants")}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
