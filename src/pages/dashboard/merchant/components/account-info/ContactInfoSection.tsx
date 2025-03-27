
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import ContactInfoCard from "./ContactInfoCard";
import InfoGuideCard from "./InfoGuideCard";

interface ContactInfoProps {
  editing: Record<string, boolean>;
  handleEdit: (field: string) => void;
  handleSave: (field: string) => void;
  handleCancel: (field: string) => void;
  handleSaveAll: () => void;
}

const ContactInfoSection = ({
  editing,
  handleEdit,
  handleSave,
  handleCancel,
  handleSaveAll
}: ContactInfoProps) => {
  return (
    <Card className="bg-gradient-to-br from-[#0F2643]/90 to-[#091B34]/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-green-500/20 p-2 rounded-full mr-2">
            <User size={18} className="text-green-400" />
          </span>
          联系人信息
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          管理企业联系人信息
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactInfoCard 
            editing={editing}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
          
          <InfoGuideCard handleSaveAll={handleSaveAll} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoSection;
