
import React, { useEffect } from "react";
import PageHeader from "./components/PageHeader";
import CompanyInfoSection from "./components/account-info/CompanyInfoSection";
import ContactInfoSection from "./components/account-info/ContactInfoSection";
import { useAccountInfo } from "./hooks/useAccountInfo";

const AccountInfo = () => {
  console.log("AccountInfo component rendering");
  
  useEffect(() => {
    console.log("AccountInfo mounted");
    return () => {
      console.log("AccountInfo unmounted");
    };
  }, []);
  
  const {
    editing,
    handleEdit,
    handleSave,
    handleCancel,
    handleSaveAll
  } = useAccountInfo();

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
