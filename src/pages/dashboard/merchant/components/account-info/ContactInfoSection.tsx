
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";

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
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="bg-gradient-to-br from-purple-500/30 to-purple-700/30 p-2 rounded-full mr-2">
            <Phone size={18} className="text-purple-300" />
          </span>
          <h2 className="text-xl font-semibold text-white bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            <TranslatedText keyName="accountInfo.contactDetails" fallback="Contact Details" />
          </h2>
        </div>
        <Button 
          variant="outline" 
          className="bg-purple-900/20 border-purple-500/50 text-purple-200 hover:bg-purple-800/40 hover:text-purple-100 hover:border-purple-400/60 transition-all duration-200"
          onClick={() => handleEdit("phone")}
        >
          <TranslatedText keyName="common.edit" fallback="Edit" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-purple-300 mb-1 block">
            <TranslatedText keyName="accountInfo.phone" fallback="Phone" />
          </label>
          {editing.phone ? (
            <div className="flex gap-2">
              <Input 
                defaultValue="+852 1234 5678" 
                className="bg-charcoal-dark/60 border-purple-800/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30"
              />
              <div className="flex gap-1">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-500 transition-colors" onClick={() => handleSave("phone")}>
                  <TranslatedText keyName="common.save" fallback="Save" />
                </Button>
                <Button size="sm" variant="outline" className="border-purple-600/60 text-white hover:bg-purple-900/50" onClick={() => handleCancel("phone")}>
                  <TranslatedText keyName="common.cancel" fallback="Cancel" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center p-3 bg-gradient-to-br from-charcoal-dark/80 to-charcoal-dark/60 backdrop-blur-sm border border-purple-900/40 rounded-md text-white shadow-sm">
              <Phone className="h-4 w-4 text-purple-400 mr-2 shrink-0" />
              <span>+852 1234 5678</span>
            </div>
          )}
        </div>
        
        <div>
          <label className="text-sm font-medium text-purple-300 mb-1 block">
            <TranslatedText keyName="accountInfo.email" fallback="Email" />
          </label>
          {editing.email ? (
            <div className="flex gap-2">
              <Input 
                defaultValue="contact@zoracard.com" 
                className="bg-charcoal-dark/60 border-purple-800/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30"
              />
              <div className="flex gap-1">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-500 transition-colors" onClick={() => handleSave("email")}>
                  <TranslatedText keyName="common.save" fallback="Save" />
                </Button>
                <Button size="sm" variant="outline" className="border-purple-600/60 text-white hover:bg-purple-900/50" onClick={() => handleCancel("email")}>
                  <TranslatedText keyName="common.cancel" fallback="Cancel" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center p-3 bg-gradient-to-br from-charcoal-dark/80 to-charcoal-dark/60 backdrop-blur-sm border border-purple-900/40 rounded-md text-white shadow-sm">
              <Mail className="h-4 w-4 text-purple-400 mr-2 shrink-0" />
              <span>contact@zoracard.com</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
