
import React from "react";
import { Building2, MapPin, Briefcase, FileCode2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EditableField from "./EditableField";
import { useAccount } from "@/context/AccountContext";
import TranslatedText from "@/components/translation/TranslatedText";
import { motion } from "framer-motion";

const CompanyInfoSection = () => {
  const { companyName, setCompanyName, address, setAddress, industry, setIndustry, registrationId, setRegistrationId, editing } = useAccount();
  
  const gradientBorder = "border-purple-800/30 hover:border-purple-600/40 transition-all duration-300";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className={`bg-charcoal-light/30 backdrop-blur-md shadow-lg ${gradientBorder} overflow-hidden relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-transparent"></div>
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center mb-4">
            <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
              <Building2 size={18} className="text-purple-300" />
            </div>
            <h3 className="text-lg font-medium text-white">
              <TranslatedText keyName="accountInfo.companyDetails" fallback="Company Details" />
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableField
              label="companyName"
              icon={<Building2 size={14} />}
              field="companyName"
              value={companyName}
              onChange={setCompanyName}
              isEditing={editing.companyName}
            />
            
            <EditableField
              label="address"
              icon={<MapPin size={14} />}
              field="address"
              value={address}
              onChange={setAddress}
              isEditing={editing.address}
            />
            
            <EditableField
              label="industry"
              icon={<Briefcase size={14} />}
              field="industry"
              value={industry}
              onChange={setIndustry}
              isEditing={editing.industry}
            />
            
            <EditableField
              label="registrationId"
              icon={<FileCode2 size={14} />}
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
