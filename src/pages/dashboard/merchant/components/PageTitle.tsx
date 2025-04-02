
import React from "react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        <TranslatedText keyName={title} />
      </h1>
      {subtitle && (
        <p className="mt-2 text-purple-200 text-sm md:text-base">
          <TranslatedText keyName={subtitle} />
        </p>
      )}
    </motion.div>
  );
};

export default PageTitle;
