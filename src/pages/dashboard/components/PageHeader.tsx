
import React from "react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";

interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
        {typeof title === 'string' ? <TranslatedText keyName={title} fallback={title} /> : title}
      </h1>
      {description && (
        <p className="mt-2 text-blue-300 max-w-2xl">
          {typeof description === 'string' ? <TranslatedText keyName={description} fallback={description} /> : description}
        </p>
      )}
    </motion.div>
  );
};

export default PageHeader;
