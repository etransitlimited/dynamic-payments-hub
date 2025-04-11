
import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/context/TranslationProvider";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { language, isLoading: langLoading } = useLanguage();
  const { isLoggedIn, isLoading: authLoading, forceRefresh } = useAuth();
  const { isChangingLanguage } = useTranslation();
  const languageRef = useRef(language);
  const checkRef = useRef(false);
  const mountedRef = useRef(true);
  
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
      
      // On language change, ensure authentication is preserved
      if (isLoggedIn && !checkRef.current) {
        checkRef.current = true;
        
        // Force auth check after language change
        setTimeout(() => {
          if (mountedRef.current) {
            console.log("AuthWrapper: Refreshing auth state after language change");
            forceRefresh();
            
            // Reset check flag
            setTimeout(() => {
              if (mountedRef.current) {
                checkRef.current = false;
              }
            }, 500);
          }
        }, 200);
      }
    }
  }, [language, isLoggedIn, forceRefresh]);
  
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
      data-authenticated={isLoggedIn.toString()}
      key={moduleKey.current}
    >
      {children}
    </div>
  );
};

export default AuthWrapper;
