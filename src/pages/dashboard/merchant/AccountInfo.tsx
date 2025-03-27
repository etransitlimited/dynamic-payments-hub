
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Building2, User, Phone, Mail, Edit, Save } from "lucide-react";
import PageHeader from "./components/PageHeader";

const AccountInfo = () => {
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageHeader title="账户信息" />
      
      <Card className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
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
        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Card className="bg-[#061428]/70 border-blue-900/30 shadow-inner rounded-lg p-4 hover:shadow-md hover:shadow-blue-900/20 transition-all duration-300">
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
              <Card className="bg-[#061428]/70 border-blue-900/30 shadow-inner rounded-lg p-4 hover:shadow-md hover:shadow-blue-900/20 transition-all duration-300">
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
      
      <Card className="bg-gradient-to-br from-[#0F2643]/90 to-[#091B34]/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
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
        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#061428]/70 border-blue-900/30 shadow-inner rounded-lg p-4 hover:shadow-md hover:shadow-blue-900/20 transition-all duration-300">
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
                  
                  <Button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-none text-white shadow-md shadow-blue-600/20">
                    <Save className="h-4 w-4 mr-2" />
                    保存所有更改
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountInfo;
