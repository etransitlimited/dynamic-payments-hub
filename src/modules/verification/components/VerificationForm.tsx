import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";
import FileUpload from "./FileUpload";
import VerificationStepper from "./VerificationStepper";

interface FormState {
  accountType: 'personal' | 'enterprise';
  personal: {
    firstName: string;
    lastName: string;
    email: string;
  };
  enterprise: {
    companyName: string;
    registrationNumber: string;
    contactEmail: string;
    legalPersonName: string;
    legalPersonId: string;
    legalPersonPhone: string;
    legalPersonEmail: string;
  };
  contact: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  documents: {
    personalId: File | null;
    addressProof: File | null;
    selfie: File | null;
    businessRegistration: File | null;
    incorporation: File | null;
    directorId: File | null;
  };
}

const initialFormState: FormState = {
  accountType: 'personal',
  personal: {
    firstName: '',
    lastName: '',
    email: '',
  },
  enterprise: {
    companyName: '',
    registrationNumber: '',
    contactEmail: '',
    legalPersonName: '',
    legalPersonId: '',
    legalPersonPhone: '',
    legalPersonEmail: '',
  },
  contact: {
    address: '',
    city: '',
    country: '',
    postalCode: '',
  },
  documents: {
    personalId: null,
    addressProof: null,
    selfie: null,
    businessRegistration: null,
    incorporation: null,
    directorId: null,
  },
};

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateRequired = (value: string): boolean => {
  return value.trim() !== '';
};

