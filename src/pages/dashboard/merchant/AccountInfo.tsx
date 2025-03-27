
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
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-green-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">账户信息</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <User size={18} className="text-blue-400" />
              </span>
              基本信息
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              查看和更新您的个人信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <Label htmlFor="account-id" className="text-white flex items-center mb-2">
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
              
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <Label htmlFor="account-type" className="text-white flex items-center mb-2">
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
              
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <Label htmlFor="company-name" className="text-white flex items-center mb-2">
                  <Building className="h-4 w-4 text-blue-400 mr-1.5" />
                  公司名称
                </Label>
                <Input 
                  id="company-name" 
                  defaultValue="北京优卡科技有限公司" 
                  className="bg-[#061428]/50 border-blue-900/50 text-white focus:border-blue-500/50 focus:ring-blue-500/30"
                />
              </div>
              
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <Label htmlFor="registration-date" className="text-white flex items-center mb-2">
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
            
            <div className="mt-6">
              <div className="flex items-center mb-3">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <h3 className="text-white text-md font-medium">联系方式</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                  <Label htmlFor="email" className="text-white flex items-center mb-2">
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
                
                <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                  <Label htmlFor="phone" className="text-white flex items-center mb-2">
                    <Phone className="h-4 w-4 text-blue-400 mr-1.5" />
                    联系电话
                  </Label>
                  <Input 
                    id="phone" 
                    defaultValue="13800138000" 
                    className="bg-[#061428]/50 border-blue-900/50 text-white focus:border-blue-500/50 focus:ring-blue-500/30"
                  />
                </div>
                
                <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 md:col-span-2">
                  <Label htmlFor="address" className="text-white flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-blue-400 mr-1.5" />
                    公司地址
                  </Label>
                  <Input 
                    id="address" 
                    defaultValue="北京市海淀区科技园区88号" 
                    className="bg-[#061428]/50 border-blue-900/50 text-white focus:border-blue-500/50 focus:ring-blue-500/30"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end pt-4 border-t border-blue-900/30">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleSave}
            >
              保存更改
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-green-500/20 p-2 rounded-full mr-2">
                <Shield size={18} className="text-green-400" />
              </span>
              安全状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 rounded-lg bg-[#061428]/50 border border-blue-900/30 mb-4">
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
            
            <div className="space-y-2 text-blue-200/80 list-disc pl-5 text-sm mb-4">
              <p className="flex items-center mb-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5"></span>
                邮箱已验证
              </p>
              <p className="flex items-center mb-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5"></span>
                手机已绑定
              </p>
              <p className="flex items-center">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1.5"></span>
                建议定期更改密码
              </p>
            </div>
            
            <div className="flex items-center mb-3 mt-6">
              <Lock className="h-5 w-5 text-blue-400 mr-2" />
              <h3 className="text-white text-md font-medium">密码更新</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <Label htmlFor="current-password" className="text-white flex items-center mb-2">
                  <Lock className="h-4 w-4 text-blue-400 mr-1.5" />
                  当前密码
                </Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  className="bg-[#061428]/50 border-blue-900/50 text-white focus:border-blue-500/50 focus:ring-blue-500/30"
                />
              </div>
              
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <Label htmlFor="new-password" className="text-white flex items-center mb-2">
                  <Lock className="h-4 w-4 text-blue-400 mr-1.5" />
                  新密码
                </Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  className="bg-[#061428]/50 border-blue-900/50 text-white focus:border-blue-500/50 focus:ring-blue-500/30"
                />
              </div>
              
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <Label htmlFor="confirm-password" className="text-white flex items-center mb-2">
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
          <CardFooter className="justify-end pt-4 border-t border-blue-900/30">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handlePasswordUpdate}
            >
              更新密码
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AccountInfo;
