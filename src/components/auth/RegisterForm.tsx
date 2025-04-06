
import React, { useEffect } from "react";
import RegisterFormFields from "./forms/RegisterFormFields";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const RegisterForm = () => {
  const { language } = useSafeTranslation();
  
  // Enhanced logging for debugging
  useEffect(() => {
    console.log(`RegisterForm component mounted, language: ${language}`);
    console.log("RegisterForm rendered in Register page context");
    return () => console.log("RegisterForm component unmounted");
  }, [language]);
  
  return (
    <div className="relative z-10 w-full">
      <RegisterFormFields />
    </div>
  );
};

export default RegisterForm;