const VerificationForm: React.FC = () => {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState(initialFormState);
  const isPersonalAccount = formState.accountType === 'personal';
  
  const steps = [
    { id: 0, label: getTranslation("verification_step_basicInfo") },
    { id: 1, label: getTranslation("verification_step_contactInfo") },
    { id: 2, label: getTranslation("verification_step_documentUpload") },
    { id: 3, label: getTranslation("verification_step_review") },
  ];
  
  const getTranslation = (key: string): string => {
    // @ts-ignore
    return i18n[language]?.[key] || key;
  };
  
  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  
  const handleInputChange = (
    section: keyof Omit<FormState, 'documents'>,
    field: string,
    value: string
  ) => {
    setFormState(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };
  
  const handleNextStep = () => {
    setActiveStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
  };
  
  const handleSubmit = () => {
    alert('Verification form submitted!');
    console.log('Form State:', formState);
  };
  
  const canProceedFromBasicInfo = (): boolean => {
    if (isPersonalAccount) {
      return (
        validateRequired(formState.personal.firstName) &&
        validateRequired(formState.personal.lastName) &&
        validateEmail(formState.personal.email)
      );
    } else {
      return (
        validateRequired(formState.enterprise.companyName) &&
        validateRequired(formState.enterprise.registrationNumber) &&
        validateEmail(formState.enterprise.contactEmail)
      );
    }
  };
  
  const canProceedFromContactInfo = (): boolean => {
    return (
      validateRequired(formState.contact.address) &&
      validateRequired(formState.contact.city) &&
      validateRequired(formState.contact.country) &&
      validateRequired(formState.contact.postalCode)
    );
  };
  
  const canProceedFromDocumentUpload = (): boolean => {
    if (isPersonalAccount) {
      return (
        formState.documents.personalId !== null &&
        formState.documents.addressProof !== null &&
        formState.documents.selfie !== null
      );
    } else {
      return (
        formState.documents.businessRegistration !== null &&
        formState.documents.incorporation !== null &&
        formState.documents.directorId !== null
      );
    }
  };
  
  const handlePersonalIdUpload = (file: File | null) => {
    setFormState(prevState => ({
      ...prevState,
      documents: {
        ...prevState.documents,
        personalId: file,
      },
    }));
  };
  
  const handleAddressProofUpload = (file: File | null) => {
    setFormState(prevState => ({
      ...prevState,
      documents: {
        ...prevState.documents,
        addressProof: file,
      },
    }));
  };
  
  const handleSelfieUpload = (file: File | null) => {
    setFormState(prevState => ({
      ...prevState,
      documents: {
        ...prevState.documents,
        selfie: file,
      },
    }));
  };
  
  const handleBusinessRegistrationUpload = (file: File | null) => {
    setFormState(prevState => ({
      ...prevState,
      documents: {
        ...prevState.documents,
        businessRegistration: file,
      },
    }));
  };
  
  const handleIncorporationUpload = (file: File | null) => {
    setFormState(prevState => ({
      ...prevState,
      documents: {
        ...prevState.documents,
        incorporation: file,
      },
    }));
  };
  
  const handleDirectorIdUpload = (file: File | null) => {
    setFormState(prevState => ({
      ...prevState,
      documents: {
        ...prevState.documents,
        directorId: file,
      },
    }));
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <VerificationStepper 
        steps={steps}
        activeStep={activeStep}
        onStepChange={handleStepChange}
      />
      
      <Card className="mt-6 border-indigo-600/30 bg-indigo-900/20">
        <CardContent className="pt-6">
          {activeStep === 0 && (
            // Basic Info Step
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Label htmlFor="personal" className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="personal"
                    name="accountType"
                    value="personal"
                    checked={isPersonalAccount}
                    onChange={() => setFormState(prevState => ({ ...prevState, accountType: 'personal' }))}
                    className="accent-blue-500 h-5 w-5"
                  />
                  <span className="text-blue-100">{getTranslation("verification_personal_title")}</span>
                </Label>
                <Label htmlFor="enterprise" className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="enterprise"
                    name="accountType"
                    value="enterprise"
                    checked={!isPersonalAccount}
                    onChange={() => setFormState(prevState => ({ ...prevState, accountType: 'enterprise' }))}
                    className="accent-blue-500 h-5 w-5"
                  />
                  <span className="text-blue-100">{getTranslation("verification_enterprise_title")}</span>
                </Label>
              </div>
              
              {isPersonalAccount ? (
                // Personal Form Fields
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firstName" className="text-blue-100">
                      {getTranslation("verification_legalPerson_name")}
                    </Label>
                    <Input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      value={formState.personal.firstName}
                      onChange={e => handleInputChange('personal', 'firstName', e.target.value)}
                      className="bg-blue-950/40 border-blue-800 text-blue-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-blue-100">
                      {getTranslation("verification_legalPerson_name")}
                    </Label>
                    <Input
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      value={formState.personal.lastName}
                      onChange={e => handleInputChange('personal', 'lastName', e.target.value)}
                      className="bg-blue-950/40 border-blue-800 text-blue-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-blue-100">
                      {getTranslation("verification_legalPerson_email")}
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      value={formState.personal.email}
                      onChange={e => handleInputChange('personal', 'email', e.target.value)}
                      className="bg-blue-950/40 border-blue-800 text-blue-200"
                    />
                  </div>
                </div>
              ) : (
                // Enterprise Form Fields
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName" className="text-blue-100">
                      {getTranslation("verification_enterprise_title")}
                    </Label>
                    <Input
                      type="text"
                      id="companyName"
                      placeholder="Company Name"
                      value={formState.enterprise.companyName}
                      onChange={e => handleInputChange('enterprise', 'companyName', e.target.value)}
                      className="bg-blue-950/40 border-blue-800 text-blue-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="registrationNumber" className="text-blue-100">
                      {getTranslation("verification_legalPerson_id")}
                    </Label>
                    <Input
                      type="text"
                      id="registrationNumber"
                      placeholder="Registration Number"
                      value={formState.enterprise.registrationNumber}
                      onChange={e => handleInputChange('enterprise', 'registrationNumber', e.target.value)}
                      className="bg-blue-950/40 border-blue-800 text-blue-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail" className="text-blue-100">
                      {getTranslation("verification_legalPerson_email")}
                    </Label>
                    <Input
                      type="email"
                      id="contactEmail"
                      placeholder="Contact Email"
                      value={formState.enterprise.contactEmail}
                      onChange={e => handleInputChange('enterprise', 'contactEmail', e.target.value)}
                      className="bg-blue-950/40 border-blue-800 text-blue-200"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                <div></div>
                <Button 
                  onClick={handleNextStep}
                  disabled={!canProceedFromBasicInfo()} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <span>{getTranslation("verification_next")}</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {activeStep === 1 && (
            // Contact Info Step
            <div className="space-y-6">
              {isPersonalAccount ? (
                // Personal contact info fields
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-blue-100">
                      {getTranslation("verification_address_proof")}
                    </Label>
                    <Input
                      type="text"
                      id="address"
                      placeholder="Address"
                      value={formState.contact.address}
                      onChange={e => handleInputChange('contact', 'address', e.target.value)}
                      className="bg-blue-950/40 border-blue-800 text-blue-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-blue-100">
                      {getTranslation("verification_legalPerson_phone")}
                    </Label>
                    <Input
                      type="text"
                      id="city"
                      placeholder="City"
                      value={formState.contact.city}
                      onChange={e => handleInputChange('contact', 'city', e.target.value)}
                      className="bg-blue-950/40 border-blue-800 text-blue-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-blue-100">
                      {getTranslation("verification_legalPerson_email")}
                    </Label>
                    <Input
                      type="text"
                      id="country"
                      placeholder="Country"
                      value={formState.contact.country}
                      onChange={e => handleInputChange('contact', 'country', e.target.value)}
                      className="bg-blue-950/40 border-blue-800 text-blue-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-blue-100">
                      {getTranslation("verification_legalPerson_id")}
                    </Label>
                    <Input
                      type="text"
                      id="postalCode"
                      placeholder="Postal Code"
                      value={formState.contact.postalCode}
                      onChange={e => handleInputChange('contact', 'postalCode', e.target.value)}
                      className="bg-blue-950/40 border-blue-800 text-blue-200"
                    />
                  </div>
                </div>
              ) : (
                // Enterprise contact info fields with legal person section
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address" className="text-blue-100">
                        {getTranslation("verification_address_proof")}
                      </Label>
                      <Input
                        type="text"
                        id="address"
                        placeholder="Address"
                        value={formState.contact.address}
                        onChange={e => handleInputChange('contact', 'address', e.target.value)}
                        className="bg-blue-950/40 border-blue-800 text-blue-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-blue-100">
                        {getTranslation("verification_legalPerson_phone")}
                      </Label>
                      <Input
                        type="text"
                        id="city"
                        placeholder="City"
                        value={formState.contact.city}
                        onChange={e => handleInputChange('contact', 'city', e.target.value)}
                        className="bg-blue-950/40 border-blue-800 text-blue-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-blue-100">
                        {getTranslation("verification_legalPerson_email")}
                      </Label>
                      <Input
                        type="text"
                        id="country"
                        placeholder="Country"
                        value={formState.contact.country}
                        onChange={e => handleInputChange('contact', 'country', e.target.value)}
                        className="bg-blue-950/40 border-blue-800 text-blue-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="text-blue-100">
                        {getTranslation("verification_legalPerson_id")}
                      </Label>
                      <Input
                        type="text"
                        id="postalCode"
                        placeholder="Postal Code"
                        value={formState.contact.postalCode}
                        onChange={e => handleInputChange('contact', 'postalCode', e.target.value)}
                        className="bg-blue-950/40 border-blue-800 text-blue-200"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-950/50 rounded-lg border border-blue-800/50 mt-6">
                    <h3 className="text-lg font-medium text-blue-300 mb-4">
                      {getTranslation("verification_legalPerson")}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="legalPersonName" className="text-blue-100">
                          {getTranslation("verification_legalPerson_name")}
                        </Label>
                        <Input
                          type="text"
                          id="legalPersonName"
                          placeholder="Legal Person Name"
                          value={formState.enterprise.legalPersonName}
                          onChange={e => handleInputChange('enterprise', 'legalPersonName', e.target.value)}
                          className="bg-blue-950/40 border-blue-800 text-blue-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="legalPersonId" className="text-blue-100">
                          {getTranslation("verification_legalPerson_id")}
                        </Label>
                        <Input
                          type="text"
                          id="legalPersonId"
                          placeholder="Legal Person ID"
                          value={formState.enterprise.legalPersonId}
                          onChange={e => handleInputChange('enterprise', 'legalPersonId', e.target.value)}
                          className="bg-blue-950/40 border-blue-800 text-blue-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="legalPersonPhone" className="text-blue-100">
                          {getTranslation("verification_legalPerson_phone")}
                        </Label>
                        <Input
                          type="text"
                          id="legalPersonPhone"
                          placeholder="Legal Person Phone"
                          value={formState.enterprise.legalPersonPhone}
                          onChange={e => handleInputChange('enterprise', 'legalPersonPhone', e.target.value)}
                          className="bg-blue-950/40 border-blue-800 text-blue-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="legalPersonEmail" className="text-blue-100">
                          {getTranslation("verification_legalPerson_email")}
                        </Label>
                        <Input
                          type="email"
                          id="legalPersonEmail"
                          placeholder="Legal Person Email"
                          value={formState.enterprise.legalPersonEmail}
                          onChange={e => handleInputChange('enterprise', 'legalPersonEmail', e.target.value)}
                          className="bg-blue-950/40 border-blue-800 text-blue-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                <Button 
                  onClick={() => setActiveStep(0)} 
                  variant="outline"
                  className="border-blue-700/50 text-blue-300 hover:bg-blue-900/30"
                >
                  {getTranslation("verification_prev")}
                </Button>
                <Button 
                  onClick={handleNextStep}
                  disabled={!canProceedFromContactInfo()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <span>{getTranslation("verification_next")}</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {activeStep === 2 && (
            // Document Upload Step
            <div className="space-y-8">
              {isPersonalAccount ? (
                // Personal document upload
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-blue-100">
                        {getTranslation("verification_personal_id")}
                      </Label>
                      <p className="text-sm text-blue-300 mb-3">
                        {getTranslation("verification_personal_id_desc")}
                      </p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        maxSizeMB={5}
                        onFileSelected={handlePersonalIdUpload}
                        dragDropText={getTranslation("verification_personal_id_drag_drop")}
                        orClickText={getTranslation("verification_personal_id_or_click")}
                        acceptedTypesText={getTranslation("verification_personal_id_accepted_types")}
                        fileTypes={getTranslation("verification_accepted_documents")}
                        uploadButtonText={getTranslation("verification_personal_id_upload_file")}
                        tryAgainText={getTranslation("verification_personal_id_try_again")}
                        uploadingText={getTranslation("verification_uploading")}
                        uploadedText={getTranslation("verification_uploaded")}
                        fileReadyText={getTranslation("verification_file_ready")}
                        imagePreviewText={getTranslation("verification_image_preview")}
                        imagePreviewHoverText={getTranslation("verification_image_preview_hover")}
                        removeImageText={getTranslation("verification_remove_image")}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-blue-100">
                        {getTranslation("verification_address_proof")}
                      </Label>
                      <p className="text-sm text-blue-300 mb-3">
                        {getTranslation("verification_address_proof_desc")}
                      </p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        maxSizeMB={5}
                        onFileSelected={handleAddressProofUpload}
                        dragDropText={getTranslation("verification_address_proof_drag_drop")}
                        orClickText={getTranslation("verification_address_proof_or_click")}
                        acceptedTypesText={getTranslation("verification_address_proof_accepted_types")}
                        fileTypes={getTranslation("verification_accepted_documents")}
                        uploadButtonText={getTranslation("verification_address_proof_upload_file")}
                        tryAgainText={getTranslation("verification_address_proof_try_again")}
                        uploadingText={getTranslation("verification_uploading")}
                        uploadedText={getTranslation("verification_uploaded")}
                        fileReadyText={getTranslation("verification_file_ready")}
                        imagePreviewText={getTranslation("verification_image_preview")}
                        imagePreviewHoverText={getTranslation("verification_image_preview_hover")}
                        removeImageText={getTranslation("verification_remove_image")}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-blue-100">
                      {getTranslation("verification_selfie")}
                    </Label>
                    <p className="text-sm text-blue-300 mb-3">
                      {getTranslation("verification_selfie_desc")}
                    </p>
                    <FileUpload
                      acceptedFileTypes=".jpg,.jpeg,.png"
                      maxSizeMB={5}
                      onFileSelected={handleSelfieUpload}
                      dragDropText={getTranslation("verification_selfie_drag_drop")}
                      orClickText={getTranslation("verification_selfie_or_click")}
                      acceptedTypesText={getTranslation("verification_selfie_accepted_types")}
                      fileTypes={getTranslation("verification_accepted_images")}
                      uploadButtonText={getTranslation("verification_selfie_upload_file")}
                      tryAgainText={getTranslation("verification_selfie_try_again")}
                      uploadingText={getTranslation("verification_uploading")}
                      uploadedText={getTranslation("verification_uploaded")}
                      fileReadyText={getTranslation("verification_file_ready")}
                      imagePreviewText={getTranslation("verification_image_preview")}
                      imagePreviewHoverText={getTranslation("verification_image_preview_hover")}
                      removeImageText={getTranslation("verification_remove_image")}
                    />
                  </div>
                </>
              ) : (
                // Enterprise document upload
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-blue-100">
                        {getTranslation("verification_business_registration")}
                      </Label>
                      <p className="text-sm text-blue-300 mb-3">
                        {getTranslation("verification_business_registration_desc")}
                      </p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        maxSizeMB={10}
                        onFileSelected={handleBusinessRegistrationUpload}
                        dragDropText={getTranslation("verification_business_registration_drag_drop")}
                        orClickText={getTranslation("verification_business_registration_or_click")}
                        acceptedTypesText={getTranslation("verification_business_registration_accepted_types")}
                        fileTypes={getTranslation("verification_accepted_documents")}
                        uploadButtonText={getTranslation("verification_business_registration_upload_file")}
                        tryAgainText={getTranslation("verification_business_registration_try_again")}
                        uploadingText={getTranslation("verification_uploading")}
                        uploadedText={getTranslation("verification_uploaded")}
                        fileReadyText={getTranslation("verification_file_ready")}
                        imagePreviewText={getTranslation("verification_image_preview")}
                        imagePreviewHoverText={getTranslation("verification_image_preview_hover")}
                        removeImageText={getTranslation("verification_remove_image")}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-blue-100">
                        {getTranslation("verification_incorporation")}
                      </Label>
                      <p className="text-sm text-blue-300 mb-3">
                        {getTranslation("verification_incorporation_desc")}
                      </p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        maxSizeMB={10}
                        onFileSelected={handleIncorporationUpload}
                        dragDropText={getTranslation("verification_incorporation_drag_drop")}
                        orClickText={getTranslation("verification_incorporation_or_click")}
                        acceptedTypesText={getTranslation("verification_incorporation_accepted_types")}
                        fileTypes={getTranslation("verification_accepted_documents")}
                        uploadButtonText={getTranslation("verification_incorporation_upload_file")}
                        tryAgainText={getTranslation("verification_incorporation_try_again")}
                        uploadingText={getTranslation("verification_uploading")}
                        uploadedText={getTranslation("verification_uploaded")}
                        fileReadyText={getTranslation("verification_file_ready")}
                        imagePreviewText={getTranslation("verification_image_preview")}
                        imagePreviewHoverText={getTranslation("verification_image_preview_hover")}
                        removeImageText={getTranslation("verification_remove_image")}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-blue-100">
                      {getTranslation("verification_director_id")}
                    </Label>
                    <p className="text-sm text-blue-300 mb-3">
                      {getTranslation("verification_director_id_desc")}
                    </p>
                    <FileUpload
                      acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                      maxSizeMB={5}
                      onFileSelected={handleDirectorIdUpload}
                      dragDropText={getTranslation("verification_director_id_drag_drop")}
                      orClickText={getTranslation("verification_director_id_or_click")}
                      acceptedTypesText={getTranslation("verification_director_id_accepted_types")}
                      fileTypes={getTranslation("verification_accepted_documents")}
                      uploadButtonText={getTranslation("verification_director_id_upload_file")}
                      tryAgainText={getTranslation("verification_director_id_try_again")}
                      uploadingText={getTranslation("verification_uploading")}
                      uploadedText={getTranslation("verification_uploaded")}
                      fileReadyText={getTranslation("verification_file_ready")}
                      imagePreviewText={getTranslation("verification_image_preview")}
                      imagePreviewHoverText={getTranslation("verification_image_preview_hover")}
                      removeImageText={getTranslation("verification_remove_image")}
                    />
                  </div>
                </>
              )}
              
              <div className="flex justify-between mt-8">
                <Button 
                  onClick={() => setActiveStep(1)} 
                  variant="outline"
                  className="border-blue-700/50 text-blue-300 hover:bg-blue-900/30"
                >
                  {getTranslation("verification_prev")}
                </Button>
                <Button 
                  onClick={handleNextStep}
                  disabled={!canProceedFromDocumentUpload()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <span>{getTranslation("verification_next")}</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {activeStep === 3 && (
            // Review Step
            <div className="space-y-6">
              <div className="p-4 rounded-lg border border-green-600/30 bg-green-900/10">
                <h3 className="text-lg font-medium text-green-300 flex items-center">
                  <Check className="h-5 w-5 mr-2" />
                  {isPersonalAccount 
                    ? getTranslation("verification_personal_title") 
                    : getTranslation("verification_enterprise_title")
                  }
                </h3>
                <p className="text-sm text-green-200/80 mt-1">
                  {isPersonalAccount 
                    ? getTranslation("verification_personal_description")
                    : getTranslation("verification_enterprise_description")
                  }
                </p>
                
                <div className="mt-4 space-y-2">
                  <h4 className="text-md font-medium text-green-200">
                    {getTranslation("verification_step_basicInfo")}
                  </h4>
                  {isPersonalAccount ? (
                    <>
                      <p className="text-sm text-green-100">
                        {getTranslation("verification_legalPerson_name")}: {formState.personal.firstName} {formState.personal.lastName}
                      </p>
                      <p className="text-sm text-green-100">
                        {getTranslation("verification_legalPerson_email")}: {formState.personal.email}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-green-100">
                        {getTranslation("verification_enterprise_title")}: {formState.enterprise.companyName}
                      </p>
                      <p className="text-sm text-green-100">
                        {getTranslation("verification_legalPerson_id")}: {formState.enterprise.registrationNumber}
                      </p>
                      <p className="text-sm text-green-100">
                        {getTranslation("verification_legalPerson_email")}: {formState.enterprise.contactEmail}
                      </p>
                    </>
                  )}
                </div>
                
                <div className="mt-4 space-y-2">
                  <h4 className="text-md font-medium text-green-200">
                    {getTranslation("verification_step_contactInfo")}
                  </h4>
                  <p className="text-sm text-green-100">
                    {getTranslation("verification_address_proof")}: {formState.contact.address}, {formState.contact.city}, {formState.contact.country} {formState.contact.postalCode}
                  </p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border border-green-600/30 bg-green-900/10">
                <h3 className="text-lg font-medium text-green-300">
                  {getTranslation("verification_step_documentUpload")}
                </h3>
                <div className="mt-4 space-y-2">
                  {isPersonalAccount ? (
                    <>
                      <p className="text-sm text-green-100">
                        {getTranslation("verification_personal_id")}: {formState.documents.personalId?.name}
                      </p>
                      <p className="text-sm text-green-100">
                        {getTranslation("verification_address_proof")}: {formState.documents.addressProof?.name}
                      </p>
                      <p className="text-sm text-green-100">
                        {getTranslation("verification_selfie")}: {formState.documents.selfie?.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-green-100">
                        {getTranslation("verification_business_registration")}: {formState.documents.businessRegistration?.name}
                      </p>
                      <p className="text-sm text-green-100">
                        {getTranslation("verification_incorporation")}: {formState.documents.incorporation?.name}
                      </p>
                      <p
