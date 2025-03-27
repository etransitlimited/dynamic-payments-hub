
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
      <h1 className="text-2xl font-bold tracking-tight mb-6">申请卡片</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>卡片申请表单</CardTitle>
          <CardDescription>
            请填写申请卡片所需的信息
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-type">卡片类型</Label>
            <Select>
              <SelectTrigger id="card-type">
                <SelectValue placeholder="选择卡片类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">标准卡</SelectItem>
                <SelectItem value="gold">金卡</SelectItem>
                <SelectItem value="platinum">白金卡</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardholder-name">持卡人姓名</Label>
            <Input id="cardholder-name" placeholder="请输入持卡人姓名" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">联系电话</Label>
            <Input id="phone" placeholder="请输入联系电话" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">电子邮件</Label>
            <Input id="email" type="email" placeholder="请输入电子邮件" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="purpose">申请用途</Label>
            <Textarea id="purpose" placeholder="请简要说明申请用途" rows={3} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">取消</Button>
          <Button>提交申请</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApplyCard;
