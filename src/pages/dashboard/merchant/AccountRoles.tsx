
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "@/context/LanguageContext";
import TabsComponent from "@/components/common/TabsComponent";
import { getAccountRolesTabs } from "./utils/accountRolesTabs";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import { motion } from "framer-motion";

const AccountRoles = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("roles");

  const handleTabChange = (value: string) => {
    console.log(`AccountRoles tab changing to: ${value}`);
    setActiveTab(value);
  };

  const tabs = getAccountRolesTabs(t);
  
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
      className="container mx-auto px-4 py-6 space-y-6"
    >
      <PageHeader title={t("accountRoles.title")} />
      
      <motion.div variants={itemVariants}>
        <ComponentErrorBoundary component="Account Roles Card">
          <Card 
            className="border-purple-900/50 
            bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] 
            overflow-hidden shadow-lg"
          >
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <CardHeader className="relative z-10 pb-4 space-y-2">
              <CardTitle className="text-white text-xl flex items-center justify-between">
                <span>{t("accountRoles.roleManagement")}</span>
                <div className="text-sm text-purple-200/70 font-normal">
                  {t("accountRoles.roleManagementDesc")}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 p-0">
              <TabsComponent 
                tabs={tabs}
                defaultValue="roles"
                listClassName="w-full grid grid-cols-3 bg-purple-950/70 border-b border-purple-800/30"
                onChange={handleTabChange}
                value={activeTab}
              />
            </CardContent>
          </Card>
        </ComponentErrorBoundary>
      </motion.div>
    </motion.div>
  );
};

export default AccountRoles;
