
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CompanyInfoSectionProps {
  editing: Record<string, boolean>;
  handleEdit: (field: string) => void;
  handleSave: (field: string) => void;
  handleCancel: (field: string) => void;
  handleSaveAll: () => void;
}

const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({
  editing,
  handleEdit,
  handleSave,
  handleCancel,
  handleSaveAll
}) => {
  const { t } = useLanguage();
  
  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardContent className="relative z-10 p-6 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <Building size={18} className="text-blue-400" />
            </span>
            <h2 className="text-lg font-semibold text-white">{t("accountInfo.companyInformation")}</h2>
          </div>
          <Button 
            variant="outline" 
            className="border-blue-500/50 text-blue-200 hover:bg-blue-800/30 hover:text-blue-100"
            onClick={() => handleEdit("companyName")}
          >
            {t("common.edit")}
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-blue-300 mb-1 block">
              {t("accountInfo.companyName")}
            </label>
            {editing.companyName ? (
              <div className="flex gap-2">
                <Input 
                  defaultValue="ZoraCard International Ltd." 
                  className="bg-[#061428]/70 border-blue-900/50 text-white"
                />
                <div className="flex gap-1">
                  <Button size="sm" className="bg-blue-600" onClick={() => handleSave("companyName")}>
                    {t("common.save")}
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-600/60 text-white hover:bg-blue-900/20" onClick={() => handleCancel("companyName")}>
                    {t("common.cancel")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-2.5 bg-[#061428]/70 border border-blue-900/50 rounded-md text-white">
                ZoraCard International Ltd.
              </div>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium text-blue-300 mb-1 block">
              {t("accountInfo.address")}
            </label>
            {editing.address ? (
              <div className="flex gap-2">
                <Input 
                  defaultValue="123 Finance Street, Business District, Hong Kong" 
                  className="bg-[#061428]/70 border-blue-900/50 text-white"
                />
                <div className="flex gap-1">
                  <Button size="sm" className="bg-blue-600" onClick={() => handleSave("address")}>
                    {t("common.save")}
                  </Button>
                  <Button size="sm" variant="outline" className="border-blue-600/60 text-white hover:bg-blue-900/20" onClick={() => handleCancel("address")}>
                    {t("common.cancel")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start p-2.5 bg-[#061428]/70 border border-blue-900/50 rounded-md text-white">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5 mr-2 shrink-0" />
                <span>123 Finance Street, Business District, Hong Kong</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoSection;
