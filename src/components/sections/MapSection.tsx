
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import PlatformLogo from "@/components/map/PlatformLogo";
import { PlatformType } from "@/components/map/PlatformLogo";

const platforms: PlatformType[] = [
  "Amazon", 
  "AliExpress", 
  "TikTok", 
  "Temu", 
  "Lazada", 
  "Google Ads", 
  "Facebook Ads", 
  "Stripe", 
  "PayPal", 
  "Shopify", 
  "WeChat Pay", 
  "Alipay",
  "MercadoLibre",
  "Jumia",
  "M-Pesa",
  "JD.com",
  "Taobao"
];

const MapSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-blue-100">
            全球覆盖范围
          </h2>
          <p className="text-blue-300 max-w-2xl mx-auto">
            我们提供覆盖全球各地区的BIN服务，支持各种主要电商和支付平台
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-[#0F2440] border border-blue-500/20 rounded-lg shadow-xl overflow-hidden p-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 } 
                }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-[#1A2A3F]/80 rounded-xl shadow-lg mb-3">
                  <PlatformLogo 
                    platform={platform} 
                    size={32} 
                    className="transition-all" 
                  />
                </div>
                <span className="text-sm text-blue-200 font-medium">{platform}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-10 text-blue-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <p>我们持续扩展支持的平台，为全球用户提供便捷的支付解决方案</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
