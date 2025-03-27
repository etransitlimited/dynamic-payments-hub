
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, CheckCircle, X } from "lucide-react";

interface EditableFieldProps {
  id: string;
  value: string;
  isEditing: boolean;
  isDisabled?: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const EditableField = ({
  id,
  value,
  isEditing,
  isDisabled = false,
  onEdit,
  onSave,
  onCancel,
  icon,
  className
}: EditableFieldProps) => {
  if (isDisabled) {
    return (
      <div className="flex items-center">
        {icon && (
          <span className="bg-[#061428] px-3 py-2 rounded-l-md border border-r-0 border-blue-900/50 text-white">
            {icon}
          </span>
        )}
        <Input 
          id={id} 
          value={value} 
          readOnly
          className={`${icon ? 'rounded-l-none' : ''} bg-[#061428] border-blue-900/50 text-white opacity-80 ${className}`}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-2 text-blue-400/50 cursor-not-allowed"
          disabled
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {icon && (
        <span className="bg-[#061428] px-3 py-2 rounded-l-md border border-r-0 border-blue-900/50 text-white">
          {icon}
        </span>
      )}
      <Input 
        id={id} 
        value={value} 
        readOnly={!isEditing}
        className={`${icon ? 'rounded-l-none' : ''} bg-[#061428] border-blue-900/50 text-white ${isEditing ? 'border-blue-400 ring-1 ring-blue-400/50' : ''} ${className}`}
      />
      {!isEditing ? (
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4" />
        </Button>
      ) : (
        <div className="flex ml-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-green-400 hover:bg-green-900/30 hover:text-green-300"
            onClick={onSave}
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-red-400 hover:bg-red-900/30 hover:text-red-300"
            onClick={onCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditableField;
