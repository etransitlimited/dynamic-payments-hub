
import React from "react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";

interface PageTitleProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  children?: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, children }) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        {children || (title ? (typeof title === 'string' ? <TranslatedText keyName={title} fallback={title} /> : title) : '')}
      </h1>
      {subtitle && (
        <p className="text-gray-400 mt-1">
          {typeof subtitle === 'string' ? <TranslatedText keyName={subtitle} fallback={subtitle} /> : subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default PageTitle;
