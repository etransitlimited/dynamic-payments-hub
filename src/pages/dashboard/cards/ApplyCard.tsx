
import React, { useState } from "react";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PageHeader from "../merchant/components/PageHeader";
import PersonalInfoCard from "./components/PersonalInfoCard";
import ApplicationInfoCard from "./components/ApplicationInfoCard";
import CardInfoSection from "./components/CardInfoSection";

const ApplyCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    idCard: "",
    birthDate: "",
    address: "",
    cardType: "",
    currency: "",
    mailingAddress: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const requiredFields = ['name', 'phone', 'idCard', 'cardType', 'mailingAddress'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error("请填写必要信息", {
        description: "请确保您已填写所有必填字段",
      });
      return;
    }
    
    toast.success("申请已提交", {
      description: "我们将尽快处理您的卡片申请",
    });
  };

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageHeader 
        title="申请卡片" 
        description="填写申请信息获取您的专属卡片"
      >
        <CreditCard className="text-purple-400" />
      </PageHeader>
      
      <Alert className="bg-purple-900/20 border-purple-800/50 text-purple-300 mb-6">
        <AlertDescription>
          请确保填写真实有效的个人信息，以便我们能够顺利处理您的申请。审核通过后，卡片将在5-7个工作日内寄出。
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PersonalInfoCard 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        <ApplicationInfoCard />
      </div>
      
      <CardInfoSection 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ApplyCard;
