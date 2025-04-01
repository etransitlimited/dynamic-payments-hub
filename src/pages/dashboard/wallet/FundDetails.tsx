
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "../cards/components/PageTitle";
import SearchBox from "./components/SearchBox";
import FundDetailsTable from "./components/FundDetailsTable";
import { motion } from "framer-motion";

const FundDetails = () => {
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
      <PageTitle title={t("wallet.fundDetails.title")} />
      
      <motion.div variants={itemVariants}>
        <SearchBox />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <FundDetailsTable />
      </motion.div>
    </motion.div>
  );
};

export default FundDetails;
