
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

  // Calculate dynamic grid columns based on screen size
  const getLogoSize = () => {
    return isMobile ? 24 : 32;
  };

  return (
    <section className="py-10 md:py-16 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-3 md:mb-4 text-blue-100">
            {t("globalCoverage")}
          </h2>
          <p className="text-sm sm:text-base text-blue-300 max-w-2xl mx-auto">
            {t("binDistribution")}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-[#0F2440] border border-blue-500/20 rounded-lg shadow-xl overflow-hidden p-4 sm:p-6 md:p-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05, // Reduced delay for faster loading on mobile
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 } 
                }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-[#1A2A3F]/80 rounded-lg md:rounded-xl shadow-lg mb-2 md:mb-3">
                  <PlatformLogo 
                    platform={platform} 
                    size={getLogoSize()} 
                    className="transition-all" 
                  />
                </div>
                <span className="text-xs sm:text-sm text-blue-200 font-medium text-center">{platform}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-6 md:mt-10 text-blue-300 text-xs sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p>{t("supportedMerchants")}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
