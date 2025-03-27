
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Building2, User, Phone, Mail, Edit } from "lucide-react";

const AccountInfo = () => {
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">账户信息</h1>
      </div>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <Building2 size={18} className="text-blue-400" />
            </span>
            企业基本信息
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            查看和管理您的企业账户基本信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name" className="text-white">企业名称</Label>
                    <div className="flex items-center">
                      <Input 
                        id="company-name" 
                        value="北京优卡科技有限公司" 
                        readOnly 
                        className="bg-[#061428] border-blue-900/50 text-white"
                      />
                      <Button variant="ghost" size="icon" className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="business-license" className="text-white">营业执照号</Label>
                    <div className="flex items-center">
                      <Input 
                        id="business-license" 
                        value="91110105MA00F4XL9B" 
                        readOnly 
                        className="bg-[#061428] border-blue-900/50 text-white"
                      />
                      <Button variant="ghost" size="icon" className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tax-id" className="text-white">统一社会信用代码</Label>
                    <div className="flex items-center">
                      <Input 
                        id="tax-id" 
                        value="91110105MA00F4XL9B" 
                        readOnly 
                        className="bg-[#061428] border-blue-900/50 text-white"
                      />
                      <Button variant="ghost" size="icon" className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div>
              <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">企业地址</Label>
                    <div className="flex items-center">
                      <Input 
                        id="address" 
                        value="北京市海淀区中关村大街1号" 
                        readOnly 
                        className="bg-[#061428] border-blue-900/50 text-white"
                      />
                      <Button variant="ghost" size="icon" className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-white">所属行业</Label>
                    <div className="flex items-center">
                      <Input 
                        id="industry" 
                        value="金融科技" 
                        readOnly 
                        className="bg-[#061428] border-blue-900/50 text-white"
                      />
                      <Button variant="ghost" size="icon" className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-date" className="text-white">注册日期</Label>
                    <div className="flex items-center">
                      <Input 
                        id="register-date" 
                        value="2020-05-18" 
                        readOnly 
                        className="bg-[#061428] border-blue-900/50 text-white"
                      />
                      <Button variant="ghost" size="icon" className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-green-500/20 p-2 rounded-full mr-2">
              <User size={18} className="text-green-400" />
            </span>
            联系人信息
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            管理企业联系人信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-white">联系人姓名</Label>
                  <div className="flex items-center">
                    <Input 
                      id="contact-name" 
                      value="张经理" 
                      readOnly 
                      className="bg-[#061428] border-blue-900/50 text-white"
                    />
                    <Button variant="ghost" size="icon" className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-phone" className="text-white">联系电话</Label>
                  <div className="flex items-center">
                    <div className="flex items-center w-full">
                      <span className="bg-[#061428] px-3 py-2 rounded-l-md border border-r-0 border-blue-900/50 text-white">
                        <Phone className="h-4 w-4 text-blue-400" />
                      </span>
                      <Input 
                        id="contact-phone" 
                        value="13800138000" 
                        readOnly 
                        className="rounded-l-none bg-[#061428] border-blue-900/50 text-white"
                      />
                    </div>
                    <Button variant="ghost" size="icon" className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-white">电子邮箱</Label>
                  <div className="flex items-center">
                    <div className="flex items-center w-full">
                      <span className="bg-[#061428] px-3 py-2 rounded-l-md border border-r-0 border-blue-900/50 text-white">
                        <Mail className="h-4 w-4 text-blue-400" />
                      </span>
                      <Input 
                        id="contact-email" 
                        value="contact@example.com" 
                        readOnly 
                        className="rounded-l-none bg-[#061428] border-blue-900/50 text-white"
                      />
                    </div>
                    <Button variant="ghost" size="icon" className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="p-4 bg-[#061428]/70 rounded-lg border border-blue-900/30">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">账户信息更新说明</h3>
                  <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
                    <li>点击编辑按钮可修改相应信息</li>
                    <li>企业基本信息变更需提供相关证明材料</li>
                    <li>联系人信息变更将立即生效</li>
                    <li>为确保账户安全，重要信息变更可能需要验证</li>
                  </ul>
                </div>
                
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
                  保存所有更改
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountInfo;
