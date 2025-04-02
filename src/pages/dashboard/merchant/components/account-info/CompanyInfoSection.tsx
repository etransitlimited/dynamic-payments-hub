
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Briefcase, FileText } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import EditableField from "../account-info/EditableField";
import { useAccount } from "@/context/AccountContext";

const CompanyInfoSection = () => {
  const { 
    companyName, setCompanyName,
    address, setAddress,
    industry, setIndustry,
    registrationId, setRegistrationId,
    editing
  } = useAccount();
  
  return (
    <Card className="border-purple-800/40 bg-gradient-to-br from-charcoal-light/40 to-charcoal-dark/40 shadow-xl shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300">
      <CardHeader className="border-b border-purple-900/20 pb-3">
        <CardTitle className="text-white text-lg">
          <TranslatedText keyName="accountInfo.companyDetails" fallback="Company Details" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditableField
            label="companyName"
            icon={<Building2 />}
            field="companyName"
            value={companyName}
            onChange={setCompanyName}
            isEditing={editing.companyName}
          />
          
          <EditableField
            label="address"
            icon={<MapPin />}
            field="address"
            value={address}
            onChange={setAddress}
            isEditing={editing.address}
          />
          
          <EditableField
            label="industry"
            icon={<Briefcase />}
            field="industry"
            value={industry}
            onChange={setIndustry}
            isEditing={editing.industry}
          />
          
          <EditableField
            label="registrationId"
            icon={<FileText />}
            field="registrationId"
            value={registrationId}
            onChange={setRegistrationId}
            isEditing={editing.registrationId}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoSection;
