
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Building2, Edit, CheckCircle, X, Save } from "lucide-react";

interface CompanyInfoProps {
  editing: Record<string, boolean>;
  handleEdit: (field: string) => void;
  handleSave: (field: string) => void;
  handleCancel: (field: string) => void;
  handleSaveAll: () => void;  // Added this missing prop
}

const CompanyInfoSection = ({
  editing,
  handleEdit,
  handleSave,
  handleCancel,
  handleSaveAll  // Added this parameter
}: CompanyInfoProps) => {
  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 overflow-hidden">
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
                      readOnly={!editing['company-name']}
                      className={`bg-[#061428] border-blue-900/50 text-white ${editing['company-name'] ? 'border-blue-400 ring-1 ring-blue-400/50' : ''}`}
                    />
                    {!editing['company-name'] ? (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
                        onClick={() => handleEdit('company-name')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex ml-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-green-400 hover:bg-green-900/30 hover:text-green-300"
                          onClick={() => handleSave('company-name')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-400 hover:bg-red-900/30 hover:text-red-300"
                          onClick={() => handleCancel('company-name')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="business-license" className="text-white">营业执照号</Label>
                  <div className="flex items-center">
                    <Input 
                      id="business-license" 
                      value="91110105MA00F4XL9B" 
                      readOnly={!editing['business-license']}
                      className={`bg-[#061428] border-blue-900/50 text-white ${editing['business-license'] ? 'border-blue-400 ring-1 ring-blue-400/50' : ''}`}
                    />
                    {!editing['business-license'] ? (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
                        onClick={() => handleEdit('business-license')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex ml-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-green-400 hover:bg-green-900/30 hover:text-green-300"
                          onClick={() => handleSave('business-license')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-400 hover:bg-red-900/30 hover:text-red-300"
                          onClick={() => handleCancel('business-license')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tax-id" className="text-white">统一社会信用代码</Label>
                  <div className="flex items-center">
                    <Input 
                      id="tax-id" 
                      value="91110105MA00F4XL9B" 
                      readOnly={!editing['tax-id']}
                      className={`bg-[#061428] border-blue-900/50 text-white ${editing['tax-id'] ? 'border-blue-400 ring-1 ring-blue-400/50' : ''}`}
                    />
                    {!editing['tax-id'] ? (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
                        onClick={() => handleEdit('tax-id')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex ml-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-green-400 hover:bg-green-900/30 hover:text-green-300"
                          onClick={() => handleSave('tax-id')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-400 hover:bg-red-900/30 hover:text-red-300"
                          onClick={() => handleCancel('tax-id')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
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
                      readOnly={!editing['address']}
                      className={`bg-[#061428] border-blue-900/50 text-white ${editing['address'] ? 'border-blue-400 ring-1 ring-blue-400/50' : ''}`}
                    />
                    {!editing['address'] ? (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
                        onClick={() => handleEdit('address')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex ml-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-green-400 hover:bg-green-900/30 hover:text-green-300"
                          onClick={() => handleSave('address')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-400 hover:bg-red-900/30 hover:text-red-300"
                          onClick={() => handleCancel('address')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-white">所属行业</Label>
                  <div className="flex items-center">
                    <Input 
                      id="industry" 
                      value="金融科技" 
                      readOnly={!editing['industry']}
                      className={`bg-[#061428] border-blue-900/50 text-white ${editing['industry'] ? 'border-blue-400 ring-1 ring-blue-400/50' : ''}`}
                    />
                    {!editing['industry'] ? (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="ml-2 text-blue-400 hover:bg-blue-900/30 hover:text-blue-300"
                        onClick={() => handleEdit('industry')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex ml-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-green-400 hover:bg-green-900/30 hover:text-green-300"
                          onClick={() => handleSave('industry')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-400 hover:bg-red-900/30 hover:text-red-300"
                          onClick={() => handleCancel('industry')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-date" className="text-white">注册日期</Label>
                  <div className="flex items-center">
                    <Input 
                      id="register-date" 
                      value="2020-05-18" 
                      readOnly
                      className="bg-[#061428] border-blue-900/50 text-white opacity-80"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="ml-2 text-blue-400/50 cursor-not-allowed"
                      disabled
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Add Save All button at the bottom */}
        <div className="mt-6 flex justify-end">
          <Button 
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-none text-white shadow-md shadow-blue-600/20"
            onClick={handleSaveAll}
          >
            <Save className="h-4 w-4 mr-2" />
            保存所有更改
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoSection;
