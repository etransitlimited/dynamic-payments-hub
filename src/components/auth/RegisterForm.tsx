
import React, { useEffect } from "react";
import RegisterFormFields from "./forms/RegisterFormFields";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useLocation } from "react-router-dom";

const RegisterForm = () => {
  const { language } = useSafeTranslation();
  const location = useLocation();
  
  // Enhanced logging for debugging
  useEffect(() => {
    console.log(`RegisterForm component mounted, language: ${language}`);
    console.log(`RegisterForm rendered at path: ${location.pathname}`);
    return () => console.log("RegisterForm component unmounted");
  }, [language, location.pathname]);
  
  return (
    <div className="relative z-10 w-full">
      <RegisterFormFields />
    </div>
  );
};

export default RegisterForm;
