
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
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="bg-purple-500/20 p-2 rounded-full mr-2">
            <Building size={18} className="text-purple-300" />
          </span>
          <h2 className="text-lg font-semibold text-white">{t("accountInfo.companyInformation")}</h2>
        </div>
        <Button 
          variant="outline" 
          className="border-purple-500/50 text-purple-200 hover:bg-purple-800/30 hover:text-purple-100"
          onClick={() => handleEdit("companyName")}
        >
          {t("common.edit")}
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-purple-300 mb-1 block">
            {t("accountInfo.companyName")}
          </label>
          {editing.companyName ? (
            <div className="flex gap-2">
              <Input 
                defaultValue="ZoraCard International Ltd." 
                className="bg-charcoal-dark/60 border-purple-900/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30"
              />
              <div className="flex gap-1">
                <Button size="sm" className="bg-purple-600" onClick={() => handleSave("companyName")}>
                  {t("common.save")}
                </Button>
                <Button size="sm" variant="outline" className="border-purple-600/60 text-white hover:bg-purple-900/20" onClick={() => handleCancel("companyName")}>
                  {t("common.cancel")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-2.5 bg-charcoal-dark/60 border border-purple-900/50 rounded-md text-white">
              ZoraCard International Ltd.
            </div>
          )}
        </div>
        
        <div>
          <label className="text-sm font-medium text-purple-300 mb-1 block">
            {t("accountInfo.address")}
          </label>
          {editing.address ? (
            <div className="flex gap-2">
              <Input 
                defaultValue="123 Finance Street, Business District, Hong Kong" 
                className="bg-charcoal-dark/60 border-purple-900/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30"
              />
              <div className="flex gap-1">
                <Button size="sm" className="bg-purple-600" onClick={() => handleSave("address")}>
                  {t("common.save")}
                </Button>
                <Button size="sm" variant="outline" className="border-purple-600/60 text-white hover:bg-purple-900/20" onClick={() => handleCancel("address")}>
                  {t("common.cancel")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start p-2.5 bg-charcoal-dark/60 border border-purple-900/50 rounded-md text-white">
              <MapPin className="h-4 w-4 text-purple-400 mt-0.5 mr-2 shrink-0" />
              <span>123 Finance Street, Business District, Hong Kong</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoSection;
