
import React, { useEffect } from "react";
import ForgotPasswordFormFields from "./forms/ForgotPasswordFormFields";

const ForgotPasswordForm = () => {
  // Add component render logging for debugging
  useEffect(() => {
    console.log("ForgotPasswordForm component mounted");
    return () => console.log("ForgotPasswordForm component unmounted");
  }, []);
  
  return (
    <div className="relative z-10 w-full">
      <ForgotPasswordFormFields />
    </div>
  );
};

export default ForgotPasswordForm;
