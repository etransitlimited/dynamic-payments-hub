
import React from "react";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CardSearchHeaderProps {
  title: string;
  subtitle: string;
}

const CardSearchHeader: React.FC<CardSearchHeaderProps> = ({ title, subtitle }) => {
  const { language } = useLanguage();
  
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      data-language={language}
    >
      <div className="flex items-center">
        <div className="mr-3 bg-blue-900/30 p-2 rounded-lg border border-blue-500/20">
          <CreditCard className="h-6 w-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CardSearchHeader;
