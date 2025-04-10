import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { languages, LanguageCode } from "@/utils/languageUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useTranslation } from "@/context/TranslationProvider";
import { dispatchLanguageChangeEvent } from "@/utils/translationHelpers";

// More concise language labels for mobile
const conciseLanguages: Record<LanguageCode, string> = {
  "en": "EN",
  "zh-CN": "简中",
  "zh-TW": "繁中",
  "fr": "FR",
  "es": "ES"
};

const DashboardLanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const { setLanguage: setSafeLanguage } = useSafeTranslation();
  const { setIsChangingLanguage } = useTranslation();
  const isMobile = useIsMobile();
  const currentLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  const isChangingRef = useRef(false);
  const mountedRef = useRef(true);
  const selectTriggerRef = useRef<HTMLButtonElement>(null);
  const changeLockTimeout = useRef<NodeJS.Timeout | null>(null);
  const authTokenRef = useRef<string | null>(null);
  
  useEffect(() => {
    mountedRef.current = true;
    
    const token = localStorage.getItem('authToken');
    if (token) {
      authTokenRef.current = token;
    }
    
    return () => {
      mountedRef.current = false;
      if (changeLockTimeout.current) {
        clearTimeout(changeLockTimeout.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (language !== currentLanguageRef.current && mountedRef.current) {
      currentLanguageRef.current = language as LanguageCode;
      
      if (selectTriggerRef.current) {
        selectTriggerRef.current.setAttribute('data-language', language);
      }
    }
  }, [language]);

  const handleLanguageChange = useCallback((value: string) => {
    if (isChangingRef.current || !mountedRef.current) return;
    
    try {
      const newLang = value as LanguageCode;
      if (newLang !== currentLanguageRef.current && mountedRef.current) {
        isChangingRef.current = true;
        console.log(`Switching language from ${currentLanguageRef.current} to ${newLang} in DashboardLanguageSwitcher`);
        
        const currentPath = window.location.pathname;
        localStorage.setItem('lastPath', currentPath);
        console.log(`Storing current path: ${currentPath} before language switch`);
        
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
          console.log("Preserving auth token during language change");
          authTokenRef.current = authToken;
          sessionStorage.setItem('tempAuthToken', authToken);
        }
        
        setIsChangingLanguage(true);
        
        if (changeLockTimeout.current) {
          clearTimeout(changeLockTimeout.current);
        }
        
        currentLanguageRef.current = newLang;
        
        if (selectTriggerRef.current) {
          selectTriggerRef.current.setAttribute('data-language', newLang);
          selectTriggerRef.current.setAttribute('data-changing', 'true');
        }
        
        setSafeLanguage(newLang);
        
        dispatchLanguageChangeEvent(newLang);
        
        changeLockTimeout.current = setTimeout(() => {
          if (mountedRef.current) {
            isChangingRef.current = false;
            
            if (authTokenRef.current) {
              console.log("Restoring auth token after language change");
              localStorage.setItem('authToken', authTokenRef.current);
            }
            
            const tempToken = sessionStorage.getItem('tempAuthToken');
            if (tempToken) {
              localStorage.setItem('authToken', tempToken);
            }
            
            setIsChangingLanguage(false);
            
            if (selectTriggerRef.current) {
              selectTriggerRef.current.removeAttribute('data-changing');
            }
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Error changing language:", error);
      isChangingRef.current = false;
      setIsChangingLanguage(false);
    }
  }, [setSafeLanguage, setLanguage, setIsChangingLanguage]);

  const displayText = useMemo(() => {
    const labels = isMobile ? conciseLanguages : languages;
    return labels[currentLanguageRef.current];
  }, [isMobile, currentLanguageRef.current]);
  
  const stableKey = useRef(`lang-switcher-${Math.random().toString(36).substring(2, 9)}`);
  
  return (
    <Select 
      value={currentLanguageRef.current} 
      onValueChange={handleLanguageChange}
      key={stableKey.current}
    >
      <SelectTrigger 
        ref={selectTriggerRef}
        className={`
          ${isMobile ? 'w-[100px]' : 'w-[150px]'} 
          bg-transparent 
          border-blue-400/30 
          text-blue-100 
          hover:bg-blue-900/40 
          hover:text-blue-50
          flex items-center
          gap-2
          z-10
        `}
        data-language={currentLanguageRef.current}
      >
        <Globe className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
        <SelectValue placeholder={displayText} />
      </SelectTrigger>
      <SelectContent 
        className="
          bg-[#0F2643] 
          border-blue-900/50 
          text-blue-100 
          min-w-[120px]
          z-50
        "
        position="popper"
        sideOffset={4}
        align="center"
      >
        {Object.entries(isMobile ? conciseLanguages : languages).map(([code, label]) => (
          <SelectItem key={`lang-item-${code}`} value={code} className="hover:bg-blue-800/30">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default React.memo(DashboardLanguageSwitcher);
