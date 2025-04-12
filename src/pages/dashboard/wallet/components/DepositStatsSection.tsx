
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import RecordCard from "./RecordCard";
import { motion } from "framer-motion";
import { BarChart3, Calendar, DollarSign } from "lucide-react";

interface DepositStatsSectionProps {
  statistics: {
    totalDeposits: number;
    lastDeposit: number;
    averageDeposit: number;
  };
}

const DepositStatsSection: React.FC<DepositStatsSectionProps> = ({ statistics }) => {
  const { t } = useSafeTranslation();
  
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
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="relative z-10 p-6">
        <RecordCard 
          title={t("wallet.depositRecords.viewHistory")} 
          icon={<BarChart3 size={18} />}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-900/30 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <DollarSign className="h-4 w-4 text-indigo-300 mr-2" />
                <span className="text-indigo-300 text-sm">{t("wallet.deposit.totalDeposits")}</span>
              </div>
              <p className="text-2xl font-semibold text-white">${statistics.totalDeposits}</p>
            </div>
            <div className="bg-indigo-900/30 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 text-indigo-300 mr-2" />
                <span className="text-indigo-300 text-sm">{t("wallet.deposit.lastDeposit")}</span>
              </div>
              <p className="text-2xl font-semibold text-white">${statistics.lastDeposit}</p>
            </div>
            <div className="bg-indigo-900/30 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <BarChart3 className="h-4 w-4 text-indigo-300 mr-2" />
                <span className="text-indigo-300 text-sm">{t("wallet.depositRecords.averageDeposit")}</span>
              </div>
              <p className="text-2xl font-semibold text-white">${statistics.averageDeposit}</p>
            </div>
          </div>
        </RecordCard>
      </div>
    </motion.div>
  );
};

export default DepositStatsSection;
