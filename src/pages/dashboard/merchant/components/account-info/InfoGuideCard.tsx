
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface InfoGuideCardProps {
  handleSaveAll: () => void;
}

const InfoGuideCard: React.FC<InfoGuideCardProps> = ({ handleSaveAll }) => {
  return (
    <div className="relative">
      <Card className="h-full bg-[#061428]/70 border-blue-900/30 shadow-inner rounded-lg p-4 hover:shadow-md hover:shadow-blue-900/20 transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl"></div>
        <div className="flex flex-col h-full justify-between relative z-10">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">账户信息更新说明</h3>
            <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
              <li>点击编辑按钮可修改相应信息</li>
              <li>企业基本信息变更需提供相关证明材料</li>
              <li>联系人信息变更将立即生效</li>
              <li>为确保账户安全，重要信息变更可能需要验证</li>
            </ul>
          </div>
          
          <Button 
            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-none text-white shadow-md shadow-blue-600/20"
            onClick={handleSaveAll}
          >
            <Save className="h-4 w-4 mr-2" />
            保存所有更改
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InfoGuideCard;
