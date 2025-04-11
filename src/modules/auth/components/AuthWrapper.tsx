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
  const [forceAuth, setForceAuth] = useState(false);
  const tokenRef = useRef<string | null>(null);
  
  // Track mounted state
  useEffect(() => {
    mountedRef.current = true;
    
    // Store initial token reference
    tokenRef.current = localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
    
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Immediately check for token on mount and save to memory
  useEffect(() => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
    if (token && !isLoggedIn && !authLoading && !refreshAttempted) {
      console.log("AuthWrapper: Found token on first mount, forcing auth refresh");
      
      // Keep token in memory
      tokenRef.current = token;
      
      // Make sure token is in both storage locations
      localStorage.setItem('authToken', token);
      sessionStorage.setItem('tempAuthToken', token);
      
      forceRefresh();
      setRefreshAttempted(true);
      setForceAuth(true);
      
      // Reset force auth after token is processed
      setTimeout(() => {
        if (mountedRef.current) {
          if (!isLoggedIn) {
            // If still not logged in, try once more
            forceRefresh();
          }
        }
      }, 1500);
    }
  }, [isLoggedIn, authLoading, forceRefresh, refreshAttempted]);
  
  // Handle auth preservation during language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`AuthWrapper: Language changed from ${languageRef.current} to ${language}`);
      languageRef.current = language;
      
      // Force refresh auth state when language changes
      if (mountedRef.current) {
        console.log("AuthWrapper: Refreshing auth state after language change");
        
        // Get token from any available source
        const token = tokenRef.current || localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
        
        // Store token temporarily in sessionStorage to preserve during language change
        if (token) {
          sessionStorage.setItem('tempAuthToken', token);
          localStorage.setItem('authToken', token); // Ensure it stays in localStorage too
          tokenRef.current = token;
          setForceAuth(true);
          
          // Immediate force refresh
          forceRefresh();
          
          // And another delayed refresh to ensure everything is consistent
          setTimeout(() => {
            if (mountedRef.current) {
              forceRefresh();
            }
          }, 800);
        }
        
        // Schedule auth refresh after language change settles
        setTimeout(() => {
          if (mountedRef.current) {
            const currentToken = localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
            
            if (currentToken) {
              // Make sure token exists in both storages
              localStorage.setItem('authToken', currentToken);
              sessionStorage.setItem('tempAuthToken', currentToken);
              tokenRef.current = currentToken;
              
              forceRefresh();
              setRefreshAttempted(true);
            }
            
            // Reset check flag after a delay
            setTimeout(() => {
              if (mountedRef.current) {
                checkRef.current = false;
                // Keep force auth active briefly
                setTimeout(() => {
                  if (mountedRef.current) {
                    setForceAuth(false);
                  }
                }, 2000);
              }
            }, 1000);
          }
        }, 500);
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
        tokenRef.current = tempToken;
        
        // Force refresh after token restoration
        setTimeout(() => {
          if (mountedRef.current) {
            forceRefresh();
            setRefreshAttempted(true);
            setForceAuth(true);
            
            // Reset force auth after a delay
            setTimeout(() => {
              if (mountedRef.current) {
                setForceAuth(false);
              }
            }, 2000);
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
  
  // If we have a token but not logged in, force auth state
  const hasToken = tokenRef.current || localStorage.getItem('authToken') || sessionStorage.getItem('tempAuthToken');
  const forcedAuth = hasToken && (!isLoggedIn || forceAuth);
  
  return (
    <div 
      className="auth_module_wrapper" 
      data-isolation-scope="auth"
      data-language={language}
      data-authenticated={isLoggedIn || forcedAuth ? "true" : "false"}
      data-has-token={hasToken ? "true" : "false"}
      key={moduleKey.current}
      data-version={version}
    >
      {children}
    </div>
  );
};

export default AuthWrapper;
