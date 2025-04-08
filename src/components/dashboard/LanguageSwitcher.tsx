
import React, { useEffect, useRef, memo, useState } from "react";
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
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const isChangingRef = useRef(false);
  const selectValueRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  // Update internal state when language context changes
  useEffect(() => {
    if (language !== currentLanguage) {
      setCurrentLanguage(language as LanguageCode);
    }
  }, [language, currentLanguage]);

  const handleLanguageChange = (value: string) => {
    if (isChangingRef.current) return; // Prevent concurrent changes
    
    const newLang = value as LanguageCode;
    if (newLang !== language) {
      isChangingRef.current = true;
      console.log(`Switching language from ${language} to ${newLang} in DashboardLanguageSwitcher`);
      
      // Update DOM directly first for immediate feedback
      if (selectValueRef.current) {
        const displayText = isMobile ? conciseLanguages[newLang] : languages[newLang];
        selectValueRef.current.textContent = displayText;
      }
      
      if (triggerRef.current) {
        triggerRef.current.setAttribute('data-language', newLang);
      }
      
      // Set language state and update local state
      setLanguage(newLang);
      setCurrentLanguage(newLang);
      
      // Release the lock after a short delay
      setTimeout(() => {
        isChangingRef.current = false;
      }, 300);
    }
  };

  // Get display text based on current language and screen size
  const displayText = isMobile ? conciseLanguages[currentLanguage] : languages[currentLanguage];
  
  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger 
        ref={triggerRef}
        className={`
          ${isMobile ? 'w-[100px]' : 'w-[150px]'} 
          bg-transparent 
          border-blue-400/30 
          text-blue-100 
          hover:bg-blue-900/40 
          hover:text-blue-50
          flex items-center
          gap-2
          z-50
        `}
        data-language={currentLanguage}
      >
        <Globe className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
        <SelectValue 
          ref={selectValueRef} 
          placeholder={displayText} 
        />
      </SelectTrigger>
      <SelectContent 
        className="
          bg-[#0F2643] 
          border-blue-900/50 
          text-blue-100 
          min-w-[120px]
          z-50
        "
      >
        {Object.entries(isMobile ? conciseLanguages : languages).map(([code, label]) => (
          <SelectItem key={code} value={code} className="hover:bg-blue-800/30">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default memo(DashboardLanguageSwitcher);
