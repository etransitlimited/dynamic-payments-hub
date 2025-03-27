
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCard, Check, AlertCircle } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CardInfoSectionProps {
  formData: {
    cardType: string;
    currency: string;
    mailingAddress: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: () => void;
}

const CardInfoSection: React.FC<CardInfoSectionProps> = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange,
  handleSubmit 
}) => {
  return (
    <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-purple-500/20 p-2 rounded-full mr-2">
            <CreditCard size={18} className="text-purple-400" />
          </span>
          卡片信息
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          选择您想申请的卡片类型
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-blue-200">卡片类型</Label>
            <Select 
              value={formData.cardType} 
              onValueChange={(value) => handleSelectChange("cardType", value)}
            >
              <SelectTrigger className="bg-[#061428]/70 border-blue-900/50 text-white focus:border-blue-700/70 transition-colors">
                <SelectValue placeholder="请选择卡片类型" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F2643] border-blue-900/50 text-white">
                <SelectItem value="standard" className="focus:bg-blue-900/40 focus:text-white">标准卡</SelectItem>
                <SelectItem value="gold" className="focus:bg-blue-900/40 focus:text-white">金卡</SelectItem>
                <SelectItem value="platinum" className="focus:bg-blue-900/40 focus:text-white">白金卡</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-blue-200">卡片币种</Label>
            <Select 
              value={formData.currency} 
              onValueChange={(value) => handleSelectChange("currency", value)}
            >
              <SelectTrigger className="bg-[#061428]/70 border-blue-900/50 text-white focus:border-blue-700/70 transition-colors">
                <SelectValue placeholder="请选择币种" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F2643] border-blue-900/50 text-white">
                <SelectItem value="cny" className="focus:bg-blue-900/40 focus:text-white">人民币 (CNY)</SelectItem>
                <SelectItem value="usd" className="focus:bg-blue-900/40 focus:text-white">美元 (USD)</SelectItem>
                <SelectItem value="eur" className="focus:bg-blue-900/40 focus:text-white">欧元 (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-blue-200">邮寄地址</Label>
          <Input 
            id="mailingAddress"
            placeholder="请输入卡片邮寄地址" 
            className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40 focus:border-blue-700/70 transition-colors" 
            value={formData.mailingAddress}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-200">
              请确保提供的地址准确无误，以免影响卡片寄送。地址变更请至少提前5个工作日通知客服。
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-blue-900/50 pt-4 mt-2">
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-end">
          <Button variant="outline" className="border-blue-600/60 text-white hover:bg-blue-900/20">
            保存草稿
          </Button>
          <Button 
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
          >
            <Check className="h-4 w-4" />
            <span>提交申请</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardInfoSection;
