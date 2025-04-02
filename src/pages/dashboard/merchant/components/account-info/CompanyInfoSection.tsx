
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Briefcase, FileText } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import EditableField from "../account-info/EditableField";
import { useAccount } from "@/context/AccountContext";
import { motion } from "framer-motion";

const CompanyInfoSection = () => {
  const { 
    companyName, setCompanyName,
    address, setAddress,
    industry, setIndustry,
    registrationId, setRegistrationId,
    editing
  } = useAccount();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="border-purple-800/40 bg-gradient-to-br from-charcoal-light/40 to-charcoal-dark/40 shadow-xl shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-800/5 rounded-full blur-3xl"></div>
        
        <CardHeader className="border-b border-purple-900/20 pb-3 relative z-10">
          <CardTitle className="text-white text-lg flex items-center">
            <Building2 className="mr-2 h-5 w-5 text-purple-400" />
            <TranslatedText keyName="accountInfo.companyDetails" fallback="Company Details" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableField
              label="companyName"
              icon={<Building2 className="text-purple-400" />}
              field="companyName"
              value={companyName}
              onChange={setCompanyName}
              isEditing={editing.companyName}
            />
            
            <EditableField
              label="address"
              icon={<MapPin className="text-purple-400" />}
              field="address"
              value={address}
              onChange={setAddress}
              isEditing={editing.address}
            />
            
            <EditableField
              label="industry"
              icon={<Briefcase className="text-purple-400" />}
              field="industry"
              value={industry}
              onChange={setIndustry}
              isEditing={editing.industry}
            />
            
            <EditableField
              label="registrationId"
              icon={<FileText className="text-purple-400" />}
              field="registrationId"
              value={registrationId}
              onChange={setRegistrationId}
              isEditing={editing.registrationId}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompanyInfoSection;
