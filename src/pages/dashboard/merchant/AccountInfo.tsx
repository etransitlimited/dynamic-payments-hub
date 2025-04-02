
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageTitle from "../cards/components/PageTitle";
import CompanyInfoSection from "./components/account-info/CompanyInfoSection";
import ContactInfoSection from "./components/account-info/ContactInfoSection";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Shield, Key, FileText, RefreshCw, Zap, Lock } from "lucide-react";
import { toast } from "sonner";

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
    toast.success(
      <div className="flex items-center gap-2">
        <BadgeCheck className="h-4 w-4 text-green-400" />
        <TranslatedText keyName="common.saved" fallback="Changes saved successfully" />
      </div>
    );
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
    toast.success(
      <div className="flex items-center gap-2">
        <BadgeCheck className="h-4 w-4 text-green-400" />
        <TranslatedText keyName="common.allChangesSaved" fallback="All changes saved successfully" />
      </div>
    );
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

  const handleRegenerateApiKey = () => {
    toast.success(
      <div className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4 text-blue-400" />
        <TranslatedText keyName="accountInfo.apiKeyRegenerated" fallback="API key regenerated successfully" />
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal-dark/90"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-tl from-purple-900/20 via-purple-800/10 to-transparent blur-3xl"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container px-4 mx-auto py-6 space-y-8 relative z-10"
      >
        <div className="w-full">
          <PageTitle title={<TranslatedText keyName="accountInfo.title" fallback="Account Information" />} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7"
          >
            <div className="w-full bg-gradient-to-br from-charcoal-light/60 to-charcoal-dark/80 rounded-xl border border-purple-900/30 overflow-hidden relative group transition-all duration-300 hover:shadow-[0_0_25px_rgba(142,45,226,0.2)]">
              <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/20 via-purple-700/10 to-transparent rounded-xl blur-xl group-hover:opacity-75 transition-opacity duration-700 opacity-50"></div>
              <div className="absolute top-0 right-0 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
              
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
          
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-8">
            <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/60 to-charcoal-dark/80 hover:shadow-[0_0_20px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative group">
              <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/20 via-purple-700/10 to-transparent rounded-xl blur-xl group-hover:opacity-75 transition-opacity duration-700 opacity-50"></div>
              
              <CardHeader className="relative z-10 pb-3">
                <CardTitle className="text-white flex items-center text-xl">
                  <Shield className="mr-2 h-5 w-5 text-neon-purple" />
                  <TranslatedText keyName="accountInfo.apiAccess" fallback="API Access" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 pt-2">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-purple-200/80 text-sm"><TranslatedText keyName="accountInfo.enabled" fallback="Enabled" /></span>
                  <span className="text-neon-green font-medium flex items-center">
                    <BadgeCheck className="h-4 w-4 mr-1" />
                    <TranslatedText keyName="common.yes" fallback="Yes" />
                  </span>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-900/30 to-charcoal-dark/80 rounded-lg border border-purple-800/30 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-purple-200/80 text-sm mb-2">
                    <div className="flex items-center">
                      <Key className="h-4 w-4 mr-2 text-purple-400" />
                      <span><TranslatedText keyName="common.apiKey" fallback="API Key" /></span>
                    </div>
                    <button 
                      onClick={handleRegenerateApiKey}
                      className="flex items-center text-xs text-purple-400 hover:text-neon-green transition-colors"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      <TranslatedText keyName="common.regenerate" fallback="Regenerate" />
                    </button>
                  </div>
                  <div className="font-mono text-xs text-gray-300 bg-charcoal-dark/80 rounded px-3 py-2 overflow-x-auto flex items-center justify-between group border border-purple-900/30">
                    <span className="truncate mr-2">sk_live_51NkJE3DJ2UvMM58tyxU6m...</span>
                    <button className="text-purple-400 hover:text-neon-green transition-colors opacity-0 group-hover:opacity-100">
                      <Lock className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="mt-3 text-xs text-purple-200/60 flex items-center">
                    <Zap className="h-3 w-3 mr-1 text-neon-green" />
                    <TranslatedText keyName="accountInfo.apiSecureNote" fallback="Keys are encrypted and securely stored" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/60 to-charcoal-dark/80 hover:shadow-[0_0_20px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative group">
              <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/20 via-purple-700/10 to-transparent rounded-xl blur-xl group-hover:opacity-75 transition-opacity duration-700 opacity-50"></div>
              
              <CardHeader className="relative z-10 pb-3">
                <CardTitle className="text-white flex items-center text-xl">
                  <FileText className="mr-2 h-5 w-5 text-neon-purple" />
                  <TranslatedText keyName="accountInfo.paymentNotes" fallback="Payment Notes" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 pt-2">
                <ul className="space-y-3 text-sm text-purple-200/80">
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2 text-lg leading-none">•</span>
                    <TranslatedText keyName="accountInfo.paymentNote1" fallback="Payments are processed within 24 hours" />
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2 text-lg leading-none">•</span>
                    <TranslatedText keyName="accountInfo.paymentNote2" fallback="Transaction fees are calculated automatically" />
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2 text-lg leading-none">•</span>
                    <TranslatedText keyName="accountInfo.paymentNote3" fallback="Minimum withdrawal amount is $100" />
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-green mr-2 text-lg leading-none">•</span>
                    <TranslatedText keyName="accountInfo.paymentNote4" fallback="Contact support for payment issues" />
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="col-span-1 lg:col-span-12"
          >
            <div className="w-full bg-gradient-to-br from-charcoal-light/60 to-charcoal-dark/80 rounded-xl border border-purple-900/30 overflow-hidden relative group transition-all duration-300 hover:shadow-[0_0_25px_rgba(142,45,226,0.2)]">
              <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/20 via-purple-700/10 to-transparent rounded-xl blur-xl group-hover:opacity-75 transition-opacity duration-700 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
              
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
    </div>
  );
};

export default AccountInfo;
