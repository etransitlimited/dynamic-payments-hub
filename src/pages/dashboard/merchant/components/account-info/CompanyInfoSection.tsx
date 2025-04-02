
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  MapPin, 
  Globe, 
  Briefcase, 
  FileText, 
  CheckCircle, 
  X,
  Calendar
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { format } from "date-fns";

interface CompanyInfoSectionProps {
  editing: Record<string, boolean>;
  handleEdit: (field: string) => void;
  handleSave: (field: string) => void;
  handleCancel: (field: string) => void;
}

const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({
  editing,
  handleEdit,
  handleSave,
  handleCancel
}) => {
  const { t } = useLanguage();
  const [companyName, setCompanyName] = useState("Zora Digital Holdings Ltd.");
  const [address, setAddress] = useState("88 Queens Road, Central");
  const [industry, setIndustry] = useState("Financial Technology");
  const [registrationId, setRegistrationId] = useState("HK29387465");
  const [profileCompletion, setProfileCompletion] = useState(85);
  
  const lastUpdated = format(new Date(), "MMM dd, yyyy");
  
  const saveWithAnimation = (field: string) => {
    // Show loading toast
    const loadingToast = toast.loading(
      <div className="flex items-center gap-2">
        <span className="animate-spin">◌</span>
        <TranslatedText keyName="accountInfo.saving" fallback="Saving changes..." />
      </div>
    );
    
    // Simulate API call
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <TranslatedText keyName="accountInfo.saveSuccess" fallback="Changes saved successfully" />
        </div>
      );
      setProfileCompletion(Math.min(100, profileCompletion + 5));
      handleSave(field);
    }, 800);
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
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-charcoal-light/80 to-charcoal-dark/90 border border-purple-900/30 p-6 shadow-lg"
    >
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-70"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      <div className="relative z-10 space-y-6">
        <motion.div 
          variants={itemVariants} 
          className="flex justify-between items-center mb-4"
        >
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-purple-500/30 to-purple-700/30 p-2 rounded-full mr-3 shadow-inner shadow-purple-900/20">
              <Building2 size={20} className="text-purple-300" />
            </div>
            <h2 className="text-xl font-semibold text-white bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              <TranslatedText keyName="accountInfo.companyDetails" fallback="Company Details" />
            </h2>
          </div>

          {/* Profile completion indicator */}
          <div className="bg-purple-900/20 px-3 py-1.5 rounded-lg border border-purple-500/30 shadow-inner">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="h-2 w-2 rounded-full bg-neon-green"></div>
              <span className="text-xs text-white font-medium">
                <TranslatedText keyName="accountInfo.profileCompletion" fallback="Profile Completion" />: {profileCompletion}%
              </span>
            </div>
            <Progress value={profileCompletion} className="h-1.5" />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300 mb-1 flex items-center">
              <Building2 className="h-3.5 w-3.5 mr-1.5 text-purple-400/70" />
              <TranslatedText keyName="accountInfo.companyName" fallback="Company Name" />
            </label>
            {editing.companyName ? (
              <div className="space-y-2">
                <Input 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="bg-charcoal-dark/60 border-purple-800/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30 shadow-inner shadow-purple-900/10"
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-900/20 border border-purple-500/30"
                    onClick={() => saveWithAnimation("companyName")}
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                    <TranslatedText keyName="common.save" fallback="Save" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-600/40 text-white hover:bg-purple-900/50 shadow-sm"
                    onClick={() => handleCancel("companyName")}
                  >
                    <X className="h-3.5 w-3.5 mr-1.5" />
                    <TranslatedText keyName="common.cancel" fallback="Cancel" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="group relative">
                <div 
                  className="flex items-center p-3 bg-gradient-to-br from-charcoal-dark/80 to-charcoal-dark/60 backdrop-blur-sm border border-purple-900/40 rounded-md text-white shadow-inner shadow-purple-900/10"
                  style={{ transition: "all 0.25s ease-in-out" }}
                >
                  <Building2 className="h-4 w-4 text-purple-400 mr-2 shrink-0" />
                  <span>{companyName}</span>
                </div>
                <Button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-8 p-0 bg-purple-800/40 text-purple-200 hover:bg-purple-700/60 border border-purple-500/30"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit("companyName")}
                >
                  <TranslatedText keyName="common.edit" fallback="Edit" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300 mb-1 flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1.5 text-purple-400/70" />
              <TranslatedText keyName="accountInfo.address" fallback="Address" />
            </label>
            {editing.address ? (
              <div className="space-y-2">
                <Input 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-charcoal-dark/60 border-purple-800/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30 shadow-inner shadow-purple-900/10"
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-900/20 border border-purple-500/30"
                    onClick={() => saveWithAnimation("address")}
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                    <TranslatedText keyName="common.save" fallback="Save" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-600/40 text-white hover:bg-purple-900/50 shadow-sm"
                    onClick={() => handleCancel("address")}
                  >
                    <X className="h-3.5 w-3.5 mr-1.5" />
                    <TranslatedText keyName="common.cancel" fallback="Cancel" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="group relative">
                <div 
                  className="flex items-center p-3 bg-gradient-to-br from-charcoal-dark/80 to-charcoal-dark/60 backdrop-blur-sm border border-purple-900/40 rounded-md text-white shadow-inner shadow-purple-900/10"
                  style={{ transition: "all 0.25s ease-in-out" }}
                >
                  <MapPin className="h-4 w-4 text-purple-400 mr-2 shrink-0" />
                  <span>{address}</span>
                </div>
                <Button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-8 p-0 bg-purple-800/40 text-purple-200 hover:bg-purple-700/60 border border-purple-500/30"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit("address")}
                >
                  <TranslatedText keyName="common.edit" fallback="Edit" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300 mb-1 flex items-center">
              <Briefcase className="h-3.5 w-3.5 mr-1.5 text-purple-400/70" />
              <TranslatedText keyName="accountInfo.industry" fallback="Industry" />
            </label>
            {editing.industry ? (
              <div className="space-y-2">
                <Input 
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="bg-charcoal-dark/60 border-purple-800/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30 shadow-inner shadow-purple-900/10"
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-900/20 border border-purple-500/30"
                    onClick={() => saveWithAnimation("industry")}
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                    <TranslatedText keyName="common.save" fallback="Save" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-600/40 text-white hover:bg-purple-900/50 shadow-sm"
                    onClick={() => handleCancel("industry")}
                  >
                    <X className="h-3.5 w-3.5 mr-1.5" />
                    <TranslatedText keyName="common.cancel" fallback="Cancel" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="group relative">
                <div 
                  className="flex items-center p-3 bg-gradient-to-br from-charcoal-dark/80 to-charcoal-dark/60 backdrop-blur-sm border border-purple-900/40 rounded-md text-white shadow-inner shadow-purple-900/10"
                  style={{ transition: "all 0.25s ease-in-out" }}
                >
                  <Briefcase className="h-4 w-4 text-purple-400 mr-2 shrink-0" />
                  <span>{industry}</span>
                </div>
                <Button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-8 p-0 bg-purple-800/40 text-purple-200 hover:bg-purple-700/60 border border-purple-500/30"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit("industry")}
                >
                  <TranslatedText keyName="common.edit" fallback="Edit" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300 mb-1 flex items-center">
              <FileText className="h-3.5 w-3.5 mr-1.5 text-purple-400/70" />
              <TranslatedText keyName="accountInfo.registrationId" fallback="Registration ID" />
            </label>
            {editing.registrationId ? (
              <div className="space-y-2">
                <Input 
                  value={registrationId}
                  onChange={(e) => setRegistrationId(e.target.value)}
                  className="bg-charcoal-dark/60 border-purple-800/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30 shadow-inner shadow-purple-900/10"
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-900/20 border border-purple-500/30"
                    onClick={() => saveWithAnimation("registrationId")}
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                    <TranslatedText keyName="common.save" fallback="Save" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-600/40 text-white hover:bg-purple-900/50 shadow-sm"
                    onClick={() => handleCancel("registrationId")}
                  >
                    <X className="h-3.5 w-3.5 mr-1.5" />
                    <TranslatedText keyName="common.cancel" fallback="Cancel" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="group relative">
                <div 
                  className="flex items-center p-3 bg-gradient-to-br from-charcoal-dark/80 to-charcoal-dark/60 backdrop-blur-sm border border-purple-900/40 rounded-md text-white shadow-inner shadow-purple-900/10"
                  style={{ transition: "all 0.25s ease-in-out" }}
                >
                  <FileText className="h-4 w-4 text-purple-400 mr-2 shrink-0" />
                  <span>{registrationId}</span>
                </div>
                <Button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-8 p-0 bg-purple-800/40 text-purple-200 hover:bg-purple-700/60 border border-purple-500/30"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit("registrationId")}
                >
                  <TranslatedText keyName="common.edit" fallback="Edit" />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Last updated info */}
        <motion.div variants={itemVariants} className="flex items-center justify-end mt-4 text-xs text-purple-400/70">
          <Calendar className="h-3 w-3 mr-1" />
          <TranslatedText keyName="accountInfo.lastUpdated" fallback="Last updated" />: {lastUpdated}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompanyInfoSection;
