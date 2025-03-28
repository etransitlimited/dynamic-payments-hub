
import React, { useState } from "react";
import PageHeader from "./components/PageHeader";
import { useToast } from "@/components/ui/use-toast";
import CompanyInfoSection from "./components/account-info/CompanyInfoSection";
import ContactInfoSection from "./components/account-info/ContactInfoSection";

const AccountInfo = () => {
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
      
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden rounded-lg relative">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="relative z-10">
            <CompanyInfoSection 
              editing={editing}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden rounded-lg relative">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="relative z-10">
            <ContactInfoSection 
              editing={editing}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleCancel={handleCancel}
              handleSaveAll={handleSaveAll}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
