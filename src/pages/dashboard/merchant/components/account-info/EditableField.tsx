
import React from "react";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";
import { toast } from "sonner";
import { useAccount } from "@/context/AccountContext";

interface EditableFieldProps {
  label: string;
  icon: React.ReactNode;
  field: string;
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  icon,
  field,
  value,
  onChange,
  isEditing
}) => {
  const { handleEdit, handleCancel, saveField, isLoading } = useAccount();
  
  const saveWithAnimation = async () => {
    // 显示加载吐司
    const loadingToast = toast.loading(
      <div className="flex items-center gap-2">
        <span className="animate-spin">◌</span>
        <TranslatedText keyName="accountInfo.saving" fallback="Saving changes..." />
      </div>
    );
    
    try {
      await saveField(field);
      toast.dismiss(loadingToast);
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <TranslatedText keyName="accountInfo.saveSuccess" fallback="Changes saved successfully" />
        </div>
      );
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to save changes");
    }
  };
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-purple-300 mb-1 flex items-center">
        {React.cloneElement(icon as React.ReactElement, { className: "h-3.5 w-3.5 mr-1.5 text-purple-400/70" })}
        <TranslatedText keyName={`accountInfo.${label}`} fallback={label} />
      </label>
      
      {isEditing ? (
        <div className="space-y-2">
          <Input 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-charcoal-dark/60 border-purple-800/50 text-white placeholder-purple-300/50 focus:border-purple-500/70 focus:ring-purple-500/30 shadow-inner shadow-purple-900/10"
          />
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-900/20 border border-purple-500/30"
              onClick={saveWithAnimation}
              disabled={isLoading[field]}
            >
              {isLoading[field] ? (
                <span className="animate-spin mr-1.5">◌</span>
              ) : (
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              )}
              <TranslatedText keyName="common.save" fallback="Save" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-purple-600/40 text-white hover:bg-purple-900/50 shadow-sm"
              onClick={() => handleCancel(field)}
              disabled={isLoading[field]}
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
            {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4 text-purple-400 mr-2 shrink-0" })}
            <span>{value}</span>
          </div>
          <Button 
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-8 p-0 bg-purple-800/40 text-purple-200 hover:bg-purple-700/60 border border-purple-500/30"
            size="icon"
            variant="ghost"
            onClick={() => handleEdit(field)}
          >
            <TranslatedText keyName="common.edit" fallback="Edit" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditableField;
