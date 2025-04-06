
import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AuthTester: React.FC = () => {
  const { isLoggedIn, isLoading } = useAuth();
  
  const setTestToken = () => {
    localStorage.setItem('authToken', 'test-token-123');
    toast.success("Test token set. Refresh to apply changes.");
    console.log("Test token set in localStorage");
  };
  
  const removeTestToken = () => {
    localStorage.removeItem('authToken');
    toast.success("Test token removed. Refresh to apply changes.");
    console.log("Test token removed from localStorage");
  };
  
  return (
    <div className="mt-6 mb-3 flex flex-col gap-2">
      <div className="text-sm text-gray-400 mb-2">
        Auth Status: {isLoading ? "Loading..." : (isLoggedIn ? "Logged In" : "Not Logged In")}
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={setTestToken} 
          className="text-xs"
        >
          Set Test Token
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={removeTestToken}
          className="text-xs"
        >
          Remove Test Token
        </Button>
      </div>
    </div>
  );
};

export default AuthTester;
