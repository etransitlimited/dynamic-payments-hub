
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import CompanyInfoSection from "./components/account-info/CompanyInfoSection";
import ContactInfoSection from "./components/account-info/ContactInfoSection";
import { Shield, CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GradientOverlay from "@/components/particles/GradientOverlay";
import ParticlesLayer from "@/components/particles/ParticlesLayer";

const AccountInfo = () => {
  const { t } = useLanguage();
  const [editing, setEditing] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState("verified"); // verified, pending, required
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(85), 300);
    return () => clearTimeout(timer);
  }, []);
  
  const handleEdit = (field: string) => {
    setEditing(prev => ({ ...prev, [field]: true }));
  };

  const handleSave = (field: string) => {
    setEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleCancel = (field: string) => {
    setEditing(prev => ({ ...prev, [field]: false }));
  };
  
  const handleSaveAll = () => {
    setEditing({});
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
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <GradientOverlay />
        <ParticlesLayer />
        
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl"></div>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto p-6 relative z-10"
      >
        <motion.div variants={itemVariants}>
          <PageHeader title={<TranslatedText keyName="accountInfo.title" fallback="Account Information" />} />
        </motion.div>
        
        {/* Account status card */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="relative overflow-hidden bg-gradient-to-r from-purple-900/50 to-purple-950/50 border-purple-800/30 shadow-lg p-4">
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-800/50 rounded-full mr-3">
                  <Shield size={20} className="text-purple-200" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    <TranslatedText keyName="accountInfo.accountStatus" fallback="Account Status" />
                  </h3>
                  <div className="flex items-center mt-1">
                    {verificationStatus === "verified" && (
                      <>
                        <CheckCircle2 size={16} className="text-green-400 mr-1.5" />
                        <span className="text-green-400 text-sm">
                          <TranslatedText keyName="accountInfo.verified" fallback="Verified" />
                        </span>
                      </>
                    )}
                    {verificationStatus === "pending" && (
                      <>
                        <Clock size={16} className="text-yellow-400 mr-1.5" />
                        <span className="text-yellow-400 text-sm">
                          <TranslatedText keyName="accountInfo.pending" fallback="Verification Pending" />
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 max-w-xs w-full">
                <div className="flex justify-between text-xs text-purple-200/70">
                  <span><TranslatedText keyName="accountInfo.verificationProgress" fallback="Verification Progress" /></span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-purple-950/60" />
              </div>
              
              <Button 
                variant="outline" 
                className="bg-purple-800/30 border-purple-500/40 text-purple-200 hover:bg-purple-700/40 hover:text-purple-100 transition-all"
              >
                <TranslatedText keyName="accountInfo.requestVerification" fallback="Request Verification" />
              </Button>
            </div>
          </Card>
        </motion.div>
        
        {/* Main content */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6">
          <CompanyInfoSection 
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
          
          <ContactInfoSection 
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleSaveAll={handleSaveAll}
          />
          
          {/* Privacy Notice */}
          <motion.div variants={itemVariants} className="rounded-xl bg-blue-900/10 border border-blue-800/30 p-4 text-blue-300/80 text-sm">
            <div className="flex items-start">
              <Shield size={16} className="text-blue-400 mr-2 mt-0.5 shrink-0" />
              <p><TranslatedText keyName="accountInfo.privacyNotice" fallback="Your information is encrypted and secured with enterprise-grade security. We comply with all data protection regulations." /></p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AccountInfo;
