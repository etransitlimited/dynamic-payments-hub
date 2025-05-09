
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import TranslatedText from "@/components/translation/TranslatedText";

interface VerificationFormProps {
  type: 'personal' | 'enterprise';
  step: number;
  onNext: () => void;
  onPrev: () => void;
  onStepComplete: (step: number) => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ 
  type, 
  step, 
  onNext, 
  onPrev, 
  onStepComplete 
}) => {
  const form = useForm({
    defaultValues: {
      // Personal fields
      fullName: '',
      idNumber: '',
      address: '',
      
      // Enterprise fields
      companyName: '',
      businessNumber: '',
      industry: '',
      
      // Legal person fields (enterprise only)
      legalPersonName: '',
      legalPersonId: '',
      legalPersonPhone: '',
      legalPersonEmail: '',
      
      // Contact fields (both)
      phone: '',
      email: '',
    },
  });

  const { handleSubmit, formState: { errors } } = form;

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    
    // In a real app, you would save this data to a state or context
    onStepComplete(step);
    toast.success(<TranslatedText keyName="verification_form_success" fallback="Information saved" />);
    onNext();
  };

  const renderBasicInfoForm = () => {
    if (type === 'personal') {
      return (
        <>
          <FormField
            control={form.control}
            name="fullName"
            rules={{ required: "verification_field_required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <TranslatedText keyName="accountInfo.verification.personalName" fallback="Full Name" />
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-blue-950/30 border-blue-900/50" />
                </FormControl>
                {errors.fullName && <FormMessage>
                  <TranslatedText keyName="verification_field_required" fallback="This field is required" />
                </FormMessage>}
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="idNumber"
            rules={{ required: "verification_field_required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <TranslatedText keyName="accountInfo.verification.personalIdNumber" fallback="ID Number" />
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-blue-950/30 border-blue-900/50" />
                </FormControl>
                {errors.idNumber && <FormMessage>
                  <TranslatedText keyName="verification_field_required" fallback="This field is required" />
                </FormMessage>}
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            rules={{ required: "verification_field_required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <TranslatedText keyName="accountInfo.address" fallback="Address" />
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-blue-950/30 border-blue-900/50" />
                </FormControl>
                {errors.address && <FormMessage>
                  <TranslatedText keyName="verification_field_required" fallback="This field is required" />
                </FormMessage>}
              </FormItem>
            )}
          />
        </>
      );
    } else {
      return (
        <>
          <FormField
            control={form.control}
            name="companyName"
            rules={{ required: "verification_field_required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <TranslatedText keyName="accountInfo.companyName" fallback="Company Name" />
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-blue-950/30 border-blue-900/50" />
                </FormControl>
                {errors.companyName && <FormMessage>
                  <TranslatedText keyName="verification_field_required" fallback="This field is required" />
                </FormMessage>}
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="businessNumber"
            rules={{ required: "verification_field_required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <TranslatedText keyName="accountInfo.registrationId" fallback="Business Registration Number" />
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-blue-950/30 border-blue-900/50" />
                </FormControl>
                {errors.businessNumber && <FormMessage>
                  <TranslatedText keyName="verification_field_required" fallback="This field is required" />
                </FormMessage>}
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="industry"
            rules={{ required: "verification_field_required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <TranslatedText keyName="accountInfo.industry" fallback="Industry" />
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-blue-950/30 border-blue-900/50" />
                </FormControl>
                {errors.industry && <FormMessage>
                  <TranslatedText keyName="verification_field_required" fallback="This field is required" />
                </FormMessage>}
              </FormItem>
            )}
          />
          
          <div className="mt-6 mb-4 border-t border-blue-800/30 pt-4">
            <h3 className="text-lg font-medium text-white mb-4">
              <TranslatedText keyName="verification_legalPerson" fallback="Legal Representative" />
            </h3>
          </div>
          
          <FormField
            control={form.control}
            name="legalPersonName"
            rules={{ required: "verification_field_required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <TranslatedText keyName="verification_legalPerson_name" fallback="Legal Representative Name" />
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-blue-950/30 border-blue-900/50" />
                </FormControl>
                {errors.legalPersonName && <FormMessage>
                  <TranslatedText keyName="verification_field_required" fallback="This field is required" />
                </FormMessage>}
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="legalPersonId"
            rules={{ required: "verification_field_required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <TranslatedText keyName="verification_legalPerson_id" fallback="ID Number" />
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-blue-950/30 border-blue-900/50" />
                </FormControl>
                {errors.legalPersonId && <FormMessage>
                  <TranslatedText keyName="verification_field_required" fallback="This field is required" />
                </FormMessage>}
              </FormItem>
            )}
          />
        </>
      );
    }
  };

  const renderContactInfoForm = () => {
    return (
      <>
        <FormField
          control={form.control}
          name="phone"
          rules={{ required: "verification_field_required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <TranslatedText keyName="accountInfo.phone" fallback="Phone" />
              </FormLabel>
              <FormControl>
                <Input {...field} className="bg-blue-950/30 border-blue-900/50" />
              </FormControl>
              {errors.phone && <FormMessage>
                <TranslatedText keyName="verification_field_required" fallback="This field is required" />
              </FormMessage>}
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          rules={{ 
            required: "verification_field_required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "verification_field_invalid"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <TranslatedText keyName="accountInfo.email" fallback="Email" />
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" className="bg-blue-950/30 border-blue-900/50" />
              </FormControl>
              {errors.email && <FormMessage>
                <TranslatedText keyName={errors.email.message || "verification_field_required"} fallback="Invalid email format" />
              </FormMessage>}
            </FormItem>
          )}
        />
        
        {type === 'enterprise' && (
          <>
            <FormField
              control={form.control}
              name="legalPersonPhone"
              rules={{ required: "verification_field_required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <TranslatedText keyName="verification_legalPerson_phone" fallback="Legal Representative Phone" />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-blue-950/30 border-blue-900/50" />
                  </FormControl>
                  {errors.legalPersonPhone && <FormMessage>
                    <TranslatedText keyName="verification_field_required" fallback="This field is required" />
                  </FormMessage>}
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="legalPersonEmail"
              rules={{ 
                required: "verification_field_required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "verification_field_invalid"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <TranslatedText keyName="verification_legalPerson_email" fallback="Legal Representative Email" />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="bg-blue-950/30 border-blue-900/50" />
                  </FormControl>
                  {errors.legalPersonEmail && <FormMessage>
                    <TranslatedText keyName={errors.legalPersonEmail.message || "verification_field_required"} fallback="Invalid email format" />
                  </FormMessage>}
                </FormItem>
              )}
            />
          </>
        )}
      </>
    );
  };

  const renderDocumentUploadForm = () => {
    return (
      <div className="space-y-4">
        {type === 'personal' ? (
          <>
            {/* 个人文件上传区域 */}
            <div className="space-y-4">
              <div className="border border-dashed border-blue-500/50 rounded-lg p-4 text-center">
                <p className="text-gray-300 mb-2">
                  <TranslatedText keyName="accountInfo.verification.personalId" fallback="Government-issued ID" />
                </p>
                <Button variant="outline" className="bg-blue-900/20">
                  <TranslatedText keyName="accountInfo.uploadDocuments" fallback="Upload Documents" />
                </Button>
              </div>
              
              <div className="border border-dashed border-blue-500/50 rounded-lg p-4 text-center">
                <p className="text-gray-300 mb-2">
                  <TranslatedText keyName="accountInfo.verification.addressProof" fallback="Proof of Address" />
                </p>
                <Button variant="outline" className="bg-blue-900/20">
                  <TranslatedText keyName="accountInfo.uploadDocuments" fallback="Upload Documents" />
                </Button>
              </div>
              
              <div className="border border-dashed border-blue-500/50 rounded-lg p-4 text-center">
                <p className="text-gray-300 mb-2">
                  <TranslatedText keyName="accountInfo.verification.selfiePhoto" fallback="Selfie Photo" />
                </p>
                <Button variant="outline" className="bg-blue-900/20">
                  <TranslatedText keyName="accountInfo.uploadDocuments" fallback="Upload Documents" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 企业文件上传区域 */}
            <div className="space-y-4">
              <div className="border border-dashed border-blue-500/50 rounded-lg p-4 text-center">
                <p className="text-gray-300 mb-2">
                  <TranslatedText keyName="accountInfo.businessRegistration" fallback="Business Registration Certificate" />
                </p>
                <Button variant="outline" className="bg-blue-900/20">
                  <TranslatedText keyName="accountInfo.uploadDocuments" fallback="Upload Documents" />
                </Button>
              </div>
              
              <div className="border border-dashed border-blue-500/50 rounded-lg p-4 text-center">
                <p className="text-gray-300 mb-2">
                  <TranslatedText keyName="accountInfo.certificateIncorporation" fallback="Certificate of Incorporation" />
                </p>
                <Button variant="outline" className="bg-blue-900/20">
                  <TranslatedText keyName="accountInfo.uploadDocuments" fallback="Upload Documents" />
                </Button>
              </div>
              
              <div className="border border-dashed border-blue-500/50 rounded-lg p-4 text-center">
                <p className="text-gray-300 mb-2">
                  <TranslatedText keyName="accountInfo.directorId" fallback="Director's ID Document" />
                </p>
                <Button variant="outline" className="bg-blue-900/20">
                  <TranslatedText keyName="accountInfo.uploadDocuments" fallback="Upload Documents" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderReviewForm = () => {
    return (
      <div className="space-y-6">
        <div className="bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-3">
            <TranslatedText keyName={type === 'personal' ? "verification_step_basicInfo" : "accountInfo.companyDetails"} fallback="Basic Information" />
          </h3>
          <div className="space-y-2">
            {type === 'personal' ? (
              <>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">
                    <TranslatedText keyName="accountInfo.verification.personalName" fallback="Full Name" />:
                  </div>
                  <div className="text-white">{form.getValues('fullName') || '-'}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">
                    <TranslatedText keyName="accountInfo.verification.personalIdNumber" fallback="ID Number" />:
                  </div>
                  <div className="text-white">{form.getValues('idNumber') || '-'}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">
                    <TranslatedText keyName="accountInfo.address" fallback="Address" />:
                  </div>
                  <div className="text-white">{form.getValues('address') || '-'}</div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">
                    <TranslatedText keyName="accountInfo.companyName" fallback="Company Name" />:
                  </div>
                  <div className="text-white">{form.getValues('companyName') || '-'}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">
                    <TranslatedText keyName="accountInfo.registrationId" fallback="Business Registration Number" />:
                  </div>
                  <div className="text-white">{form.getValues('businessNumber') || '-'}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">
                    <TranslatedText keyName="accountInfo.industry" fallback="Industry" />:
                  </div>
                  <div className="text-white">{form.getValues('industry') || '-'}</div>
                </div>
                
                <h4 className="text-md font-medium text-white mt-4">
                  <TranslatedText keyName="verification_legalPerson" fallback="Legal Representative" />
                </h4>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">
                    <TranslatedText keyName="verification_legalPerson_name" fallback="Legal Representative Name" />:
                  </div>
                  <div className="text-white">{form.getValues('legalPersonName') || '-'}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">
                    <TranslatedText keyName="verification_legalPerson_id" fallback="ID Number" />:
                  </div>
                  <div className="text-white">{form.getValues('legalPersonId') || '-'}</div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-3">
            <TranslatedText keyName="accountInfo.contactDetails" fallback="Contact Details" />
          </h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">
                <TranslatedText keyName="accountInfo.phone" fallback="Phone" />:
              </div>
              <div className="text-white">{form.getValues('phone') || '-'}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">
                <TranslatedText keyName="accountInfo.email" fallback="Email" />:
              </div>
              <div className="text-white">{form.getValues('email') || '-'}</div>
            </div>
            
            {type === 'enterprise' && (
              <>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">
                    <TranslatedText keyName="verification_legalPerson_phone" fallback="Legal Representative Phone" />:
                  </div>
                  <div className="text-white">{form.getValues('legalPersonPhone') || '-'}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">
                    <TranslatedText keyName="verification_legalPerson_email" fallback="Legal Representative Email" />:
                  </div>
                  <div className="text-white">{form.getValues('legalPersonEmail') || '-'}</div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-3">
            <TranslatedText keyName={type === 'personal' ? "accountInfo.verification.personalDocuments" : "accountInfo.businessDocuments"} fallback="Documents" />
          </h3>
          <div className="text-sm text-gray-300">
            <TranslatedText
              keyName={type === 'personal' ? 
                "accountInfo.verification.personalDocsUploaded" : 
                "accountInfo.verification.businessDocsUploaded"
              } 
              fallback="Documents uploaded successfully" 
            />
          </div>
        </div>
      </div>
    );
  };

  const renderFormByStep = () => {
    switch (step) {
      case 0:
        return renderBasicInfoForm();
      case 1:
        return renderContactInfoForm();
      case 2:
        return renderDocumentUploadForm();
      case 3:
        return renderReviewForm();
      default:
        return null;
    }
  };

  const renderButtons = () => {
    const isLastStep = step === 3;
    
    return (
      <div className="flex justify-between mt-6">
        {step > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="border-blue-800/30 hover:bg-blue-900/20"
          >
            <TranslatedText keyName="verification_prev" fallback="Previous" />
          </Button>
        )}
        
        <div className={`${step === 0 ? 'w-full text-right' : 'ml-auto'}`}>
          <Button 
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <TranslatedText 
              keyName={isLastStep ? "verification_submit" : "verification_next"} 
              fallback={isLastStep ? "Submit for Review" : "Next"} 
            />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {renderFormByStep()}
        {renderButtons()}
      </form>
    </Form>
  );
};

export default VerificationForm;
