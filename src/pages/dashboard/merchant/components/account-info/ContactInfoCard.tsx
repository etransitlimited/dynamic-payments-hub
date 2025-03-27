
import React from "react";
import { Card } from "@/components/ui/card";
import ContactEditableField from "./ContactEditableField";
import { Phone, Mail, User } from "lucide-react";

interface ContactInfoCardProps {
  editing: Record<string, boolean>;
  handleEdit: (field: string) => void;
  handleSave: (field: string) => void;
  handleCancel: (field: string) => void;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  editing,
  handleEdit,
  handleSave,
  handleCancel
}) => {
  return (
    <Card className="bg-[#061428]/70 border-blue-900/30 shadow-inner rounded-lg p-4 hover:shadow-md hover:shadow-blue-900/20 transition-all duration-300">
      <div className="space-y-4">
        <ContactEditableField
          id="contact-name"
          label="联系人姓名"
          value="张经理"
          isEditing={editing['contact-name'] || false}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          icon={<User className="h-4 w-4 text-blue-400" />}
        />
        
        <ContactEditableField
          id="contact-phone"
          label="联系电话"
          value="13800138000"
          isEditing={editing['contact-phone'] || false}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          icon={<Phone className="h-4 w-4 text-blue-400" />}
        />
        
        <ContactEditableField
          id="contact-email"
          label="电子邮箱"
          value="contact@example.com"
          isEditing={editing['contact-email'] || false}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          icon={<Mail className="h-4 w-4 text-blue-400" />}
        />
      </div>
    </Card>
  );
};

export default ContactInfoCard;
