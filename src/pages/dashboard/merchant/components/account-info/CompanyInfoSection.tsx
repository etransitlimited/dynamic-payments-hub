
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";

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
          <span className="bg-gradient-to-br from-purple-500/30 to-purple-700/30 p-2 rounded-full mr-2">
            <Building size={18} className="text-purple-300" />
          </span>
          <h2 className="text-xl font-semibold text-white bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            <TranslatedText keyName="accountInfo.companyInformation" fallback="Company Information" />
          </h2>
        </div>
        <Button 
          variant="outline" 
          className="bg-purple-900/20 border-purple-500/50 text-purple-200 hover:bg-purple-800/40 hover:text-purple-100 hover:border-purple-400/60 transition-all duration-200"
          onClick={() => handleEdit("companyName")}
        >
          <TranslatedText keyName="common.edit" fallback="Edit" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-purple-300 mb-1 block">
            <TranslatedText keyName="accountInfo.companyName" fallback="Company Name" />
          </label>
          {editing.companyName ? (
            <div className="flex gap-2">
              <Input 
                defaultValue="ZoraCard International Ltd." 
                className="bg-charcoal-dark/60 border-purple-800/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30"
              />
              <div className="flex gap-1">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-500 transition-colors" onClick={() => handleSave("companyName")}>
                  <TranslatedText keyName="common.save" fallback="Save" />
                </Button>
                <Button size="sm" variant="outline" className="border-purple-600/60 text-white hover:bg-purple-900/50" onClick={() => handleCancel("companyName")}>
                  <TranslatedText keyName="common.cancel" fallback="Cancel" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-gradient-to-br from-charcoal-dark/80 to-charcoal-dark/60 backdrop-blur-sm border border-purple-900/40 rounded-md text-white shadow-sm">
              ZoraCard International Ltd.
            </div>
          )}
        </div>
        
        <div>
          <label className="text-sm font-medium text-purple-300 mb-1 block">
            <TranslatedText keyName="accountInfo.address" fallback="Address" />
          </label>
          {editing.address ? (
            <div className="flex gap-2">
              <Input 
                defaultValue="123 Finance Street, Business District, Hong Kong" 
                className="bg-charcoal-dark/60 border-purple-800/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30"
              />
              <div className="flex gap-1">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-500 transition-colors" onClick={() => handleSave("address")}>
                  <TranslatedText keyName="common.save" fallback="Save" />
                </Button>
                <Button size="sm" variant="outline" className="border-purple-600/60 text-white hover:bg-purple-900/50" onClick={() => handleCancel("address")}>
                  <TranslatedText keyName="common.cancel" fallback="Cancel" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start p-3 bg-gradient-to-br from-charcoal-dark/80 to-charcoal-dark/60 backdrop-blur-sm border border-purple-900/40 rounded-md text-white shadow-sm">
              <MapPin className="h-4 w-4 text-purple-400 mt-1 mr-2 shrink-0" />
              <span>123 Finance Street, Business District, Hong Kong</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoSection;
