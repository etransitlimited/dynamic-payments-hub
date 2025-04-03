
import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import TranslatedText from "@/components/translation/TranslatedText";

const ExportButton: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div variants={itemVariants} className="flex justify-end">
      <Button 
        variant="outline" 
        className="bg-purple-900/30 border-purple-500/30 text-purple-200 hover:bg-purple-800/40 transition-all duration-300"
      >
        <Download size={16} className="mr-2" />
        <TranslatedText keyName="wallet.fundDetails.exportReport" fallback="Export Report" />
      </Button>
    </motion.div>
  );
};

export default ExportButton;
