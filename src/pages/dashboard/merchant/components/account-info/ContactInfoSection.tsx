
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
  
  return (
    <Card className="bg-gradient-to-br from-green-900 to-green-950 border-green-900/50 shadow-lg shadow-green-900/10 hover:shadow-[0_0_15px_rgba(0,255,155,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardContent className="relative z-10 p-6 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="bg-green-500/20 p-2 rounded-full mr-2">
              <Phone size={18} className="text-green-400" />
            </span>
            <h2 className="text-lg font-semibold text-white">{t("accountInfo.contactDetails")}</h2>
          </div>
          <Button 
            variant="outline" 
            className="border-green-500/50 text-green-200 hover:bg-green-800/30 hover:text-green-100"
            onClick={() => handleEdit("phone")}
          >
            {t("common.edit")}
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-green-300 mb-1 block">
              {t("accountInfo.phone")}
            </label>
            {editing.phone ? (
              <div className="flex gap-2">
                <Input 
                  defaultValue="+852 1234 5678" 
                  className="bg-[#052818]/70 border-green-900/50 text-white"
                />
                <div className="flex gap-1">
                  <Button size="sm" className="bg-green-600" onClick={() => handleSave("phone")}>
                    {t("common.save")}
                  </Button>
                  <Button size="sm" variant="outline" className="border-green-600/60 text-white hover:bg-green-900/20" onClick={() => handleCancel("phone")}>
                    {t("common.cancel")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center p-2.5 bg-[#052818]/70 border border-green-900/50 rounded-md text-white">
                <Phone className="h-4 w-4 text-green-400 mr-2 shrink-0" />
                <span>+852 1234 5678</span>
              </div>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium text-green-300 mb-1 block">
              {t("accountInfo.email")}
            </label>
            {editing.email ? (
              <div className="flex gap-2">
                <Input 
                  defaultValue="contact@zoracard.com" 
                  className="bg-[#052818]/70 border-green-900/50 text-white"
                />
                <div className="flex gap-1">
                  <Button size="sm" className="bg-green-600" onClick={() => handleSave("email")}>
                    {t("common.save")}
                  </Button>
                  <Button size="sm" variant="outline" className="border-green-600/60 text-white hover:bg-green-900/20" onClick={() => handleCancel("email")}>
                    {t("common.cancel")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center p-2.5 bg-[#052818]/70 border border-green-900/50 rounded-md text-white">
                <Mail className="h-4 w-4 text-green-400 mr-2 shrink-0" />
                <span>contact@zoracard.com</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoSection;
