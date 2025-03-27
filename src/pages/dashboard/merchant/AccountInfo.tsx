
import React, { useState } from "react";
import PageHeader from "./components/PageHeader";
import { useToast } from "@/components/ui/use-toast";
import CompanyInfoSection from "./components/account-info/CompanyInfoSection";
import ContactInfoSection from "./components/account-info/ContactInfoSection";

const AccountInfo = () => {
  console.log("AccountInfo component rendering");
  const { toast } = useToast();
  const [editing, setEditing] = useState<Record<string, boolean>>({});
  
  const handleEdit = (field: string) => {
    setEditing((prev) => ({ ...prev, [field]: true }));
  };
  
  const handleSave = (field: string) => {
    setEditing((prev) => ({ ...prev, [field]: false }));
    toast({
      title: "字段已更新",
      description: `${field}已成功更新`,
      variant: "default",
    });
  };
  
  const handleCancel = (field: string) => {
    setEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleSaveAll = () => {
    toast({
      title: "更改已保存",
      description: "所有更改已成功保存到系统",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageHeader title="账户信息" />
      
      <CompanyInfoSection 
        editing={editing}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
      
      <ContactInfoSection 
        editing={editing}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleSaveAll={handleSaveAll}
      />
    </div>
  );
};

export default AccountInfo;
