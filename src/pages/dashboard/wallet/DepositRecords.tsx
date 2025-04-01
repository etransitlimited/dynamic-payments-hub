
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "../cards/components/PageTitle";
import RecordCard from "./components/RecordCard";
import DepositTable from "./components/DepositTable";
import InformationBox from "./components/InformationBox";
import { motion } from "framer-motion";

const DepositRecords = () => {
  const { t } = useLanguage();
  
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
      <PageTitle title={t("wallet.depositRecords.statistics")} />
      
      <motion.div variants={itemVariants}>
        <RecordCard />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <DepositTable />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <InformationBox 
          title={t("wallet.depositRecords.infoTitle")}
          description={t("wallet.depositRecords.infoDescription")}
        />
      </motion.div>
    </motion.div>
  );
};

export default DepositRecords;
