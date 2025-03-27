
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { User, Lock, Building, Phone, Mail, MapPin, Shield, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const AccountInfo = () => {
  const handleSave = () => {
    toast({
      title: "更新成功",
      description: "您的账户信息已更新",
    });
  };

  const handlePasswordUpdate = () => {
    toast({
      title: "密码已更新",
      description: "您的密码已成功修改",
    });
  };

  return (
    <div className="space-y-6 bg-[#061428] min-h-screen p-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">账户信息</h1>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <div className="flex items-center mb-1">
            <User className="h-5 w-5 text-blue-400 mr-2" />
            <CardTitle className="text-white">基本信息</CardTitle>
          </div>
          <CardDescription className="text-blue-200/80">
            查看和更新您的个人信息
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="account-id" className="text-white flex items-center">
                <Shield className="h-4 w-4 text-blue-400 mr-1.5" />
                账户ID
              </Label>
              <div className="relative">
                <Input 
                  id="account-id" 
                  value="M10058" 
                  readOnly 
                  className="bg-[#061428]/80 border-blue-900/50 text-white pl-10"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-blue-500 text-xs">ID</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="account-type" className="text-white flex items-center">
                <Building className="h-4 w-4 text-blue-400 mr-1.5" />
                账户类型
              </Label>
              <div className="relative">
                <Input 
                  id="account-type" 
                  value="企业账户" 
                  readOnly 
                  className="bg-[#061428]/80 border-blue-900/50 text-white pl-10"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-purple-500 text-xs">PRO</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-white flex items-center">
                <Building className="h-4 w-4 text-blue-400 mr-1.5" />
                公司名称
              </Label>
              <Input 
                id="company-name" 
                defaultValue="北京优卡科技有限公司" 
                className="bg-[#061428]/50 border-blue-900/50 text-white focus:border-blue-500/50 focus:ring-blue-500/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registration-date" className="text-white flex items-center">
                <Clock className="h-4 w-4 text-blue-400 mr-1.5" />
                注册日期
              </Label>
              <Input 
                id="registration-date" 
                value="2023-08-15" 
                readOnly 
                className="bg-[#061428]/80 border-blue-900/50 text-white"
              />
            </div>
          </div>
          
          <div className="flex items-center my-2">
            <Separator className="flex-grow bg-blue-900/30" />
            <span className="px-3 text-sm text-blue-400">联系方式</span>
            <Separator className="flex-grow bg-blue-900/30" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white flex items-center">
              <Mail className="h-4 w-4 text-blue-400 mr-1.5" />
              电子邮箱
            </Label>
            <Input 
              id="email" 
              type="email" 
              defaultValue="contact@example.com" 
              className="bg-[#061428]/50 border-blue-900/50 text-white focus:border-blue-500/50 focus:ring-blue-500/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white flex items-center">
              <Phone className="h-4 w-4 text-blue-400 mr-1.5" />
              联系电话
            </Label>
            <Input 
              id="phone" 
              defaultValue="13800138000" 
              className="bg-[#061428]/50 border-blue-900/50 text-white focus:border-blue-500/50 focus:ring-blue-500/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="text-white flex items-center">
              <MapPin className="h-4 w-4 text-blue-400 mr-1.5" />
              公司地址
            </Label>
            <Input 
              id="address" 
              defaultValue="北京市海淀区科技园区88号" 
              className="bg-[#061428]/50 border-blue-900/50 text-white focus:border-blue-500/50 focus:ring-blue-500/30"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-2 border-t border-blue-900/30">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSave}
          >
            保存更改
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <div className="flex items-center mb-1">
            <Lock className="h-5 w-5 text-blue-400 mr-2" />
            <CardTitle className="text-white">安全设置</CardTitle>
          </div>
          <CardDescription className="text-blue-200/80">
            更新您的账户密码和安全选项
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="p-3 rounded-lg bg-[#061428]/50 border border-blue-900/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-400 mr-1.5" />
                <span className="text-white font-medium">账户安全级别</span>
              </div>
              <span className="bg-green-600/20 text-green-300 px-2 py-0.5 rounded-full text-xs font-medium">
                良好
              </span>
            </div>
            <div className="w-full bg-blue-900/30 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "70%" }}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-white flex items-center">
                <Lock className="h-4 w-4 text-blue-400 mr-1.5" />
                当前密码
              </Label>
              <Input 
                id="current-password" 
                type="password" 
                className="bg-[#061428]/50 border-blue-900/50 text-white focus:border-blue-500/50 focus:ring-blue-500/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-white flex items-center">
                <Lock className="h-4 w-4 text-blue-400 mr-1.5" />
                新密码
              </Label>
              <Input 
                id="new-password" 
                type="password" 
                className="bg-[#061428]/50 border-blue-900/50 text-white focus:border-blue-500/50 focus:ring-blue-500/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-white flex items-center">
                <Lock className="h-4 w-4 text-blue-400 mr-1.5" />
                确认新密码
              </Label>
              <Input 
                id="confirm-password" 
                type="password" 
                className="bg-[#061428]/50 border-blue-900/50 text-white focus:border-blue-500/50 focus:ring-blue-500/30"
              />
            </div>
            
            <div className="pt-1 text-xs text-blue-300/70">
              <p className="flex items-center mb-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5"></span>
                密码长度至少为8个字符
              </p>
              <p className="flex items-center mb-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5"></span>
                应包含大小写字母和数字
              </p>
              <p className="flex items-center">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5"></span>
                建议使用特殊字符提高安全性
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2 border-t border-blue-900/30">
          <Button variant="outline" className="border-blue-600/60 text-white hover:bg-blue-900/20">
            取消
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handlePasswordUpdate}
          >
            更新密码
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountInfo;
