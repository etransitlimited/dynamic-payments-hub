
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, UserCircle, Phone, Check, Info, AlertCircle } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ApplyCard = () => {
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-purple-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">申请卡片</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-purple-500/20 p-2 rounded-full mr-2">
                <CreditCard size={18} className="text-purple-400" />
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
                <label className="text-sm font-medium text-blue-200">姓名</label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                  <Input 
                    placeholder="请输入真实姓名" 
                    className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-200">手机号码</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                  <Input 
                    placeholder="请输入手机号码" 
                    className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-200">身份证号</label>
                <Input 
                  placeholder="请输入身份证号" 
                  className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-200">出生日期</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                  <Input 
                    type="date" 
                    className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white" 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">住址</label>
              <Input 
                placeholder="请输入详细住址" 
                className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
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
      </div>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
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
              <label className="text-sm font-medium text-blue-200">卡片类型</label>
              <Select>
                <SelectTrigger className="bg-[#061428]/70 border-blue-900/50 text-white">
                  <SelectValue placeholder="请选择卡片类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">标准卡</SelectItem>
                  <SelectItem value="gold">金卡</SelectItem>
                  <SelectItem value="platinum">白金卡</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">卡片币种</label>
              <Select>
                <SelectTrigger className="bg-[#061428]/70 border-blue-900/50 text-white">
                  <SelectValue placeholder="请选择币种" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cny">人民币 (CNY)</SelectItem>
                  <SelectItem value="usd">美元 (USD)</SelectItem>
                  <SelectItem value="eur">欧元 (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-200">邮寄地址</label>
            <Input 
              placeholder="请输入卡片邮寄地址" 
              className="bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40" 
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
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Check className="h-4 w-4" />
              <span>提交申请</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApplyCard;
