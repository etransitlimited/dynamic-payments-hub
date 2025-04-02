
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "../cards/components/PageTitle";
import CompanyInfoSection from "./components/account-info/CompanyInfoSection";
import ContactInfoSection from "./components/account-info/ContactInfoSection";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Shield, Key, FileText } from "lucide-react";

const AccountInfo = () => {
  const { t } = useLanguage();
  const [editing, setEditing] = useState<Record<string, boolean>>({
    companyName: false,
    address: false,
    phone: false,
    email: false
  });
  
  const handleEdit = (field: string) => {
    setEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleSave = (field: string) => {
    setEditing(prev => ({ ...prev, [field]: false }));
    // Additional logic to save changes would go here
  };

  const handleCancel = (field: string) => {
    setEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleSaveAll = () => {
    setEditing({
      companyName: false,
      address: false,
      phone: false,
      email: false
    });
    // Additional logic to save all changes would go here
  };
  
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
        <PageTitle title={<TranslatedText keyName="accountInfo.title" />} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          variants={itemVariants}
          className="col-span-2"
        >
          <div className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="relative z-10 p-6">
              <CompanyInfoSection 
                editing={editing}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleCancel={handleCancel}
                handleSaveAll={handleSaveAll}
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-1 grid grid-cols-1 gap-4">
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative group">
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-0 group-hover:opacity-75"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="text-white flex items-center">
                <Shield className="mr-2 h-5 w-5 text-neon-purple" />
                <TranslatedText keyName="accountInfo.apiAccess" />
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm"><TranslatedText keyName="accountInfo.enabled" /></span>
                <span className="text-neon-green font-medium flex items-center">
                  <BadgeCheck className="h-4 w-4 mr-1" />
                  <TranslatedText keyName="common.yes" fallback="Yes" />
                </span>
              </div>
              <div className="mt-4 p-3 bg-purple-900/20 rounded-lg border border-purple-900/30">
                <div className="flex items-center text-gray-300 text-sm mb-1">
                  <Key className="h-4 w-4 mr-2 text-purple-400" />
                  <span><TranslatedText keyName="common.apiKey" fallback="API Key" /></span>
                </div>
                <div className="font-mono text-xs text-gray-300 bg-charcoal rounded px-3 py-2 overflow-x-auto">
                  sk_live_51NkJE3DJ2UvMM58tyxU6m...
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative group">
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-0 group-hover:opacity-75"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="text-white flex items-center">
                <FileText className="mr-2 h-5 w-5 text-neon-purple" />
                <TranslatedText keyName="accountInfo.paymentNotes" />
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-neon-green mr-2">•</span>
                  <TranslatedText keyName="accountInfo.paymentNote1" />
                </li>
                <li className="flex items-start">
                  <span className="text-neon-green mr-2">•</span>
                  <TranslatedText keyName="accountInfo.paymentNote2" />
                </li>
                <li className="flex items-start">
                  <span className="text-neon-green mr-2">•</span>
                  <TranslatedText keyName="accountInfo.paymentNote3" />
                </li>
                <li className="flex items-start">
                  <span className="text-neon-green mr-2">•</span>
                  <TranslatedText keyName="accountInfo.paymentNote4" />
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="col-span-1 lg:col-span-3"
        >
          <div className="w-full bg-gradient-to-br from-purple-900/40 to-charcoal-dark rounded-xl border border-purple-900/30 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
            
            <div className="relative z-10 p-6">
              <ContactInfoSection 
                editing={editing}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleCancel={handleCancel}
                handleSaveAll={handleSaveAll}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AccountInfo;
