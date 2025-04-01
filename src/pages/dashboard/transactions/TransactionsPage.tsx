
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import TransactionStatCards from "./components/TransactionStatCards";
import TransactionTable from "./components/TransactionTable";
import TransactionCharts from "./components/TransactionCharts";
import PageHeader from "../components/PageHeader";
import { motion } from "framer-motion";

const TransactionsPage = () => {
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
      className="container mx-auto"
    >
      <PageHeader title={t("transactions.title")} />
      <p className="text-purple-300 mb-6">{t("transactions.subtitle")}</p>

      <motion.div variants={itemVariants}>
        <TransactionStatCards />
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-6">
        <TransactionTable />
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-6">
        <TransactionCharts />
      </motion.div>
    </motion.div>
  );
};

export default TransactionsPage;
