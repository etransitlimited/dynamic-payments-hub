
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AuthTester: React.FC = () => {
  const { isLoggedIn, isLoading, logout, login } = useAuth();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    console.log("AuthTester component mounted, auth state:", { isLoggedIn, isLoading });
    // Track token for display
    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
    
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem('authToken');
      if (currentToken !== token) {
        setToken(currentToken);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isLoggedIn, isLoading, token]);

  const setTestToken = () => {
    const newToken = 'test-token-' + Date.now();
    login(newToken);
    setToken(newToken);
    toast.success("Test token set: " + newToken);
  };
  
  const removeTestToken = () => {
    logout();
    setToken(null);
    toast.success("Test token removed.");
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const toggleBypassAuth = () => {
    if (localStorage.getItem('bypassAuth')) {
      localStorage.removeItem('bypassAuth');
      toast.info("Auth bypass disabled");
    } else {
      localStorage.setItem('bypassAuth', 'true');
      toast.info("Auth bypass enabled");
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };
  
  const goToRegister = () => {
    navigate('/register');
  };
  
  const goToForgotPassword = () => {
    navigate('/forgot-password');
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
      <div className="flex flex-wrap gap-2 mb-2">
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
          onClick={toggleBypassAuth}
          className="text-xs bg-blue-900/30 border-blue-700/30 hover:bg-blue-800/30"
        >
          {localStorage.getItem('bypassAuth') ? "Disable Bypass" : "Enable Bypass"}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => window.location.reload()}
          className="text-xs bg-blue-900/30 border-blue-700/30 hover:bg-blue-800/30"
        >
          Refresh Page
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
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
          onClick={goToRegister}
          className="text-xs bg-purple-900/30 border-purple-700/30 hover:bg-purple-800/30"
        >
          Go to Register
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={goToForgotPassword}
          className="text-xs bg-yellow-900/30 border-yellow-700/30 hover:bg-yellow-800/30"
        >
          Go to Forgot Password
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
