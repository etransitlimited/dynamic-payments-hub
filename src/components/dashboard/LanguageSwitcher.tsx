
import React, { useEffect, useRef, memo, useState, useCallback } from "react";
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
  const isMobile = useIsMobile();
  // Use a regular state instead of useState for more reliable updates
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const isChangingRef = useRef(false);
  const mountedRef = useRef(true);
  const selectContentOpenRef = useRef(false);
  
  // Reset the mounted ref when unmounting to prevent memory leaks
  useEffect(() => {
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Update internal state when language context changes
  useEffect(() => {
    if (language !== currentLanguage && mountedRef.current) {
      setCurrentLanguage(language as LanguageCode);
    }
  }, [language, currentLanguage]);

  // Handle language change with safety checks
  const handleLanguageChange = useCallback((value: string) => {
    if (isChangingRef.current || !mountedRef.current) return;
    
    try {
      const newLang = value as LanguageCode;
      if (newLang !== language && mountedRef.current) {
        isChangingRef.current = true;
        console.log(`Switching language from ${language} to ${newLang} in DashboardLanguageSwitcher`);
        
        // First update local state for immediate feedback
        setCurrentLanguage(newLang);
        
        // Then update the global language state with a slight delay
        // This gives the UI time to update before potential re-renders
        setTimeout(() => {
          if (mountedRef.current) {
            setLanguage(newLang);
            
            // Release the lock after the change is complete
            setTimeout(() => {
              if (mountedRef.current) {
                isChangingRef.current = false;
              }
            }, 300);
          }
        }, 10);
      }
    } catch (error) {
      console.error("Error changing language:", error);
      isChangingRef.current = false;
    }
  }, [language, setLanguage]);

  // Get display text based on current language and screen size
  const displayText = isMobile ? conciseLanguages[currentLanguage] : languages[currentLanguage];
  
  // Handle open state changes for the select dropdown
  const handleOpenChange = (open: boolean) => {
    selectContentOpenRef.current = open;
  };
  
  return (
    <Select 
      value={currentLanguage} 
      onValueChange={handleLanguageChange}
      onOpenChange={handleOpenChange}
      // Use a key based on the current language to force a fresh render when needed
      key={`lang-select-${currentLanguage}`}
    >
      <SelectTrigger 
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
        data-language={currentLanguage}
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

export default memo(DashboardLanguageSwitcher);
