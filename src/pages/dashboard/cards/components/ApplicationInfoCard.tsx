
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

const ApplicationInfoCard: React.FC = () => {
  return (
    <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-blue-500/20 p-2 rounded-full mr-2">
            <Info size={18} className="text-blue-400" />
          </span>
          申请说明
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-blue-200/80 list-disc pl-5">
          <li>请确保提供的个人信息真实有效</li>
          <li>身份证信息将用于实名认证</li>
          <li>申请审核通常需要1-3个工作日</li>
          <li>审核通过后，卡片将在5-7个工作日内寄出</li>
          <li>首次申请免收工本费</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ApplicationInfoCard;
