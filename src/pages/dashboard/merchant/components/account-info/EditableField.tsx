
import React, { useState } from "react";
import { Check, X, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccount } from "@/context/AccountContext";
import TranslatedText from "@/components/translation/TranslatedText";
import { motion } from "framer-motion";

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
  isEditing,
}) => {
  const { toggleEditingField, saveField } = useAccount();
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    saveField(field, inputValue);
  };

  const handleCancel = () => {
    setInputValue(value);
    toggleEditingField(field);
  };

  return (
    <motion.div 
      className="flex flex-col relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="flex items-center space-x-2 text-purple-300 text-sm mb-1.5">
        <span>{icon}</span>
        <span><TranslatedText keyName={`accountInfo.${label}`} fallback={label} /></span>
      </label>

      {isEditing ? (
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-charcoal-dark/60 border-purple-800/30 text-white py-2 px-3 rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
          <div className="flex space-x-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleSave}
              className="h-9 w-9 text-neon-green hover:text-white hover:bg-neon-green/20 rounded-md transition-colors"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCancel}
              className="h-9 w-9 text-red-400 hover:text-white hover:bg-red-500/20 rounded-md transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between group">
          <div className="text-white py-2 text-base overflow-hidden text-ellipsis">
            {value || (
              <span className="text-gray-500 italic text-sm">
                <TranslatedText keyName="common.edit" fallback="Click to edit" />
              </span>
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => toggleEditingField(field)}
            className="h-8 w-8 text-purple-400 opacity-0 group-hover:opacity-100 hover:bg-purple-800/30 hover:text-white rounded-md transition-all"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default EditableField;
