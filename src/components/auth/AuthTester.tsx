
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AuthTester: React.FC = () => {
  const { isLoggedIn, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    console.log("AuthTester component mounted, auth state:", { isLoggedIn, isLoading });
    // Track token for display
    setToken(localStorage.getItem('authToken'));
    
    const interval = setInterval(() => {
      setToken(localStorage.getItem('authToken'));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isLoggedIn, isLoading]);

  const setTestToken = () => {
    const newToken = 'test-token-' + Date.now();
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    toast.success("Test token set: " + newToken);
    console.log("Test token set in localStorage:", newToken);
    // Force reload to update auth state
    window.location.reload();
  };
  
  const removeTestToken = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    toast.success("Test token removed.");
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
  
  const clearAndReload = () => {
    localStorage.clear();
    console.log("Cleared all localStorage");
    window.location.reload();
  };
  
  return (
    <div className="mt-6 p-3 border border-blue-800/30 rounded-lg bg-blue-900/20">
      <div className="text-sm text-blue-300 mb-2">
        Auth Debug: {isLoading ? "Loading..." : (isLoggedIn ? "✅ Logged In" : "❌ Not Logged In")}
      </div>
      <div className="text-xs text-blue-200 mb-2">
        Token: {token ? `${token.substring(0, 12)}...` : "None"}
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
          Refresh Page
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
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearAndReload}
          className="text-xs bg-red-900/30 border-red-700/30 hover:bg-red-800/30"
        >
          Clear All & Reload
        </Button>
      </div>
    </div>
  );
};

export default AuthTester;
