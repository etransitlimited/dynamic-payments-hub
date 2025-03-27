
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

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
      <Label className="text-sm font-medium text-blue-200">{label}</Label>
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
          className={`${
            icon ? "pl-10" : ""
          } bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40 focus:border-blue-700/70 transition-colors ${
            error ? "border-red-500" : ""
          }`}
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
