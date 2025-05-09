import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Upload, Check, X, AlertCircle, Info, Building, User } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useAccount } from "@/context/AccountContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VerificationStepper from "@/modules/verification/components/VerificationStepper";
import VerificationForm from "@/modules/verification/components/VerificationForm";

const VerificationTab: React.FC = () => {
  // 保持原有状态
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "rejected" | "not_started">("pending");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { verificationType, setVerificationType } = useAccount();
  
  // 添加步骤相关状态
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // 步骤定义
  const steps = ["basicInfo", "contactInfo", "documentUpload", "review"];
  
  // 处理步骤变化
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
    
    // 更新验证进度
    const newProgress = Math.min(100, ((completedSteps.length + 1) / steps.length) * 100);
    setUploadProgress(newProgress);
  };
  
  // 提交验证
  const handleRequestVerification = () => {
    toast.success("Verification request submitted");
    setVerificationStatus("pending");
  };

  const getVerificationStatusBadge = () => {
    switch (verificationStatus) {
      case "verified":
        return (
          <div className="flex items-center px-3 py-1 bg-green-500/20 text-green-300 rounded-full">
            <Check className="h-4 w-4 mr-1" />
            <TranslatedText keyName="accountInfo.verified" fallback="Verified" />
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full">
            <Info className="h-4 w-4 mr-1" />
            <TranslatedText keyName="accountInfo.pending" fallback="Pending" />
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center px-3 py-1 bg-red-500/20 text-red-300 rounded-full">
            <X className="h-4 w-4 mr-1" />
            <TranslatedText keyName="accountInfo.rejected" fallback="Rejected" />
          </div>
        );
      default:
        return (
          <div className="flex items-center px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
            <AlertCircle className="h-4 w-4 mr-1" />
            <TranslatedText keyName="accountInfo.notVerified" fallback="Not Verified" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-white">
            <TranslatedText keyName="accountInfo.identityVerification" fallback="Identity Verification" />
          </h2>
          {getVerificationStatusBadge()}
        </div>
        <p className="text-gray-400 mb-6">
          <TranslatedText 
            keyName="accountInfo.verificationDescription" 
            fallback="To comply with regulations and ensure account security, we require verification of your identity." 
          />
        </p>

        <Tabs 
          value={verificationType} 
          onValueChange={(value) => {
            setVerificationType(value as "personal" | "enterprise");
            // 切换类型时重置步骤
            setCurrentStep(0);
            setCompletedSteps([]);
          }}
          className="mb-6"
        >
          <TabsList className="grid grid-cols-2 gap-2 w-full max-w-md mx-auto mb-6">
            <TabsTrigger 
              value="personal"
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              <TranslatedText keyName="accountInfo.verification.personal" fallback="Personal" />
            </TabsTrigger>
            <TabsTrigger 
              value="enterprise"
              className="data-[state=active]:bg-purple-700 data-[state=active]:text-white flex items-center gap-2"
            >
              <Building className="h-4 w-4" />
              <TranslatedText keyName="accountInfo.verification.enterprise" fallback="Enterprise" />
            </TabsTrigger>
          </TabsList>
          
          <Card className="border border-blue-800/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/40 p-5 mb-6">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              {verificationType === "personal" ? 
                <User className="h-5 w-5 mr-2 text-blue-400" /> : 
                <Building className="h-5 w-5 mr-2 text-blue-400" />
              }
              <TranslatedText 
                keyName={`verification_${verificationType}_title`} 
                fallback={verificationType === "personal" ? "Personal Verification" : "Business Verification"} 
              />
            </h3>
            
            <p className="text-gray-400 mb-6">
              <TranslatedText 
                keyName={`verification_${verificationType}_description`} 
                fallback={verificationType === "personal" ? 
                  "Please verify your identity as an individual account holder." : 
                  "Please verify your company's legal status and business details."} 
              />
            </p>

            {/* 确保步骤栏和表单并排展示 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* 表单部分 - 占据更多列 */}
              <div className="md:col-span-8">
                <VerificationForm 
                  type={verificationType}
                  step={currentStep}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                  onStepComplete={handleStepComplete}
                />
              </div>
              
              {/* 步骤栏部分 - 右侧固定宽度 */}
              <div className="md:col-span-4">
                <div className="sticky top-4">
                  {/* 进度指示器 */}
                  <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-200 mb-3">
                      <TranslatedText keyName="accountInfo.verificationProgress" fallback="Verification Progress" />
                    </h4>
                    
                    <Progress 
                      value={uploadProgress} 
                      className="h-2 mb-4 bg-blue-900/40" 
                      indicatorClassName="bg-blue-500" 
                    />
                    
                    <div className="text-sm text-right text-blue-300">
                      {uploadProgress}%
                    </div>
                  </div>
                  
                  {/* 步骤导航 */}
                  <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-200 mb-3">
                      <TranslatedText keyName="verification_steps" fallback="Verification Steps" />
                    </h4>
                    
                    <VerificationStepper 
                      steps={steps}
                      currentStep={currentStep}
                      completedSteps={completedSteps}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Tabs>

        <div className="text-sm text-gray-400 flex items-start">
          <Info className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
          <TranslatedText 
            keyName="accountInfo.privacyNotice" 
            fallback="Your information is encrypted and secured with enterprise-grade security. We comply with all data protection regulations." 
          />
        </div>
      </div>
    </div>
  );
};

export default VerificationTab;
