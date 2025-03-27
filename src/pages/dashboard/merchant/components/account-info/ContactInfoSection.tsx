
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Phone, Mail, Edit, CheckCircle, X, Save } from "lucide-react";

interface ContactInfoProps {
  editing: Record<string, boolean>;
  handleEdit: (field: string) => void;
  handleSave: (field: string) => void;
  handleCancel: (field: string) => void;
  handleSaveAll: () => void;
}

const ContactInfoSection = ({
  editing,
  handleEdit,
  handleSave,
  handleCancel,
  handleSaveAll
}: ContactInfoProps) => {
  return (
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
                    readOnly={!editing['contact-name']}
                    className={`bg-[#061428] border-blue-900/50 text-white ${editing['contact-name'] ? 'border-blue-400 ring-1 ring-blue-400/50' : ''}`}
                  />
                  {!editing['contact-name'] ? (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
                      onClick={() => handleEdit('contact-name')}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="flex ml-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-green-400 hover:bg-green-900/30 hover:text-green-300"
                        onClick={() => handleSave('contact-name')}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-400 hover:bg-red-900/30 hover:text-red-300"
                        onClick={() => handleCancel('contact-name')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
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
                      readOnly={!editing['contact-phone']}
                      className={`rounded-l-none bg-[#061428] border-blue-900/50 text-white ${editing['contact-phone'] ? 'border-blue-400 ring-1 ring-blue-400/50' : ''}`}
                    />
                  </div>
                  {!editing['contact-phone'] ? (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
                      onClick={() => handleEdit('contact-phone')}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="flex ml-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-green-400 hover:bg-green-900/30 hover:text-green-300"
                        onClick={() => handleSave('contact-phone')}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-400 hover:bg-red-900/30 hover:text-red-300"
                        onClick={() => handleCancel('contact-phone')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
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
                      readOnly={!editing['contact-email']}
                      className={`rounded-l-none bg-[#061428] border-blue-900/50 text-white ${editing['contact-email'] ? 'border-blue-400 ring-1 ring-blue-400/50' : ''}`}
                    />
                  </div>
                  {!editing['contact-email'] ? (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
                      onClick={() => handleEdit('contact-email')}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="flex ml-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-green-400 hover:bg-green-900/30 hover:text-green-300"
                        onClick={() => handleSave('contact-email')}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-400 hover:bg-red-900/30 hover:text-red-300"
                        onClick={() => handleCancel('contact-email')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoSection;
