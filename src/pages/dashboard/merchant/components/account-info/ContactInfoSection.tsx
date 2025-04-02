
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Mail, CheckCircle, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ContactInfoSectionProps {
  editing: Record<string, boolean>;
  handleEdit: (field: string) => void;
  handleSave: (field: string) => void;
  handleCancel: (field: string) => void;
  handleSaveAll: () => void;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  editing,
  handleEdit,
  handleSave,
  handleCancel,
  handleSaveAll
}) => {
  const { t } = useLanguage();
  const [phone, setPhone] = useState("+852 1234 5678");
  const [email, setEmail] = useState("contact@zoracard.com");
  
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
              <Phone size={20} className="text-purple-300" />
            </div>
            <h2 className="text-xl font-semibold text-white bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              <TranslatedText keyName="accountInfo.contactDetails" fallback="Contact Details" />
            </h2>
          </div>
          <Button 
            variant="outline" 
            className="bg-purple-900/20 border-purple-500/50 text-purple-200 hover:bg-purple-800/40 hover:text-purple-100 hover:border-purple-400/60 transition-all duration-200 shadow-sm shadow-purple-900/10"
            onClick={() => handleSaveAll()}
          >
            <TranslatedText keyName="common.saveAll" fallback="Save All" />
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300 mb-1 flex items-center">
              <Phone className="h-3.5 w-3.5 mr-1.5 text-purple-400/70" />
              <TranslatedText keyName="accountInfo.phone" fallback="Phone" />
            </label>
            {editing.phone ? (
              <div className="space-y-2">
                <Input 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-charcoal-dark/60 border-purple-800/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30 shadow-inner shadow-purple-900/10"
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-900/20 border border-purple-500/30"
                    onClick={() => saveWithAnimation("phone")}
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                    <TranslatedText keyName="common.save" fallback="Save" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-600/40 text-white hover:bg-purple-900/50 shadow-sm"
                    onClick={() => handleCancel("phone")}
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
                  <Phone className="h-4 w-4 text-purple-400 mr-2 shrink-0" />
                  <span>{phone}</span>
                </div>
                <Button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-8 p-0 bg-purple-800/40 text-purple-200 hover:bg-purple-700/60 border border-purple-500/30"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit("phone")}
                >
                  <TranslatedText keyName="common.edit" fallback="Edit" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-purple-300 mb-1 flex items-center">
              <Mail className="h-3.5 w-3.5 mr-1.5 text-purple-400/70" />
              <TranslatedText keyName="accountInfo.email" fallback="Email" />
            </label>
            {editing.email ? (
              <div className="space-y-2">
                <Input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-charcoal-dark/60 border-purple-800/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30 shadow-inner shadow-purple-900/10"
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-900/20 border border-purple-500/30"
                    onClick={() => saveWithAnimation("email")}
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                    <TranslatedText keyName="common.save" fallback="Save" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-600/40 text-white hover:bg-purple-900/50 shadow-sm"
                    onClick={() => handleCancel("email")}
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
                  <Mail className="h-4 w-4 text-purple-400 mr-2 shrink-0" />
                  <span>{email}</span>
                </div>
                <Button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-8 p-0 bg-purple-800/40 text-purple-200 hover:bg-purple-700/60 border border-purple-500/30"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit("email")}
                >
                  <TranslatedText keyName="common.edit" fallback="Edit" />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactInfoSection;
