
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const ApplyCard = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-6 text-white">申请卡片</h1>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">卡片申请表单</CardTitle>
          <CardDescription className="text-blue-200/80">
            请填写申请卡片所需的信息
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-type" className="text-white">卡片类型</Label>
            <Select>
              <SelectTrigger id="card-type" className="bg-[#061428]/50 border-blue-900/50 text-white">
                <SelectValue placeholder="选择卡片类型" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F2643] border-blue-900/50 text-white">
                <SelectItem value="standard">标准卡</SelectItem>
                <SelectItem value="gold">金卡</SelectItem>
                <SelectItem value="platinum">白金卡</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardholder-name" className="text-white">持卡人姓名</Label>
            <Input 
              id="cardholder-name" 
              placeholder="请输入持卡人姓名" 
              className="bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">联系电话</Label>
            <Input 
              id="phone" 
              placeholder="请输入联系电话" 
              className="bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">电子邮件</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="请输入电子邮件" 
              className="bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="purpose" className="text-white">申请用途</Label>
            <Textarea 
              id="purpose" 
              placeholder="请简要说明申请用途" 
              rows={3} 
              className="bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="border-blue-600 text-white hover:bg-blue-900/20">取消</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">提交申请</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApplyCard;
