
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import WorldMap from "@/components/WorldMap";
import { motion } from "framer-motion";

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
          className="bg-[#0F2440] border border-blue-500/20 rounded-lg shadow-xl overflow-hidden"
        >
          <div className="aspect-[2/1] w-full">
            <WorldMap />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
