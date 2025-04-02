
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

interface AccountContextType {
  // 账户状态相关
  verificationStatus: "verified" | "pending" | "required";
  verificationProgress: number;
  profileCompletion: number;
  
  // 公司信息相关
  companyName: string;
  setCompanyName: (name: string) => void;
  address: string;
  setAddress: (address: string) => void;
  industry: string;
  setIndustry: (industry: string) => void;
  registrationId: string;
  setRegistrationId: (id: string) => void;
  
  // 联系信息相关
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  
  // 编辑状态管理
  editing: Record<string, boolean>;
  handleEdit: (field: string) => void;
  handleSave: (field: string) => void;
  handleCancel: (field: string) => void;
  handleSaveAll: () => void;
  
  // 保存相关
  saveField: (field: string) => Promise<void>;
  isLoading: Record<string, boolean>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  // 账户状态
  const [verificationStatus, setVerificationStatus] = useState<"verified" | "pending" | "required">("verified");
  const [verificationProgress, setVerificationProgress] = useState(85);
  const [profileCompletion, setProfileCompletion] = useState(85);
  
  // 公司信息
  const [companyName, setCompanyName] = useState("Zora Digital Holdings Ltd.");
  const [address, setAddress] = useState("88 Queens Road, Central");
  const [industry, setIndustry] = useState("Financial Technology");
  const [registrationId, setRegistrationId] = useState("HK29387465");
  
  // 联系信息
  const [phone, setPhone] = useState("+852 1234 5678");
  const [email, setEmail] = useState("contact@zoracard.com");
  
  // 编辑状态管理
  const [editing, setEditing] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  
  const handleEdit = (field: string) => {
    setEditing(prev => ({ ...prev, [field]: true }));
  };
  
  const handleSave = (field: string) => {
    setEditing(prev => ({ ...prev, [field]: false }));
  };
  
  const handleCancel = (field: string) => {
    setEditing(prev => ({ ...prev, [field]: false }));
  };
  
  const handleSaveAll = () => {
    setEditing({});
    
    // 模拟提高资料完整度
    if (profileCompletion < 100) {
      setProfileCompletion(Math.min(100, profileCompletion + 5));
    }
    
    toast.success("All changes saved successfully");
  };
  
  const saveField = async (field: string) => {
    setIsLoading(prev => ({ ...prev, [field]: true }));
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 保存成功后更新完整度
    if (profileCompletion < 100) {
      setProfileCompletion(Math.min(100, profileCompletion + 2));
    }
    
    setIsLoading(prev => ({ ...prev, [field]: false }));
    handleSave(field);
  };
  
  const value = {
    verificationStatus,
    verificationProgress,
    profileCompletion,
    companyName,
    setCompanyName,
    address,
    setAddress,
    industry,
    setIndustry,
    registrationId,
    setRegistrationId,
    phone,
    setPhone,
    email, 
    setEmail,
    editing,
    handleEdit,
    handleSave,
    handleCancel,
    handleSaveAll,
    saveField,
    isLoading
  };
  
  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
