
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/context/TranslationProvider";

interface AuthWrapperProps {
  children: React.ReactNode;
  locale?: string;
  version?: "v1"|"v2";
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ 
  children, 
  locale = "en",
  version = "v2"
}) => {
  const { language, isLoading: langLoading } = useLanguage();
  const { isLoggedIn, isLoading: authLoading, forceRefresh } = useAuth();
  const { isChangingLanguage } = useTranslation();
  const languageRef = useRef(language);
  const checkRef = useRef(false);
  const mountedRef = useRef(true);
  const [refreshAttempted, setRefreshAttempted] = useState(false);
  
  // Track mounted state
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Handle auth preservation during language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`AuthWrapper: Language changed from ${languageRef.current} to ${language}`);
      languageRef.current = language;
      
      // Force refresh auth state when language changes
      if (mountedRef.current) {
        console.log("AuthWrapper: Refreshing auth state after language change");
        // Store token temporarily in sessionStorage to preserve during language change
        const token = localStorage.getItem('authToken');
        if (token) {
          sessionStorage.setItem('tempAuthToken', token);
        }
        
        // Schedule auth refresh after language change settles
        setTimeout(() => {
          if (mountedRef.current) {
            forceRefresh();
            setRefreshAttempted(true);
            
            // Reset check flag
            setTimeout(() => {
              if (mountedRef.current) {
                checkRef.current = false;
              }
            }, 500);
          }
        }, 300);
      }
    }
  }, [language, forceRefresh]);
  
  // One-time check after initial mount
  useEffect(() => {
    if (!refreshAttempted && mountedRef.current) {
      // Check if we have a token in session storage (from previous language change)
      const tempToken = sessionStorage.getItem('tempAuthToken');
      if (tempToken) {
        console.log("AuthWrapper: Restoring auth token from session storage on mount");
        localStorage.setItem('authToken', tempToken);
        
        // Force refresh after token restoration
        setTimeout(() => {
          if (mountedRef.current) {
            forceRefresh();
            setRefreshAttempted(true);
          }
        }, 200);
      }
    }
  }, [refreshAttempted, forceRefresh]);
  
  // Add isolation namespace attribute
  const moduleKey = useRef(`auth_module_${Date.now().toString(36)}`);
  
  if (langLoading || authLoading) {
    return (
      <div 
        className="auth_module_loading" 
        data-isolation-scope="auth"
        data-language={language}
      >
        {children}
      </div>
    );
  }
  
  return (
    <div 
      className="auth_module_wrapper" 
      data-isolation-scope="auth"
      data-language={language}
      data-authenticated={isLoggedIn ? "true" : "false"}
      key={moduleKey.current}
      data-version={version}
    >
      {children}
    </div>
  );
};

export default AuthWrapper;
