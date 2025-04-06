
import React, { useEffect } from "react";
import ForgotPasswordFormFields from "./forms/ForgotPasswordFormFields";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const { language } = useSafeTranslation();
  const navigate = useNavigate();
  
  // Add component render logging for debugging
  useEffect(() => {
    console.log(`ForgotPasswordForm component mounted, language: ${language}`);
    return () => console.log("ForgotPasswordForm component unmounted");
  }, [language]);
  
  // Handle successful password reset request
  const handleResetSuccess = () => {
    // Navigate back to login after a delay
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };
  
  return (
    <div className="relative z-10 w-full">
      <ForgotPasswordFormFields onResetSuccess={handleResetSuccess} />
    </div>
  );
};

export default ForgotPasswordForm;
