
import React from "react";
import { motion } from "framer-motion";
import DepositTable from "./DepositTable";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface DepositTableSectionProps {
  depositRecords: Array<{
    id: string;
    amount: number;
    paymentMethod: string;
    datetime: string;
    status: string;
  }>;
}

const DepositTableSection: React.FC<DepositTableSectionProps> = ({ depositRecords }) => {
  // 添加对 useSafeTranslation 的使用，以支持语言切换功能
  const { t, language } = useSafeTranslation();
  
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 15 }
        }
      }}
      className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative"
      data-language={language}
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      <div className="relative z-10 p-6">
        <DepositTable depositRecords={depositRecords} />
      </div>
    </motion.div>
  );
};

export default DepositTableSection;
