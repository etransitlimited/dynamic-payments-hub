
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "../cards/components/PageTitle";
import RecordCard from "./components/RecordCard";
import DepositTable from "./components/DepositTable";
import InformationBox from "./components/InformationBox";
import { motion } from "framer-motion";
import { BarChart3, Calendar, DollarSign } from "lucide-react";

const DepositRecords = () => {
  const { t } = useLanguage();
  
  // Mock deposit records data
  const depositRecords = [
    {
      id: "TXN-1234",
      amount: 1000,
      paymentMethod: "Alipay",
      datetime: "2023-01-01 12:00",
      status: "Completed"
    },
    {
      id: "TXN-5678",
      amount: 2500,
      paymentMethod: "WeChat Pay",
      datetime: "2023-01-02 15:30",
      status: "Pending"
    },
    {
      id: "TXN-9012",
      amount: 500,
      paymentMethod: "Bank Transfer",
      datetime: "2023-01-03 09:45",
      status: "Failed"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container px-4 mx-auto py-6 space-y-6"
    >
      <div className="w-full">
        <PageTitle title={t("wallet.depositRecords.statistics")} />
      </div>
      
      <motion.div 
        variants={itemVariants}
        className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 p-6">
          <RecordCard 
            title={t("wallet.depositRecords.summary")} 
            icon={<BarChart3 size={18} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-900/30 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-4 w-4 text-indigo-300 mr-2" />
                  <span className="text-indigo-300 text-sm">{t("wallet.depositRecords.totalDeposits")}</span>
                </div>
                <p className="text-2xl font-semibold text-white">$4,000</p>
              </div>
              <div className="bg-indigo-900/30 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 text-indigo-300 mr-2" />
                  <span className="text-indigo-300 text-sm">{t("wallet.depositRecords.lastDeposit")}</span>
                </div>
                <p className="text-2xl font-semibold text-white">$1,000</p>
              </div>
              <div className="bg-indigo-900/30 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <BarChart3 className="h-4 w-4 text-indigo-300 mr-2" />
                  <span className="text-indigo-300 text-sm">{t("wallet.depositRecords.averageDeposit")}</span>
                </div>
                <p className="text-2xl font-semibold text-white">$1,333</p>
              </div>
            </div>
          </RecordCard>
        </div>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        
        <div className="relative z-10 p-6">
          <DepositTable depositRecords={depositRecords} />
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <InformationBox />
      </motion.div>
    </motion.div>
  );
};

export default DepositRecords;
