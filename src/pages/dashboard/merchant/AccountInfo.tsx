
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "../cards/components/PageTitle";
import CompanyInfoSection from "./components/account-info/CompanyInfoSection";
import ContactInfoSection from "./components/account-info/ContactInfoSection";
import { motion } from "framer-motion";

const AccountInfo = () => {
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
      <PageTitle title={t("accountInfo.title")} />
      
      <motion.div variants={itemVariants}>
        <CompanyInfoSection />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ContactInfoSection />
      </motion.div>
    </motion.div>
  );
};

export default AccountInfo;
