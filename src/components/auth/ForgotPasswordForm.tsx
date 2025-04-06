
import React, { memo } from "react";
import ForgotPasswordFormFields from "./forms/ForgotPasswordFormFields";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  
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

export default memo(ForgotPasswordForm);
