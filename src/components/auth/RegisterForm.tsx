
import React, { useEffect } from "react";
import RegisterFormFields from "./forms/RegisterFormFields";

const RegisterForm = () => {
  // Add component render logging for debugging
  useEffect(() => {
    console.log("RegisterForm component mounted");
    return () => console.log("RegisterForm component unmounted");
  }, []);
  
  return (
    <div className="relative z-10 w-full">
      <RegisterFormFields />
    </div>
  );
};

export default RegisterForm;
