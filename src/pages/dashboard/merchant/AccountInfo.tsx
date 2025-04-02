
import React, { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import CompanyInfoSection from "./components/account-info/CompanyInfoSection";
import ContactInfoSection from "./components/account-info/ContactInfoSection";
import { Shield, CheckCircle2, Clock, Activity, Shield as ShieldIcon, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";
import { Button } from "@/components/ui/button";
import GradientOverlay from "@/components/particles/GradientOverlay";
import ParticlesLayer from "@/components/particles/ParticlesLayer";
import { motion } from "framer-motion";
import { useAccount } from "@/context/AccountContext";
import { AccountProvider } from "@/context/AccountContext";

// 添加径向进度组件
const RadialProgress = ({ value, color, size = 120, label, sublabel }: { 
  value: number, 
  color: string, 
  size?: number,
  label: React.ReactNode,
  sublabel: React.ReactNode
}) => {
  const circumference = 2 * Math.PI * 45;
  const progress = circumference - (value / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className="rotate-[-90deg]">
          {/* Background circle */}
          <circle 
            cx="60" 
            cy="60" 
            r="45" 
            strokeWidth="8" 
            stroke="rgba(107, 70, 193, 0.2)"
            className="opacity-30" 
          />
          {/* Progress circle */}
          <circle 
            cx="60" 
            cy="60" 
            r="45" 
            strokeWidth="8" 
            stroke={color} 
            strokeLinecap="round" 
            strokeDasharray={circumference} 
            strokeDashoffset={progress}
            className="drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" 
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{value}%</span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <div className="text-sm font-medium text-purple-300">{label}</div>
        <div className="text-xs text-purple-200/60 mt-1">{sublabel}</div>
      </div>
    </div>
  );
};

const AccountInfoContent = () => {
  const { t } = useLanguage();
  const { 
    verificationStatus, 
    verificationProgress, 
    profileCompletion,
    handleSaveAll 
  } = useAccount();
  
  useEffect(() => {
    // Animation effect for the progress bar is handled with CSS now
    console.log("Account info loaded with verification status:", verificationStatus);
  }, [verificationStatus]);
  
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
        {/* Dark charcoal background */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-dark"></div>
        
        {/* Grid texture */}
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        
        {/* Vibrant purple gradient halos */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-600/8 rounded-full blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-purple-800/8 rounded-full blur-3xl animate-pulse-subtle opacity-70"></div>
        <div className="absolute top-3/4 right-1/4 -translate-y-1/2 w-[20rem] h-[20rem] bg-blue-900/8 rounded-full blur-3xl animate-pulse-subtle opacity-50"></div>
        
        {/* Neon green highlight */}
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
        
        {/* Account status card - using more pronounced purple gradient and neon green highlights */}
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
                  <span>{verificationProgress}%</span>
                </div>
                <div className="relative h-2.5 w-full bg-purple-950/70 rounded-full overflow-hidden border border-purple-800/30">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-neon-green/80 rounded-full shine-effect"
                    style={{ width: `${verificationProgress}%` }}
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
        
        {/* Data metrics section - NEW */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="relative overflow-hidden bg-gradient-to-br from-charcoal-light/80 to-charcoal-dark/80 border-purple-900/20 p-6">
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            
            <div className="mb-4 flex items-center">
              <Activity size={18} className="text-purple-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">
                <TranslatedText keyName="accountInfo.dataMetrics" fallback="Data Metrics" />
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RadialProgress 
                value={85} 
                color="#8B5CF6" 
                label={<TranslatedText keyName="accountInfo.accountHealth" fallback="Account Health" />}
                sublabel={<TranslatedText keyName="accountInfo.completionRate" fallback="Completion Rate" />}
              />
              
              <RadialProgress 
                value={92} 
                color="#10B981" 
                label={<TranslatedText keyName="accountInfo.securityScore" fallback="Security Score" />}
                sublabel={<TranslatedText keyName="accountInfo.completionRate" fallback="Completion Rate" />}
              />
              
              <RadialProgress 
                value={profileCompletion} 
                color="#F2FCE2" 
                label={<TranslatedText keyName="accountInfo.profileCompletion" fallback="Profile Completion" />}
                sublabel={<TranslatedText keyName="accountInfo.completionRate" fallback="Completion Rate" />}
              />
            </div>
          </Card>
        </motion.div>
        
        {/* Content section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6">
          <CompanyInfoSection />
          <ContactInfoSection />
          
          {/* Privacy notice - using cool blue design */}
          <motion.div variants={itemVariants} className="rounded-xl bg-blue-900/15 border border-blue-800/40 p-4 text-blue-300/90 text-sm backdrop-blur-sm shadow-lg shadow-blue-900/10">
            <div className="flex items-start">
              <ShieldIcon size={16} className="text-blue-400 mr-2 mt-0.5 shrink-0" />
              <p><TranslatedText keyName="accountInfo.privacyNotice" fallback="Your information is encrypted and secured with enterprise-grade security. We comply with all data protection regulations." /></p>
            </div>
          </motion.div>
          
          {/* Save All Button */}
          <motion.div variants={itemVariants} className="flex justify-end mt-4">
            <Button 
              onClick={handleSaveAll}
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-900/20 border border-purple-500/30 px-6"
            >
              <TranslatedText keyName="common.saveAll" fallback="Save All" />
            </Button>
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
          
          .shine-effect::after {
            content: '';
            position: absolute;
            top: 0;
            left: -120px;
            height: 100%;
            width: 120px;
            background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: shine 2s infinite;
          }
        `}
      </style>
    </div>
  );
};

const AccountInfo = () => {
  return (
    <AccountProvider>
      <AccountInfoContent />
    </AccountProvider>
  );
};

export default AccountInfo;
