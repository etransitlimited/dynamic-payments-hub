
import React, { useEffect } from "react";
import LoginFormFields from "./forms/LoginFormFields";

const LoginForm = () => {
  // Add component render logging for debugging
  useEffect(() => {
    console.log("LoginForm component mounted");
    return () => console.log("LoginForm component unmounted");
  }, []);
  
  return (
    <div className="relative z-10 w-full">
      <LoginFormFields />
    </div>
  );
};

export default LoginForm;
