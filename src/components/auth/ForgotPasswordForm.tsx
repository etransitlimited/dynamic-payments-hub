
import React, { useEffect } from "react";
import ForgotPasswordFormFields from "./forms/ForgotPasswordFormFields";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const ForgotPasswordForm = () => {
  const { language } = useSafeTranslation();
  
  // Add component render logging for debugging
  useEffect(() => {
    console.log(`ForgotPasswordForm component mounted, language: ${language}`);
    return () => console.log("ForgotPasswordForm component unmounted");
  }, [language]);
  
  return (
    <div className="relative z-10 w-full">
      <ForgotPasswordFormFields />
    </div>
  );
};

export default ForgotPasswordForm;
