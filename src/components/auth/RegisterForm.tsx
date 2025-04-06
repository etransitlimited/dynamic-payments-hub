
import React, { memo } from "react";
import RegisterFormFields from "./forms/RegisterFormFields";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const RegisterForm = () => {
  const { language } = useSafeTranslation();
  
  console.log(`RegisterForm component mounted, language: ${language}`);
  
  return (
    <div className="relative z-10 w-full">
      <RegisterFormFields />
    </div>
  );
};

export default memo(RegisterForm);
