
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AuthTester from "@/components/auth/AuthTester";

const LoginForm: React.FC = () => {
  const { t } = useSafeTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state
  const from = location.state?.from || "/dashboard";
  
  console.log("LoginForm - Redirect target after login:", from);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error(t('auth.formErrors.allFields', "Please fill in all fields"));
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate login process
      console.log("Logging in with:", { email });
      
      // Set token in localStorage
      localStorage.setItem('authToken', 'user-token-123');
      
      toast.success(t('auth.loginSuccess.title', "Login successful"));
      
      console.log("Login successful, redirecting to:", from);
      
      // Redirect to the intended page
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      toast.error(t('auth.loginError', "Login failed. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          {t('auth.email', 'Email')}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          {t('auth.password', 'Password')}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('auth.processing', 'Processing...') : t('auth.loginButton', 'Login')}
      </Button>
      
      {/* Add AuthTester component for development */}
      {process.env.NODE_ENV !== 'production' && <AuthTester />}
    </form>
  );
};

export default LoginForm;
