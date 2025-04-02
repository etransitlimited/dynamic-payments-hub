
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
      {/* Enhanced background with glowing gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-dark"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        
        {/* Enhanced gradient orbs with subtle animation */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-600/5 rounded-full blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-purple-800/5 rounded-full blur-3xl animate-pulse-subtle opacity-70"></div>
        <div className="absolute top-3/4 right-1/4 -translate-y-1/2 w-[20rem] h-[20rem] bg-blue-900/5 rounded-full blur-3xl animate-pulse-subtle opacity-50"></div>
        
        {/* Additional accent for neon green highlight */}
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl"></div>
        
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
        
        {/* Account status card with enhanced design */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="relative overflow-hidden bg-gradient-to-r from-purple-900/50 to-purple-950/50 border-purple-800/30 shadow-xl shadow-purple-900/10 p-4 hover:shadow-[0_0_20px_rgba(142,45,226,0.2)] transition-all duration-500">
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-800/50 backdrop-blur-sm rounded-full mr-3 shadow-inner shadow-purple-900/20 border border-purple-500/20">
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
                <div className="flex justify-between text-xs text-purple-200/70">
                  <span><TranslatedText keyName="accountInfo.verificationProgress" fallback="Verification Progress" /></span>
                  <span>{progress}%</span>
                </div>
                <div className="relative h-2 w-full bg-purple-950/60 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-neon-green/80 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                  {/* Animate glow effect */}
                  <div 
                    className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-45 animate-shine"
                    style={{ animation: 'shine 2s infinite' }}
                  ></div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="bg-purple-800/30 border-purple-500/40 text-purple-200 hover:bg-purple-700/40 hover:text-purple-100 hover:border-purple-400/60 transition-all shadow-md shadow-purple-900/20"
              >
                <TranslatedText keyName="accountInfo.requestVerification" fallback="Request Verification" />
              </Button>
            </div>
          </Card>
        </motion.div>
        
        {/* Main content sections */}
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
          
          {/* Privacy Notice with enhanced design */}
          <motion.div variants={itemVariants} className="rounded-xl bg-blue-900/10 border border-blue-800/30 p-4 text-blue-300/80 text-sm backdrop-blur-sm shadow-lg shadow-blue-900/5">
            <div className="flex items-start">
              <Shield size={16} className="text-blue-400 mr-2 mt-0.5 shrink-0" />
              <p><TranslatedText keyName="accountInfo.privacyNotice" fallback="Your information is encrypted and secured with enterprise-grade security. We comply with all data protection regulations." /></p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <style jsx global>{`
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
      `}</style>
    </div>
  );
};

export default AccountInfo;
