
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AuthTester: React.FC = () => {
  const { isLoggedIn, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("AuthTester component mounted, auth state:", { isLoggedIn, isLoading });
  }, [isLoggedIn, isLoading]);

  const setTestToken = () => {
    localStorage.setItem('authToken', 'test-token-123');
    toast.success("Test token set. Reloading page to update auth state.");
    console.log("Test token set in localStorage");
    // Force reload to update auth state
    window.location.reload();
  };
  
  const removeTestToken = () => {
    localStorage.removeItem('authToken');
    toast.success("Test token removed. Reloading page to update auth state.");
    console.log("Test token removed from localStorage");
    // Force reload to update auth state
    window.location.reload();
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToLogin = () => {
    navigate('/login');
  };
  
  return (
    <div className="mt-6 p-3 border border-blue-800/30 rounded-lg bg-blue-900/20">
      <div className="text-sm text-blue-300 mb-2">
        Auth Debug: {isLoading ? "Loading..." : (isLoggedIn ? "✅ Logged In" : "❌ Not Logged In")}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={setTestToken} 
          className="text-xs bg-blue-900/30 border-blue-700/30 hover:bg-blue-800/30"
        >
          Set Test Token
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={removeTestToken}
          className="text-xs bg-blue-900/30 border-blue-700/30 hover:bg-blue-800/30"
        >
          Remove Token
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => window.location.reload()}
          className="text-xs bg-blue-900/30 border-blue-700/30 hover:bg-blue-800/30"
        >
          Refresh
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={goToDashboard}
          className="text-xs bg-green-900/30 border-green-700/30 hover:bg-green-800/30"
        >
          Go to Dashboard
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={goToLogin}
          className="text-xs bg-blue-900/30 border-blue-700/30 hover:bg-blue-800/30"
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default AuthTester;
