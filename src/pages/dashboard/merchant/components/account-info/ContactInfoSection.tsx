
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Shield, Activity } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import EditableField from "../account-info/EditableField";
import { useAccount } from "@/context/AccountContext";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const ContactInfoSection = () => {
  const { 
    phone, setPhone,
    email, setEmail,
    editing,
    profileCompletion
  } = useAccount();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="border-purple-800/40 bg-gradient-to-br from-charcoal-light/40 to-charcoal-dark/40 shadow-xl shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-neon-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl"></div>
        
        <CardHeader className="border-b border-purple-900/20 pb-3 relative z-10">
          <CardTitle className="text-white text-lg flex justify-between items-center">
            <span className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-purple-400" />
              <TranslatedText keyName="accountInfo.contactDetails" fallback="Contact Details" />
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-normal text-purple-300">
                <TranslatedText keyName="accountInfo.profileCompletion" fallback="Profile Completion" />:
              </span>
              <span className="text-sm font-medium text-neon-green">{profileCompletion}%</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableField
              label="phone"
              icon={<Phone className="text-purple-400" />}
              field="phone"
              value={phone}
              onChange={setPhone}
              isEditing={editing.phone}
            />
            
            <EditableField
              label="email"
              icon={<Mail className="text-purple-400" />}
              field="email"
              value={email}
              onChange={setEmail}
              isEditing={editing.email}
            />
          </div>
          
          <div className="text-right mt-2 text-xs text-purple-300/70">
            <TranslatedText keyName="accountInfo.lastUpdated" fallback="Last updated" />: {new Date().toLocaleDateString()}
          </div>
          
          {/* Enhanced Progress indicator */}
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between text-xs text-purple-300/80 mb-1.5">
              <span>
                <TranslatedText keyName="accountInfo.completionRate" fallback="Completion Rate" />
              </span>
              <span>{profileCompletion}%</span>
            </div>
            <div className="w-full h-2 bg-purple-950/70 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-neon-green rounded-full shine-effect absolute top-0 left-0"
                style={{ width: `${profileCompletion}%` }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-[-100%] h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ left: "100%" }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5, 
                      ease: "linear",
                      repeatDelay: 0.5
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* New Data Metrics section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 pt-6 border-t border-purple-900/20"
          >
            <h3 className="text-white text-sm mb-4 flex items-center">
              <Activity className="h-4 w-4 mr-2 text-purple-400" />
              <TranslatedText keyName="accountInfo.dataMetrics" fallback="Data Metrics" />
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {/* Account Health */}
              <div className="bg-charcoal-dark/50 border border-purple-900/20 rounded-lg p-4">
                <h4 className="text-purple-300 text-xs mb-2">
                  <TranslatedText keyName="accountInfo.accountHealth" fallback="Account Health" />
                </h4>
                <div className="flex items-center justify-between">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-purple-950/70" strokeWidth="3" />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="stroke-neon-green"
                        strokeWidth="3"
                        strokeDasharray="100"
                        strokeDashoffset="25"
                        transform="rotate(-90 18 18)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-neon-green text-xs font-medium">
                      75%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-2xl font-bold">A+</div>
                    <div className="text-purple-300/70 text-xs">
                      <TranslatedText keyName="accountInfo.securityScore" fallback="Security Score" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Security Score */}
              <div className="bg-charcoal-dark/50 border border-purple-900/20 rounded-lg p-4">
                <h4 className="text-purple-300 text-xs mb-2">
                  <TranslatedText keyName="accountInfo.securityScore" fallback="Security Score" />
                </h4>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-purple-300/80">2FA</span>
                    <span className="text-neon-green">✓</span>
                  </div>
                  <Progress value={100} className="h-1.5 mb-2" />
                  
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-purple-300/80">KYC</span>
                    <span className="text-neon-green">✓</span>
                  </div>
                  <Progress value={100} className="h-1.5 mb-2" />
                  
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-purple-300/80">PIN</span>
                    <span className="text-yellow-400">!</span>
                  </div>
                  <Progress value={30} className="h-1.5" />
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactInfoSection;
