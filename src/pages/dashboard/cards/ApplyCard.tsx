
import React, { useState } from "react";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction 
} from "@/components/ui/alert-dialog";
import PageHeader from "../merchant/components/PageHeader";
import PersonalInfoCard from "./components/PersonalInfoCard";
import ApplicationInfoCard from "./components/ApplicationInfoCard";
import CardInfoSection from "./components/CardInfoSection";

const ApplyCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    idCard: "",
    birthDate: "",
    address: "",
    cardType: "",
    currency: "",
    mailingAddress: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Validate field on change
    validateField(id, value);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field on change
    validateField(name, value);
  };

  const validateField = (field: string, value: string) => {
    let newErrors = { ...errors };
    
    switch(field) {
      case 'name':
        if (!value) {
          newErrors.name = "姓名不能为空";
        } else if (value.length < 2) {
          newErrors.name = "姓名至少需要2个字符";
        } else {
          delete newErrors.name;
        }
        break;
      case 'phone':
        if (!value) {
          newErrors.phone = "手机号码不能为空";
        } else if (!/^1[3-9]\d{9}$/.test(value)) {
          newErrors.phone = "请输入有效的手机号码";
        } else {
          delete newErrors.phone;
        }
        break;
      case 'idCard':
        if (!value) {
          newErrors.idCard = "身份证号不能为空";
        } else if (!/^\d{17}[\dXx]$/.test(value)) {
          newErrors.idCard = "请输入有效的身份证号";
        } else {
          delete newErrors.idCard;
        }
        break;
      case 'cardType':
        if (!value) {
          newErrors.cardType = "请选择卡片类型";
        } else {
          delete newErrors.cardType;
        }
        break;
      case 'mailingAddress':
        if (!value) {
          newErrors.mailingAddress = "邮寄地址不能为空";
        } else if (value.length < 10) {
          newErrors.mailingAddress = "请输入详细的邮寄地址";
        } else {
          delete newErrors.mailingAddress;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const validateForm = () => {
    const requiredFields = ['name', 'phone', 'idCard', 'cardType', 'mailingAddress'];
    let newErrors: Record<string, string> = {};
    let isValid = true;
    
    requiredFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      if (!value) {
        newErrors[field] = `${fieldNames[field] || field}不能为空`;
        isValid = false;
      } else {
        // Call field-specific validation
        validateField(field, value);
      }
    });
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid && Object.keys(errors).length === 0;
  };
  
  const fieldNames: Record<string, string> = {
    name: "姓名",
    phone: "手机号码",
    idCard: "身份证号",
    cardType: "卡片类型",
    mailingAddress: "邮寄地址"
  };

  const handleSubmitRequest = () => {
    if (validateForm()) {
      setIsDialogOpen(true);
    } else {
      toast.error("请填写必要信息", {
        description: "请确保您已正确填写所有必填字段",
      });
    }
  };

  const confirmSubmit = () => {
    setIsDialogOpen(false);
    toast.success("申请已提交", {
      description: "我们将尽快处理您的卡片申请",
    });
  };

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageHeader 
        title="申请卡片" 
        description="填写申请信息获取您的专属卡片"
      >
        <CreditCard className="text-purple-400" />
      </PageHeader>
      
      <Alert className="bg-purple-900/20 border-purple-800/50 text-purple-300 mb-6">
        <AlertDescription>
          请确保填写真实有效的个人信息，以便我们能够顺利处理您的申请。审核通过后，卡片将在5-7个工作日内寄出。
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PersonalInfoCard 
          formData={formData} 
          handleInputChange={handleInputChange} 
          errors={errors}
        />
        <ApplicationInfoCard />
      </div>
      
      <CardInfoSection 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleSubmit={handleSubmitRequest}
        errors={errors}
      />

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-[#0F2643] border-blue-900/50 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">确认提交申请</AlertDialogTitle>
            <AlertDialogDescription className="text-blue-200/80">
              您即将提交卡片申请。请确认以下信息无误：
              <ul className="mt-2 space-y-1">
                <li>• 姓名：{formData.name}</li>
                <li>• 手机号码：{formData.phone}</li>
                <li>• 身份证号：{formData.idCard}</li>
                <li>• 卡片类型：{
                  formData.cardType === 'standard' ? '标准卡' : 
                  formData.cardType === 'gold' ? '金卡' : 
                  formData.cardType === 'platinum' ? '白金卡' : ''
                }</li>
                <li>• 币种：{
                  formData.currency === 'cny' ? '人民币 (CNY)' : 
                  formData.currency === 'usd' ? '美元 (USD)' : 
                  formData.currency === 'eur' ? '欧元 (EUR)' : '未选择'
                }</li>
                <li>• 邮寄地址：{formData.mailingAddress}</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-blue-600/60 text-white hover:bg-blue-900/20">取消</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={confirmSubmit}
            >
              确认提交
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ApplyCard;
