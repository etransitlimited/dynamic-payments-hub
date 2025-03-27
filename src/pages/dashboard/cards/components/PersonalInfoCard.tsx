
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle, Phone, Calendar } from "lucide-react";
import { AlertCircle } from "lucide-react";

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
          <div className="space-y-2">
            <Label className="text-sm font-medium text-blue-200">姓名</Label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
              <Input 
                id="name"
                placeholder="请输入真实姓名" 
                className={`pl-10 bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40 focus:border-blue-700/70 transition-colors ${errors.name ? 'border-red-500' : ''}`}
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <div className="flex items-center mt-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-blue-200">手机号码</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
              <Input 
                id="phone"
                placeholder="请输入手机号码" 
                className={`pl-10 bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40 focus:border-blue-700/70 transition-colors ${errors.phone ? 'border-red-500' : ''}`}
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && (
                <div className="flex items-center mt-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-blue-200">身份证号</Label>
            <Input 
              id="idCard"
              placeholder="请输入身份证号" 
              className={`bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40 focus:border-blue-700/70 transition-colors ${errors.idCard ? 'border-red-500' : ''}`}
              value={formData.idCard}
              onChange={handleInputChange}
            />
            {errors.idCard && (
              <div className="flex items-center mt-1 text-xs text-red-400">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>{errors.idCard}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-blue-200">出生日期</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
              <Input 
                id="birthDate"
                type="date" 
                className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white focus:border-blue-700/70 transition-colors" 
                value={formData.birthDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-blue-200">住址</Label>
          <Input 
            id="address"
            placeholder="请输入详细住址" 
            className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40 focus:border-blue-700/70 transition-colors" 
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
