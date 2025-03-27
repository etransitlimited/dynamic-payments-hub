
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, Phone, Calendar } from "lucide-react";
import FormField from "./FormField";

interface PersonalInfoCardProps {
  formData: {
    name: string;
    phone: string;
    idCard: string;
    birthDate: string;
    address: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ formData, handleInputChange, errors }) => {
  return (
    <Card className="lg:col-span-2 bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-purple-500/20 p-2 rounded-full mr-2">
            <UserCircle size={18} className="text-purple-400" />
          </span>
          个人信息
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          填写申请人的基本信息
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField 
            id="name"
            label="姓名"
            placeholder="请输入真实姓名"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            icon={<UserCircle />}
          />
          <FormField 
            id="phone"
            label="手机号码"
            placeholder="请输入手机号码"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            icon={<Phone />}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField 
            id="idCard"
            label="身份证号"
            placeholder="请输入身份证号"
            value={formData.idCard}
            onChange={handleInputChange}
            error={errors.idCard}
          />
          <FormField 
            id="birthDate"
            label="出生日期"
            type="date"
            value={formData.birthDate}
            onChange={handleInputChange}
            icon={<Calendar />}
          />
        </div>
        
        <FormField 
          id="address"
          label="住址"
          placeholder="请输入详细住址"
          value={formData.address}
          onChange={handleInputChange}
        />
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
