
import React from "react";
import { Card } from "@/components/ui/card";
import CompanyEditableField from "./CompanyEditableField";

interface CompanyInfoCardProps {
  fields: {
    id: string;
    label: string;
    value: string;
    isReadOnly?: boolean;
  }[];
  editing: Record<string, boolean>;
  handleEdit: (field: string) => void;
  handleSave: (field: string) => void;
  handleCancel: (field: string) => void;
}

const CompanyInfoCard: React.FC<CompanyInfoCardProps> = ({
  fields,
  editing,
  handleEdit,
  handleSave,
  handleCancel
}) => {
  return (
    <Card className="bg-[#061428]/70 border-blue-900/30 shadow-inner rounded-lg p-4 hover:shadow-md hover:shadow-blue-900/20 transition-all duration-300">
      <div className="space-y-4">
        {fields.map((field) => (
          <CompanyEditableField
            key={field.id}
            id={field.id}
            label={field.label}
            value={field.value}
            isEditing={editing[field.id] || false}
            isReadOnly={field.isReadOnly}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ))}
      </div>
    </Card>
  );
};

export default CompanyInfoCard;
