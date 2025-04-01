
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, MapPin, Phone, Mail, CreditCard, Wallet, Key } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import TabsComponent from "@/components/common/TabsComponent";
import CompanyInfoSection from "./components/account-info/CompanyInfoSection";
import ContactInfoSection from "./components/account-info/ContactInfoSection";
import { motion } from "framer-motion";

const AccountInfo = () => {
  const { t } = useLanguage();
  const [editing, setEditing] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("company");
  
  // 编辑处理函数
  const handleEdit = (field: string) => {
    setEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleSave = (field: string) => {
    setEditing(prev => ({ ...prev, [field]: false }));
    // 这里可以添加保存逻辑
  };

  const handleCancel = (field: string) => {
    setEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleSaveAll = () => {
    setEditing({});
    // 这里可以添加保存所有更改的逻辑
  };
  
  const handleTabChange = (value: string) => {
    console.log(`AccountInfo tab changing to: ${value}`);
    setActiveTab(value);
  };
  
  // Log when component mounts
  useEffect(() => {
    console.log("AccountInfo mounted with active tab:", activeTab);
  }, []);
  
  // Debug render
  useEffect(() => {
    console.log("AccountInfo rendering with activeTab:", activeTab);
  });
  
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
  
  const paymentContent = (
    <Card className="bg-gradient-to-br from-amber-900 to-amber-950 border-amber-900/50 shadow-lg shadow-amber-900/10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-amber-500/20 p-2 rounded-full mr-2">
            <CreditCard size={18} className="text-amber-400" />
          </span>
          {t("accountInfo.paymentSettings")}
        </CardTitle>
        <CardDescription className="text-amber-200/80">
          {t("accountInfo.paymentSettingsDesc")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#061428]/70 border-amber-900/30 shadow-inner rounded-lg p-4 hover:shadow-md hover:shadow-amber-900/20 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 py-3 px-4 rounded-md bg-amber-900/20 border border-amber-800/30">
                <CreditCard className="h-5 w-5 text-amber-400" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">{t("accountInfo.defaultCardMethod")}</p>
                  <p className="text-sm text-amber-200/80">Visa **** 4289</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 py-3 px-4 rounded-md bg-amber-900/20 border border-amber-800/30">
                <Wallet className="h-5 w-5 text-amber-400" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">{t("accountInfo.depositAccount")}</p>
                  <p className="text-sm text-amber-200/80">ID: 7836-2910-8374-9210</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 py-3 px-4 rounded-md bg-amber-900/20 border border-amber-800/30">
                <Key className="h-5 w-5 text-amber-400" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">{t("accountInfo.apiAccess")}</p>
                  <p className="text-sm text-amber-200/80">{t("accountInfo.enabled")}</p>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="relative">
            <Card className="h-full bg-[#061428]/70 border-amber-900/30 shadow-inner rounded-lg p-4 hover:shadow-md hover:shadow-amber-900/20 transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl"></div>
              <div className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">{t("accountInfo.paymentNotes")}</h3>
                  <ul className="space-y-2 text-amber-200/80 list-disc pl-5">
                    <li>{t("accountInfo.paymentNote1")}</li>
                    <li>{t("accountInfo.paymentNote2")}</li>
                    <li>{t("accountInfo.paymentNote3")}</li>
                    <li>{t("accountInfo.paymentNote4")}</li>
                  </ul>
                </div>
                
                <Button 
                  className="mt-4 w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 border-none text-white shadow-md shadow-amber-600/20"
                >
                  {t("accountInfo.updatePaymentSettings")}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  const tabs = [
    {
      value: "company",
      label: t("accountInfo.companyInformation"),
      className: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 text-white",
      content: (
        <CompanyInfoSection 
          editing={editing}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleSaveAll={handleSaveAll}
        />
      )
    },
    {
      value: "contact",
      label: t("accountInfo.contactDetails"),
      className: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 text-white",
      content: (
        <ContactInfoSection 
          editing={editing}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleSaveAll={handleSaveAll}
        />
      )
    },
    {
      value: "payment",
      label: t("accountInfo.paymentSettings"),
      className: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-500 text-white",
      content: paymentContent
    },
  ];
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-6 space-y-6"
    >
      <PageHeader title={t("accountInfo.title")} />
      
      <motion.div variants={itemVariants} className="relative z-10">
        <TabsComponent 
          defaultValue="company"
          tabs={tabs}
          listClassName="w-full grid grid-cols-3 mb-6 bg-blue-950/70 border border-blue-800/30"
          onChange={handleTabChange}
          value={activeTab}
        />
      </motion.div>
    </motion.div>
  );
};

export default AccountInfo;
