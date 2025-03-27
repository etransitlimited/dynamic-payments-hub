
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const AccountInfo = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">帐号信息</h1>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">基本信息</CardTitle>
          <CardDescription className="text-blue-200/80">查看和更新您的个人信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="account-id" className="text-white">账户ID</Label>
              <Input 
                id="account-id" 
                value="M10058" 
                readOnly 
                className="bg-[#061428]/80 border-blue-900/50 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="account-type" className="text-white">账户类型</Label>
              <Input 
                id="account-type" 
                value="企业账户" 
                readOnly 
                className="bg-[#061428]/80 border-blue-900/50 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-white">公司名称</Label>
              <Input 
                id="company-name" 
                defaultValue="北京优卡科技有限公司" 
                className="bg-[#061428]/50 border-blue-900/50 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registration-date" className="text-white">注册日期</Label>
              <Input 
                id="registration-date" 
                value="2023-08-15" 
                readOnly 
                className="bg-[#061428]/80 border-blue-900/50 text-white"
              />
            </div>
          </div>
          
          <Separator className="bg-blue-900/30" />
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">电子邮箱</Label>
            <Input 
              id="email" 
              type="email" 
              defaultValue="contact@example.com" 
              className="bg-[#061428]/50 border-blue-900/50 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">联系电话</Label>
            <Input 
              id="phone" 
              defaultValue="13800138000" 
              className="bg-[#061428]/50 border-blue-900/50 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="text-white">公司地址</Label>
            <Input 
              id="address" 
              defaultValue="北京市海淀区科技园区88号" 
              className="bg-[#061428]/50 border-blue-900/50 text-white"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700">保存更改</Button>
        </CardFooter>
      </Card>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">更改密码</CardTitle>
          <CardDescription className="text-blue-200/80">更新您的账户密码</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-white">当前密码</Label>
            <Input 
              id="current-password" 
              type="password" 
              className="bg-[#061428]/50 border-blue-900/50 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-white">新密码</Label>
            <Input 
              id="new-password" 
              type="password" 
              className="bg-[#061428]/50 border-blue-900/50 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-white">确认新密码</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              className="bg-[#061428]/50 border-blue-900/50 text-white"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700">更新密码</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountInfo;
