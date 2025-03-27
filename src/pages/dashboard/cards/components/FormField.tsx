
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { getInputClass, getLabelClass } from "@/styles/use-design-tokens";

interface FormFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
  type?: string;
  className?: string;
  readOnly?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  icon,
  type = "text",
  className = "",
  readOnly = false,
}) => {
  return (
    <div className="space-y-2">
      <Label className={getLabelClass()}>{label}</Label>
      <div className={`relative ${className}`}>
        {icon && (
          <span className="absolute left-3 top-2.5 h-4 w-4 text-blue-400">
            {icon}
          </span>
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={getInputClass(!!error, !!icon)}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
        {error && (
          <div className="flex items-center mt-1 text-xs text-red-400">
            <AlertCircle className="h-3 w-3 mr-1" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField;
