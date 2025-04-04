
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Upload, Check, X, AlertCircle, Info, Building, User } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useAccount } from "@/context/AccountContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VerificationTab: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "rejected" | "not_started">("pending");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { verificationType, setVerificationType } = useAccount();

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success("Document uploaded successfully");
          return 100;
        }
        return newProgress;
      });
    }, 400);
  };

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

  const enterpriseDocuments = [
    {
      id: "registration",
      title: "accountInfo.businessRegistration",
      titleFallback: "Business Registration Certificate",
      description: "accountInfo.businessRegistrationDesc",
      descriptionFallback: "Official business registration certificate issued by the government."
    },
    {
      id: "incorporation",
      title: "accountInfo.certificateIncorporation",
      titleFallback: "Certificate of Incorporation",
      description: "accountInfo.certificateIncorporationDesc",
      descriptionFallback: "Document confirming the company's legal formation."
    },
    {
      id: "id",
      title: "accountInfo.directorId",
      titleFallback: "Director's ID Document",
      description: "accountInfo.directorIdDesc",
      descriptionFallback: "Valid identification document of the company director."
    }
  ];

  const personalDocuments = [
    {
      id: "id",
      title: "accountInfo.verification.personalId",
      titleFallback: "Government-issued ID",
      description: "accountInfo.verification.personalIdDesc",
      descriptionFallback: "Valid passport, driver's license or national ID card."
    },
    {
      id: "address",
      title: "accountInfo.verification.addressProof",
      titleFallback: "Proof of Address",
      description: "accountInfo.verification.addressProofDesc",
      descriptionFallback: "Utility bill or bank statement issued within the last 3 months."
    },
    {
      id: "photo",
      title: "accountInfo.verification.selfiePhoto",
      titleFallback: "Selfie Photo",
      description: "accountInfo.verification.selfiePhotoDesc",
      descriptionFallback: "A clear photo of yourself holding your ID document."
    }
  ];

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
          onValueChange={(value) => setVerificationType(value as "personal" | "enterprise")}
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
                keyName={`accountInfo.verification.${verificationType}VerificationTitle`} 
                fallback={verificationType === "personal" ? "Personal Verification" : "Business Verification"} 
              />
            </h3>
            
            <p className="text-gray-400 mb-4">
              <TranslatedText 
                keyName={`accountInfo.verification.${verificationType}VerificationDesc`} 
                fallback={verificationType === "personal" ? 
                  "Please verify your identity as an individual account holder." : 
                  "Please verify your company's legal status and business details."} 
              />
            </p>

            <h3 className="text-lg font-medium text-white mb-4">
              <TranslatedText keyName="accountInfo.verificationProgress" fallback="Verification Progress" />
            </h3>
            
            <div className="space-y-4">
              {[
                { 
                  id: verificationType === "personal" ? "personal" : "company", 
                  title: verificationType === "personal" ? "accountInfo.verification.personalInfo" : "accountInfo.companyInfo", 
                  titleFallback: verificationType === "personal" ? "Personal Information" : "Company Information",
                  complete: true 
                },
                { 
                  id: "contact", 
                  title: "accountInfo.contactInfo", 
                  titleFallback: "Contact Information", 
                  complete: true 
                },
                { 
                  id: "documents", 
                  title: verificationType === "personal" ? "accountInfo.verification.personalDocuments" : "accountInfo.businessDocuments", 
                  titleFallback: verificationType === "personal" ? "Personal Documents" : "Business Documents",
                  complete: verificationStatus === "verified" || uploadProgress === 100 
                },
                { 
                  id: "review", 
                  title: "accountInfo.officialReview", 
                  titleFallback: "Official Review", 
                  complete: verificationStatus === "verified" 
                }
              ].map((step) => (
                <div key={step.id} className="flex items-center">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${step.complete ? 'bg-green-500' : 'bg-gray-600'}`}>
                    {step.complete ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-xs text-white">{step.id === "documents" && isUploading ? "..." : "•"}</span>
                    )}
                  </div>
                  <span className={`${step.complete ? 'text-white' : 'text-gray-400'}`}>
                    <TranslatedText keyName={step.title} fallback={step.titleFallback} />
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Tabs>

        <TabsContent value="personal" className="mt-0">
          <Card className="border border-blue-800/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/40 p-5 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">
              <TranslatedText keyName="accountInfo.verification.requiredPersonalDocuments" fallback="Required Personal Documents" />
            </h3>
            
            <ul className="space-y-4 mb-4">
              {personalDocuments.map((document) => (
                <li key={document.id} className="border-b border-blue-800/10 pb-3 last:border-0">
                  <p className="text-white font-medium">
                    <TranslatedText keyName={document.title} fallback={document.titleFallback} />
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    <TranslatedText keyName={document.description} fallback={document.descriptionFallback} />
                  </p>
                </li>
              ))}
            </ul>
            
            {isUploading && (
              <div className="mb-4">
                <p className="text-sm text-blue-300 mb-2">
                  <TranslatedText 
                    keyName="accountInfo.uploadingDocuments" 
                    fallback="Uploading documents..." 
                  />
                </p>
                <Progress value={uploadProgress} className="h-2 bg-blue-900/40" indicatorClassName="bg-blue-500" />
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                className="border-blue-800/30 hover:bg-blue-900/20 text-white"
                onClick={handleFileUpload}
                disabled={isUploading || verificationStatus === "verified"}
              >
                <Upload className="h-4 w-4 mr-2" />
                <TranslatedText keyName="accountInfo.uploadDocuments" fallback="Upload Documents" />
              </Button>
              
              {verificationStatus !== "verified" && verificationStatus !== "pending" && (
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={handleRequestVerification}
                  disabled={isUploading}
                >
                  <TranslatedText keyName="accountInfo.requestVerification" fallback="Request Verification" />
                </Button>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="enterprise" className="mt-0">
          <Card className="border border-blue-800/20 bg-gradient-to-br from-blue-950/50 to-indigo-950/40 p-5 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">
              <TranslatedText keyName="accountInfo.requiredDocuments" fallback="Required Documents" />
            </h3>
            
            <ul className="space-y-4 mb-4">
              {enterpriseDocuments.map((document) => (
                <li key={document.id} className="border-b border-blue-800/10 pb-3 last:border-0">
                  <p className="text-white font-medium">
                    <TranslatedText keyName={document.title} fallback={document.titleFallback} />
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    <TranslatedText keyName={document.description} fallback={document.descriptionFallback} />
                  </p>
                </li>
              ))}
            </ul>
            
            {isUploading && (
              <div className="mb-4">
                <p className="text-sm text-blue-300 mb-2">
                  <TranslatedText 
                    keyName="accountInfo.uploadingDocuments" 
                    fallback="Uploading documents..." 
                  />
                </p>
                <Progress value={uploadProgress} className="h-2 bg-blue-900/40" indicatorClassName="bg-blue-500" />
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                className="border-blue-800/30 hover:bg-blue-900/20 text-white"
                onClick={handleFileUpload}
                disabled={isUploading || verificationStatus === "verified"}
              >
                <Upload className="h-4 w-4 mr-2" />
                <TranslatedText keyName="accountInfo.uploadDocuments" fallback="Upload Documents" />
              </Button>
              
              {verificationStatus !== "verified" && verificationStatus !== "pending" && (
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={handleRequestVerification}
                  disabled={isUploading}
                >
                  <TranslatedText keyName="accountInfo.requestVerification" fallback="Request Verification" />
                </Button>
              )}
            </div>
          </Card>
        </TabsContent>

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
