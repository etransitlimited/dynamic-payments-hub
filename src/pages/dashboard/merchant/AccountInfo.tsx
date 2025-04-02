
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
  const { t, language } = useLanguage();
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
        {/* 深炭色背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-dark"></div>
        
        {/* 网格纹理 */}
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        
        {/* 细微噪点纹理 */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        
        {/* 活力紫色渐变光晕 */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-600/8 rounded-full blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-purple-800/8 rounded-full blur-3xl animate-pulse-subtle opacity-70"></div>
        <div className="absolute top-3/4 right-1/4 -translate-y-1/2 w-[20rem] h-[20rem] bg-blue-900/8 rounded-full blur-3xl animate-pulse-subtle opacity-50"></div>
        
        {/* 亮绿色高光 */}
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-neon-green/8 rounded-full blur-3xl"></div>
        
        <GradientOverlay />
        <ParticlesLayer />
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
        
        {/* 账户状态卡片 - 使用更明显的紫色渐变和亮绿色高亮 */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="relative overflow-hidden bg-gradient-to-r from-purple-900/60 to-purple-950/60 border-purple-800/40 shadow-xl shadow-purple-900/15 p-4 hover:shadow-[0_0_30px_rgba(142,45,226,0.25)] transition-all duration-500">
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-800/60 backdrop-blur-sm rounded-full mr-3 shadow-inner shadow-purple-900/30 border border-purple-500/30">
                  <Shield size={20} className="text-purple-200" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    <TranslatedText keyName="accountInfo.accountStatus" fallback="Account Status" />
                  </h3>
                  <div className="flex items-center mt-1">
                    {verificationStatus === "verified" && (
                      <>
                        <CheckCircle2 size={16} className="text-neon-green mr-1.5" />
                        <span className="text-neon-green text-sm">
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
                <div className="flex justify-between text-xs text-purple-200/80">
                  <span><TranslatedText keyName="accountInfo.verificationProgress" fallback="Verification Progress" /></span>
                  <span>{progress}%</span>
                </div>
                <div className="relative h-2.5 w-full bg-purple-950/70 rounded-full overflow-hidden border border-purple-800/30">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-neon-green/80 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                  {/* 发光效果动画 */}
                  <div 
                    className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-45 animate-shine"
                    style={{ animation: 'shine 2s infinite' }}
                  ></div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="bg-purple-800/40 border-purple-500/50 text-purple-100 hover:bg-purple-700/50 hover:text-white hover:border-purple-400/70 transition-all shadow-md shadow-purple-900/30"
              >
                <TranslatedText keyName="accountInfo.requestVerification" fallback="Request Verification" />
              </Button>
            </div>
          </Card>
        </motion.div>
        
        {/* 内容部分 */}
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
          
          {/* 隐私提示 - 使用冷色调蓝色设计 */}
          <motion.div variants={itemVariants} className="rounded-xl bg-blue-900/15 border border-blue-800/40 p-4 text-blue-300/90 text-sm backdrop-blur-sm shadow-lg shadow-blue-900/10">
            <div className="flex items-start">
              <Shield size={16} className="text-blue-400 mr-2 mt-0.5 shrink-0" />
              <p><TranslatedText keyName="accountInfo.privacyNotice" fallback="Your information is encrypted and secured with enterprise-grade security. We comply with all data protection regulations." /></p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <style>
        {`
          @keyframes shine {
            from {
              left: -120px;
            }
            to {
              left: 100%;
            }
          }
          
          @keyframes pulse-subtle {
            0% {
              opacity: 0.5;
            }
            50% {
              opacity: 0.7;
            }
            100% {
              opacity: 0.5;
            }
          }
          
          .animate-pulse-subtle {
            animation: pulse-subtle 4s ease-in-out infinite;
          }
          
          .animate-shine {
            animation: shine 2s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default AccountInfo;
