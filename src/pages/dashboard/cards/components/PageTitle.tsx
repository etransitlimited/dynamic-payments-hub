
import React from "react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";

interface PageTitleProps {
  title?: string;
  subtitle?: string;
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
        {children || (title ? <TranslatedText keyName={title} fallback={title} /> : '')}
      </h1>
      {subtitle && (
        <p className="text-gray-400 mt-1">
          <TranslatedText keyName={subtitle} fallback={subtitle} />
        </p>
      )}
    </motion.div>
  );
};

export default PageTitle;
