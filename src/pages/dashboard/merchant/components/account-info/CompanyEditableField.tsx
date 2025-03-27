
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, CheckCircle, X } from "lucide-react";

interface CompanyEditableFieldProps {
  id: string;
  label: string;
  value: string;
  isEditing: boolean;
  isReadOnly?: boolean;
  onEdit: (field: string) => void;
  onSave: (field: string) => void;
  onCancel: (field: string) => void;
}

const CompanyEditableField: React.FC<CompanyEditableFieldProps> = ({
  id,
  label,
  value,
  isEditing,
  isReadOnly = false,
  onEdit,
  onSave,
  onCancel
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white">{label}</Label>
      <div className="flex items-center">
        <Input 
          id={id} 
          value={value} 
          readOnly={!isEditing || isReadOnly}
          className={`bg-[#061428] border-blue-900/50 text-white ${isEditing ? 'border-blue-400 ring-1 ring-blue-400/50' : ''} ${isReadOnly ? 'opacity-80' : ''}`}
        />
        {!isReadOnly ? (
          !isEditing ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
              onClick={() => onEdit(id)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-green-400 hover:bg-green-900/30 hover:text-green-300"
                onClick={() => onSave(id)}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-red-400 hover:bg-red-900/30 hover:text-red-300"
                onClick={() => onCancel(id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2 text-blue-400/50 cursor-not-allowed"
            disabled
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompanyEditableField;
