
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

const ViewAllLink: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div variants={itemVariants} className="flex items-center justify-center">
      <a href="#" className="inline-flex items-center text-blue-300 hover:text-blue-200 text-sm group">
        <TranslatedText keyName="wallet.fundDetails.viewAllRecords" fallback="View All Transaction Records" />
        <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
};

export default ViewAllLink;
